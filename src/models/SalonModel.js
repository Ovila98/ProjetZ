export class SalonModel{
    constructor(values, setters){
        this.model = {
            salonData: values.salonData,
            salonEvents: values.salonEvents,
            salonChats: values.salonChats
        }
        this.setters = {
            salonData: setters.setSalonData,
            salonEvents: setters.setSalonEvents,
            salonChats: setters.setSalonChats
        }
    }
}