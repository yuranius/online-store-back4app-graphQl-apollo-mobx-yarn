import {makeAutoObservable} from "mobx";

class UserStore {
    constructor() {

        this._types = []
        this._brands = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 8
        this._rating = []

        makeAutoObservable(this)
    }

    // --------------------------------  Setters  ------------------------------

    setTypes (types) {
        this._types = types
    }

    addTypes (type) {
        this._types = [...this._types, type]
    }

    setBrands (brands) {
        this._brands = brands
    }

    setDevices (devices) {
        this._devices = devices
    }

    setSelectedType (type) {
        this.setPage(1)
        this._selectedType = type
    }

    setSelectedBrand (brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }

    setPage (page) {
        this._page = page
    }
    setTotalCount (totalCount) {
        this._totalCount = totalCount
    }
    setLimit (limit) {
        this._limit = limit
    }

    setRatingState (rating) {
        console.log( '📌:',rating,'🌴 🏁')

        //this._rating = rating
    }


    // ---------------------------------  Getters  ---------------------------------

    get types () {
        return this._types
    }

    get brands () {
        return this._brands
    }

    get devices () {
        return this._devices
    }
    get selectedType () {
        return this._selectedType
    }

    get selectedBrand () {
        return this._selectedBrand
    }
    get page () {
        return this._page
    }
    get totalCount () {
        return this._totalCount
    }
    get limit () {
        return this._limit
    }
    get rating () {
        return this._rating
    }
}

export default UserStore;