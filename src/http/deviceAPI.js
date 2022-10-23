import {$authHost, $host} from "./index";





export  const createType = async (type) => {
    //const {data} = await $authHost.post('api/type', type)
    //return data
}

export  const fetchTypes = async () => {


}


export  const createBrand = async (brand) => {
    // const {data} = await $authHost.post('api/brand', brand)
    // return data
}

export  const fetchBrands = async () => {
    // const {data} = await $host.get('api/brand')
    // return data
}

export  const createDevice = async (device) => {
    // const {data} = await $authHost.post('api/device', device)
    // return data
}

export  const deleteDevice = async (device) => {
    // const {data} = await $authHost.delete(`api/device/?deviceId=${device}`, {})
    // return data
}

export  const fetchDevices = async (typeId, brandId,page, limit)  => {
    // const {data} = await $host.get('api/device', {params: {
    //     typeId, brandId, page, limit
    //     }})
    // return data
}

export  const fetchOneDevices = async (id) => {
    // const {data} = await $host.get('api/device/'+ id)
    // return data
}

export  const fetchRatingDevice = async ({userId, deviceId}) => {
    // const {data} = await $host.get(`api/rating/?userId=${userId}&deviceId=${deviceId}`)
    // return data
}

export  const addRatingDevice = async (rating) => {
    // const {data} = await $authHost.post('api/rating/create', rating)
    // return data
}

export  const changeRatingDevice = async (rating) => {
    // const {data} = await $authHost.post('api/rating/change', rating)
    // return data
}

export  const deleteRatingDevice = async (rateId) => {
    // const {data} = await $authHost.delete(`api/rating/?rateId=${rateId}`, {})
    // return data
}
