import { Presenter } from "./Presenter";
import { EventModel } from "../../models/EventModel";
import { Fetcher } from "../Firebase/Fetcher";

export class EventPresenter extends Presenter{
    constructor(_values, _setters){
        super(EventModel, _values, _setters);
        this.fetch = new Fetcher();
    }

    async loadEventView(id){

        // Load event info
        await this.fetch.getSingleDocument({collectionPath: "Events", documentId: id}).then(res => this.updateModel({ event: res }));

        return false
    }
}