export class EventsModel {
    constructor(values, setters){
        this.model = {
            events: values.events
        }

        this.setters = {
            events: setters.setEvents
        }
    }
}