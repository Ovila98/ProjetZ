export class HomeModel {
    constructor(values, setters){
        this.model = {
            popularEventsSection: values.popularEventsSection,
            popularEvents: values.popularEvents,
            headerImg: values.headerImg,
            popularSalons: values.popularSalons
        }

        this.setters = {
            popularEventsSection: setters.setPopularEventsSection,
            popularEvents: setters.setPopularEvents,
            headerImg: setters.setHeaderImg,
            popularSalons: setters.setPopularSalons
        }
    }
}