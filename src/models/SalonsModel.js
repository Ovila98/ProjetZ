export class SalonsModel{
    constructor(_values, _setters){
        this.model = {
            salons: _values.salons
        }

        this.setters = {
            salons: _setters.setSalons
        }
    }
}