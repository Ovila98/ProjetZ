import { Presenter } from "./Presenter";
import { SalonModel } from "../../models/SalonModel";
import { Fetcher } from "../Firebase/Fetcher";

export class SalonPresenter extends Presenter{
    constructor(_values, _setters){
        super(SalonModel, _values, _setters);
        this.fetch = new Fetcher();
    }

    async loadSalonView(ref){
        await this.fetch.getSingleDocument({collectionPath: "Salons", documentId: ref}).then(res => this.updateModel({ salonData: res }));
        // getDocsFromCollectionWhere events
        // getDocsFromCollection Where ? chats

        return false
    }

}