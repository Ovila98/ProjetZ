import { Presenter } from "./Presenter";
import { ChatsModel } from "../../models/ChatsModel";
import { Fetcher } from "../Firebase/Fetcher";
import { ChatManager } from "../Firebase/ChatManager";

export class ChatsPresenter extends Presenter{
    constructor(_values, _setters){
        super(ChatsModel, _values, _setters);
        this.fetch = new Fetcher();
    }

    async loadChatsView(){

        const officialChats = await this.fetch.getDocsFromCollection({ collectionPath: "OfficialChats" });
        
        const communityChats = await this.fetch.getDocsFromCollection({ collectionPath: "CommunityChats" });
        
        const privateChats = await this.fetch.getDocsFromCollection({ collectionPath: "PrivateChats" });

        this.updateModel({
            officialChats: officialChats.filter(element => (!element.hasOwnProperty("dummy"))),
            communityChats: communityChats.filter(element => (!element.hasOwnProperty("dummy"))), 
            privateChats: privateChats.filter(element => (!element.hasOwnProperty("dummy")))
        })

        return false;
    }
}