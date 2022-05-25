import { SalonsModel } from "../../models/SalonsModel";
import { Presenter } from "./Presenter";
import { Fetcher } from "../Firebase/Fetcher";

export class SalonsPresenter extends Presenter{
    constructor(_values, _setters){
        super(SalonsModel, _values, _setters);
        this.fetch = new Fetcher();
    }

    async loadSalonsView(){

        // load salons
        const fetchedSalons = await this.fetch.getDocsFromCollection({collectionPath: "Salons", orderBy: "popularity", orderDirection: "desc"});
        this.updateModel({salons: fetchedSalons})

        return false;
    }
}