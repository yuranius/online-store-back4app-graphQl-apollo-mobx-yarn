import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Paginator from "../components/Custom/Paginator";
import {useQuery} from "@apollo/client";
import {FETCH_COUNT, FETCH_DEVICES, FETCH_TYPES_BRANDS} from "../query/deviceAPI";

const Shop = observer(() => {
	const {device} = useContext(Context)
	const {user} = useContext(Context)
	const {basket} = useContext(Context)

	const {data: typesAndBrands} = useQuery(FETCH_TYPES_BRANDS)

	const {data: count} = useQuery(FETCH_COUNT,{
		onCompleted: (data => device.setTotalCount(data.devices.count))
	})

	const {data: devices} = useQuery(FETCH_DEVICES, {

		variables: {
			skip: 0,
			limit: 10,
			typeId: 'ClPXMDrkj7',
			//brandId: "sVbUT70Da5",
		},
		onCompleted:(data => console.log( '📌:DATA',data,'🌴 🏁')
		)
	})



	useEffect(() => {
		const types = typesAndBrands?.types.edges.map(({node}) => ({id: node.objectId, name: node.name}))
		const brands = typesAndBrands?.brands.edges.map(({node}) => ({id: node.objectId, name: node.name}))
		
		//console.log( '📌:',data,'🌴 🏁')
		
		

		
		
		
		// const devices = data.devices.edges.map(({node}) => ({
		// 	id: node.objectId,
		// 	name: node.name,
		// 	brandId: node.brandId.objectId,
		// 	typeId: node.typeId.objectId,
		// 	img: node.img,
		// 		rating: node.rating,
		// 		price: node.price,
		// 	}))
		// 	device.setDevices(devices)
		// 	device.setTotalCount(data.devices.count)
		device.setTypes(types)
		device.setBrands(brands)
	}, [typesAndBrands, count, devices])
	
	
	console.log( '📌:',"render",'🌴 🏁')
	

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
					{/*<Col md={3}>*/}
					{/*	<TypeBar/>*/}
					{/*</Col>*/}
					{/*<Col md={9}>*/}
					{/*	<BrandBar/>*/}
					{/*	<DeviceList device={device} brands={device.brands}/>*/}
					{/*	<Paginator/>*/}
					{/*</Col>*/}
				</Row>
			</Container>
	);
})

export default Shop;