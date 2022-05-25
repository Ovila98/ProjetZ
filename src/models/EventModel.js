export class EventModel{
    constructor(values, setters){
        this.model = {
            event: values.event
        }

        this.setters = {
            event: setters.setEvent
        }
    }
}