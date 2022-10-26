import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Paginator from "../components/Custom/Paginator";
import {useQuery} from "@apollo/client";
import {FETCH_DEVICES, FETCH_TYPES_BRANDS} from "../query/deviceAPI";

const Shop = observer(() => {
	const {device} = useContext(Context)
	const {user} = useContext(Context)
	const {basket} = useContext(Context)

	const {typesAndBrands} = useQuery(FETCH_TYPES_BRANDS)

	const {data, loading, error} = useQuery(FETCH_DEVICES, {
		variables: {
			skip: device.page,
			limit: device.limit,
		}
	})

	useEffect(() => {
		const types = typesAndBrands?.types.edges.map(({node}) => ({id: node.objectId, name: node.name}))
		const brands = typesAndBrands?.brands.edges.map(({node}) => ({id: node.objectId, name: node.name}))
		const devices = data.devices.edges.map(({node}) => ({
			id: node.objectId,
			name: node.name,
			brandId: node.brandId.objectId,
			typeId: node.typeId.objectId,
			img: node.img,
				rating: node.rating,
				price: node.price,
			}))
			device.setDevices(devices)
			device.setTotalCount(data.devices.count)
			device.setTypes(types)
			device.setBrands(brands)
	}, [data])

	useEffect(() => {
		//fetchTypes().then(data => device.setTypes(data))
		// fetchBrands().then(data => device.setBrands(data))
		// fetchDevices(null, null, device.page, device.limit).then(data => {
		//     device.setDevices(data.rows)
		//     device.setTotalCount(data.count)
		// })
		// if (!!user.user.id) {
		//     fetchBasketDevice(user.user.id).then(data => basket.setBasketDevices(data))
		// }

	}, []);

	// useEffect(() => {
	//     fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(data => {
	//         device.setDevices(data.rows)
	//         device.setTotalCount(data.count)
	//     })
	// }, [device.page, device.selectedType, device.selectedBrand.id])

	//const [brands, setBrands] = useState(device.brands)

	// useEffect(() => {
	//     setBrands(device.brands)
	// }, [device.brands])



	return (
			<Container>
				<Row className='mt-5'>
					<Col md={3}>
						<TypeBar/>
					</Col>
					<Col md={9}>
						<BrandBar/>
						<DeviceList device={device} brands={device.brands}/>
						<Paginator/>
					</Col>
				</Row>
			</Container>
	);
})

export default Shop;