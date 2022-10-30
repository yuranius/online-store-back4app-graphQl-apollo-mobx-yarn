import {useLazyQuery} from "@apollo/client";
import {GET_DEVICE_BASKET} from "../query/basketAPI";
import {useContext} from "react";
import {Context} from "../index";


export const useGetBasketDevice = () => {

	const {basket} = useContext(Context)

	const [getDevice] = useLazyQuery(GET_DEVICE_BASKET, {
		fetchPolicy: "cache-and-network"
	})

	async function fetchDeviceBasket (userId) {

			const basketDevices = await getDevice({
				variables: {
					userId: userId
				}}
			).then( ({data}) => data?.basket_Devices.edges.map( ({node}) => ({
						id: node.objectId,
						img: node.deviceId.img,
						price: node.deviceId.price,
					}))
			
			)

			basket.setBasketDevices(basketDevices)

	}

	return {fetchDeviceBasket }

}