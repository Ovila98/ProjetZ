export class ChatModel{
    constructor(values, setters){
        this.model = {
            chatDetails: values.chatDetails,
            messages: values.messages,
            currentLoggedUser: values.currentLoggedUser,
            currentChatUsers: values.currentChatUsers
        }
        
        this.setters = {
            chatDetails: setters.setChatDetails,
            messages: setters.setMessages,
            currentLoggedUser: setters.setCurrentLoggedUser,
            currentChatUsers: setters.setCurrentChatUsers
        }
    }
}

