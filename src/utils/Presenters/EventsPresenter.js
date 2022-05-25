import { Presenter } from "./Presenter";
import { Fetcher } from '../Firebase/Fetcher'
import { EventsModel } from "../../models/EventsModel";

export class EventsPresenter extends Presenter{

    constructor(_values, _setters){
        super(EventsModel, _values, _setters);
        this.fetch = new Fetcher();
    }

    async loadEventsView(){

        const fetchedEvents = await this.fetch.getDocsFromCollection({collectionPath: "Events", orderBy: "popularity", orderDirection: "desc"});
        this.updateModel({ events: fetchedEvents })

        return false;

    }

    goto(id){
        window.location.href=`/events/${id}`;
    }

    showCategories(){
        document.querySelector('.events-category-selector').classList.toggle('active')
    }
}