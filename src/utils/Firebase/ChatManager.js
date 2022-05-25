import { Fetcher } from './Fetcher';

import { getGroupType, getURLSegments, groupTypeToCollection, getMessagesIntoView, qs } from '../Functions/Functions';

export class ChatManager {
    constructor(_collectionPath, _updateMessages) {
        this.fetch = new Fetcher();
        this.collectionPath = _collectionPath;
        this.updatedMessages = [];
        this.update = _updateMessages;
    };

    snapshotHandler(snapshot){
        const fetchedMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const updatedMessages = fetchedMessages.filter(message => (message.id !== 'creation'));
        const isDifferent = updatedMessages !== this.updatedMessages;
        const lastMessage = updatedMessages.at(-1)

        // Handle multiple snapshot notifications
        if(isDifferent && lastMessage?.timestamp){
            this.updatedMessages = updatedMessages;
            this.update({ messages: this.updatedMessages });
            if (qs("#to-last-message") && window.getComputedStyle(qs("#to-last-message")).display === "none"){
                getMessagesIntoView()
            }
        }
    }

    configureAndUnsubscribe(){
        const unsubscribe = this.fetch.setSnapshotListener(
            {collectionPath: this.collectionPath, orderBy: "timestamp", orderDirection: "asc"},
            this.snapshotHandler.bind(this));

        return unsubscribe;
    }
    async createOfficialGroupChat(groupSubjectType, groupSubjectId){
        const groupSubjectTypeToCollection = groupSubjectType === 'salon'? "Salons":"Events"

        const groupDetailDocument = {
            type: "official",
            subjectType: groupSubjectType,
            subjectId: groupSubjectId,
            members: [],
            lastMessage: ""
        }

        const newGroupId = await this.fetch.createDoc("OfficialChats", groupDetailDocument);
        await this.fetch.createDocWithID([...newGroupId.path.split("/"), "messages"], "creation",{ created: this.fetch.currentTimestamp() })
        await this.fetch.addField([groupSubjectTypeToCollection, groupSubjectId], "officialChatId", newGroupId.id )

    };

    async createGroupChatFromUser(groupCreator, groupType, groupSubjectType, groupSubjectId){
        // Add parameter to add members beforehand.
        // groupType: if the group is a community or private group
        // groupSubjectType: if a group is derived from a Salon or an Event

        const groupDetailDocument = {
            creatorName: groupCreator.nickname,
            creatorId: groupCreator.id,
            creationTime: this.fetch.currentTimestamp(),
            type: groupType,
            subjectType: groupSubjectType,
            subjectId: groupSubjectId,
            members: [groupCreator.id],
            lastMessage: ""
        };

        const newGroupId = await this.fetch.createDoc(groupTypeToCollection(groupType), groupDetailDocument);
        const groupSubjectTypeToCollection = groupSubjectType === 'salon'? "Salons":"Events"
        const fieldToEdit = `${groupType}ChatsLinked`
        await this.fetch.appendToField([groupSubjectTypeToCollection, groupSubjectId], fieldToEdit, newGroupId)
        await this.fetch.appendToField(["Users", groupCreator.id], "chatsCreated", {type: groupType, groupId: newGroupId})
    };

    
    async getGroupChat(currentURL, messages_limit = 100){
        const segments = getURLSegments(currentURL)
        const chatId = segments.at(-1)
        const groupType = getGroupType(segments);

        const fetchedMessages = await this.fetch.getDocsFromCollection({ collectionPath: [groupTypeToCollection(groupType), chatId, 'messages'], orderBy: 'timestamp', orderDirection: 'asc', limit: messages_limit });
        
        return fetchedMessages;
        
    };

    async getGroupChatDetails(currentURL){
        const segments = getURLSegments(currentURL)
        const chatId = segments.at(-1)
        const groupType = getGroupType(segments);

        const chatDetails = await this.fetch.getSingleDocument({collectionPath: groupTypeToCollection(groupType), documentId: chatId});
        
        return chatDetails;
    }

    async sendMessage(groupType, groupChatId, message, user, media = []){

        const groupCollectionPath = [groupTypeToCollection(groupType), groupChatId]

        const messageDocument = {
            groupChatId: groupChatId,
            authorId: user.id,
            author: user.nickname,
            authorPhoto: user.photoUrl,
            messageContent: message,
            media: media,
            timestamp: this.fetch.currentTimestamp()
        };

        if(user){
            try{
                await this.fetch.createDoc([...groupCollectionPath, "messages"], messageDocument);
            } catch(err) {
                console.log("Sending error")
                console.log(err)
            }
        }
        return false;

    };
    
}





