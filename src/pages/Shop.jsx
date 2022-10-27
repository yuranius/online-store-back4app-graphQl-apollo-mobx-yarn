import React, {useContext, useEffect, useMemo} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Paginator from "../components/Custom/Paginator";
import {useLazyQuery, useQuery} from "@apollo/client";
import {FETCH_COUNT, FETCH_DEVICES, FETCH_TYPES_BRANDS} from "../query/deviceAPI";
import {useGetDevices} from "../hooks/useGetDevices";

const Shop = observer(() => {
	const {device} = useContext(Context)
	const {user} = useContext(Context)
	const {basket} = useContext(Context)

	const {data: typesAndBrands} = useQuery(FETCH_TYPES_BRANDS)

	//const {data: count} = useQuery(FETCH_COUNT)

	
	
	const {fetchDevice , devices, loading} = useGetDevices()


	useEffect( () => {
		fetchDevice({
			limit: device.limit,
			skip: (device.page * device.limit - device.limit),
		})
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

		
		device.setTotalCount(devices.count)
		device.setTypes(types)
		device.setBrands(brands)
	}, [devices, typesAndBrands])
	
	

	

	// useEffect(() => {
		//fetchTypes().then(data => device.setTypes(data))
		// fetchBrands().then(data => device.setBrands(data))
		// fetchDevices(null, null, device.page, device.limit).then(data => {
		//     device.setDevices(data.rows)
		//     device.setTotalCount(data.count)
		// })
		// if (!!user.user.id) {
		//     fetchBasketDevice(user.user.id).then(data => basket.setBasketDevices(data))
		// }

	// }, []);

	useEffect(() => {
		fetchDevice({
			limit: device.limit,
			skip: (device.page * device.limit - device.limit),
			brandId: device.selectedBrand.id,
			typeId: device.selectedType.id
		})
	}, [device.page, device.selectedType.id, device.selectedBrand.id])

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
						{device.devices?.length && !loading
								? <DeviceList device={device} brands={device.brands}/>
								: <h2 className='d-flex justify-content-center mt-5 text-black-50' >Товары не найдены</h2>}
						<Paginator/>
					</Col>
				</Row>
			</Container>
	);
})

export default Shop;