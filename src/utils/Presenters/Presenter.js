/* Base class for every presenters.

 Presenters are responsible for supervising updates in the view (UI).
 They get an action request from the view, (eg: a button click might trigger
 a query for changing text in some div) they will then update the view by
 updating the model with the required value(s), or the value(s) received by the client
 responsible for getting the new value(s)*/

export class Presenter{
    #fullModel;
    constructor(Model, values, setters){
        this.#fullModel = new Model(values, setters)
        this.model = this.#fullModel.model;
        this.callbacks = this.#fullModel.setters;
    }

    updateModel(modelFields){
        for(const key in modelFields){
            this.callbacks[key](modelFields[key])
        }
    }

}

