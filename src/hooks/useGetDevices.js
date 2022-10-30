import {useLazyQuery} from "@apollo/client";
import {
	FETCH_DEVICES,
	FETCH_DEVICES_WHEN_BRAND,
	FETCH_DEVICES_WHEN_BRAND_AND_TYPE,
	FETCH_DEVICES_WHEN_TYPE
} from "../query/deviceAPI";
import {useState} from "react";


export const useGetDevices = () => {

	const [getAllDevices, {loading: loadingAll}] = useLazyQuery(FETCH_DEVICES);
	const [getDevicesType, {loading: loadingType}] = useLazyQuery(FETCH_DEVICES_WHEN_TYPE)
	const [getDevicesBrand, {loading: loadingBrand}] = useLazyQuery(FETCH_DEVICES_WHEN_BRAND)
	const [getDevicesBrandAndType, {loading: loadingBrandAndType}] = useLazyQuery(FETCH_DEVICES_WHEN_BRAND_AND_TYPE)

	const [devices , setDevices] = useState([])

	let loading = loadingAll || loadingType || loadingBrand || loadingBrandAndType
	
	function fetchDevice ({limit, skip, typeId, brandId}) {
		switch (true) {
			case (!!typeId && !brandId):
				getDevicesType({
					variables: {
						skip: skip,
						limit: limit,
						typeId: typeId,
					}
				}).then(res => setDevices(res.data.devices))
				break

			case (!!brandId && !typeId):
				getDevicesBrand({
					variables: {
						skip: skip,
						limit: limit,
						brandId: brandId,
					}
				}).then(res => setDevices(res.data.devices))
				break

			case (!!typeId && !!brandId):
				getDevicesBrandAndType({
					variables: {
						skip: skip,
						limit: limit,
						brandId: brandId,
						typeId: typeId,
					}
				}).then(res => setDevices(res.data.devices))
				break

			default:
			case (!typeId && !brandId):
				getAllDevices({
					variables: {
						skip: skip,
						limit: limit,
					}
				}).then(res => {
					setDevices(res.data.devices)
					}
				)
				break
		}
	}


	return {fetchDevice, devices, loading};

}