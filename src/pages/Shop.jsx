import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Paginator from "../components/Custom/Paginator";
import {useQuery} from "@apollo/client";
import {FETCH_TYPES_BRANDS} from "../query/deviceAPI";
import {useGetDevices} from "../hooks/useGetDevices";
import {useGetBasketDevice} from "../hooks/useGetBasketDevice";

const Shop = observer(() => {
	const {device} = useContext(Context)
	const {user} = useContext(Context)
	const {basket} = useContext(Context)

	const {data: typesAndBrands} = useQuery(FETCH_TYPES_BRANDS)

	const {fetchDeviceBasket} = useGetBasketDevice()

	const {fetchDevice, devices, loading} = useGetDevices()

	useEffect(() => {
		fetchDevice({
			limit: device.limit,
			skip: (device.page * device.limit - device.limit),
		})
		if (user.user.id) {
			fetchDeviceBasket(user.user.id)
		}
	}, [])

	useEffect(() => {
		const types = typesAndBrands?.types.edges.map(({node}) => ({id: node.objectId, name: node.name}))
		const brands = typesAndBrands?.brands.edges.map(({node}) => ({id: node.objectId, name: node.name}))

		device.setDevices(devices.edges?.map(({node}) => ({
			id: node.objectId,
			name: node.name,
			brandId: node.brandId.objectId,
			typeId: node.typeId.objectId,
			img: node.img,
			rating: node.rating,
			price: node.price,
		})))

		if (user.user.id) {
			fetchDeviceBasket(user.user.id)
		}

		device.setTotalCount(devices.count)
		device.setTypes(types)
		device.setBrands(brands)
	}, [devices, typesAndBrands])


	useEffect(() => {
		fetchDevice({
			limit: device.limit,
			skip: (device.page * device.limit - device.limit),
			brandId: device.selectedBrand.id,
			typeId: device.selectedType.id
		})
	}, [device.page, device.selectedType.id, device.selectedBrand.id])


	return (
			<Container>
				<Row className='mt-5'>
					<Col md={3}>
						<TypeBar loading={loading}/>
					</Col>
					<Col md={9}>
						<BrandBar loading={loading}/>
						<DeviceList device={device} brands={device.brands} loading={loading}/>
						<Paginator/>
					</Col>
				</Row>
			</Container>
	);
})

export default Shop;