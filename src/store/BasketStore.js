import {makeAutoObservable} from "mobx";

class BasketStore {
    constructor() {
        this._basket = []
        this._quantity = 0
        makeAutoObservable(this)
    }

    // --------------------------------  Setters  ------------------------------

    setBasketDevices (devices) {
        this._basket = devices
        this._quantity = this._basket.length
    }

    addDevice (device) {
        this._basket = [...this._basket, device]
    }


    addQuantityDevices () {
        this._quantity ++
    }

    deleteQuantityDevices () {
        this._quantity --
    }

    deleteBasketDevices (id) {
        this._basket = this._basket.filter( basket => basket.id !== id)
    }

    // ---------------------------------  Getters  ---------------------------------

    get basketDevices() {
        return this._basket
    }

    get quantityDevices() {
        return this._quantity
    }
}

export default BasketStore;