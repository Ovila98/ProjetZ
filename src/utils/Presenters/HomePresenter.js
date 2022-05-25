import { Presenter } from "./Presenter";
import { HomeModel } from "../../models/HomeModel";
import { Fetcher } from "../Firebase/Fetcher";

export class HomePresenter extends Presenter{
    constructor(_values, _setters){
        super(HomeModel, _values, _setters);
        this.fetch = new Fetcher();
    }

    async loadHomeView(){

        // Load header background
        await this.fetch.getSingleDocument({collectionPath: "General", documentId: "backgrounds"}).then(res => {
            this.updateModel({ headerImg: res["headerBackground"] })
        });
        
        // Load popular events section details
        await this.fetch.getSingleDocument({collectionPath: "Home", documentId: "starredEvents"}).then(res => {
            this.updateModel({ popularEventsSection: res })
        });

        // Load popular events
        await this.fetch.getDocsFromCollection({collectionPath: "Events", orderBy: "popularity", orderDirection: "desc", limit: 5}).then(res => {
            this.updateModel({ popularEvents: res })
        });

        // Load popular salons
        await this.fetch.getDocsFromCollection({collectionPath: "Salons", orderBy: "popularity", orderDirection: "desc", limit: 6}).then(res => {
            this.updateModel({ popularSalons: res })
        });

        return false;
    }
}