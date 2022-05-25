import { ChatModel } from "../../models/ChatModel";
import { ChatManager } from "../Firebase/ChatManager";
import { Presenter }  from "../Presenters/Presenter";
import { Fetcher } from "../Firebase/Fetcher";


export class ChatPresenter extends Presenter{
    #chatManager;
    
    constructor(_values, _setters, _collectionPath){
        super(ChatModel, _values, _setters);
        this.fetch = new Fetcher();
        this.#chatManager = new ChatManager(_collectionPath, this.updateModel.bind(this));

    }

    configure(){
        return this.#chatManager.configureAndUnsubscribe()
    }
    async loadChatView(){
        const fetchedChatDetails = await this.#chatManager.getGroupChatDetails(window.location.href)
        const fetchedMessages = await this.#chatManager.getGroupChat(window.location.href)
        this.updateModel(
            {
                chatDetails: fetchedChatDetails,
                messages: fetchedMessages.filter(message => (message.id !== 'creation'))
            }
            )

        document.title = fetchedChatDetails.title
        return false;
    }

    async sendMessage(groupType, groupChatId, message, user, media = []){
        await this.#chatManager.sendMessage(groupType, groupChatId, message, user, media);
    }
    goto(type, id){
        switch(type){
            case "salon":{
                window.location.href=`/salons/${id}`;
                break;
            }
            case "event":{
                window.location.href=`/events/${id}`;
                break;
            }
            default:
                break;
        };
        
    }
}