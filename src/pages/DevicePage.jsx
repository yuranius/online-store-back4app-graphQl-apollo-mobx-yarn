import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row, Stack} from "react-bootstrap";
import bigStar from '../images/bigstar.png'
import {useNavigate, useParams} from "react-router-dom";
import CreateRating from "../components/Modals/CreateRating";
import Toasts from "../components/Custom/Toasts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import editIcon from '../images/edit.png'
import deleteIcon from '../images/delete.png'
import {SHOP_ROUTE} from "../utils/consts";
import {useShowMessageToasts} from "../hooks/useMassage";
import {priceFormatter} from "../utils/formatter";
import {useLazyQuery, useMutation} from "@apollo/client";
import {GET_DEVICE} from "../query/deviceAPI";
import {ADD_DEVICE_BASKET, CHECK_DEVICE_BASKET} from "../query/basketAPI";
import {CHECK_RATE_USER, DELETE_RATE, GET_RATING_DEVICE, UPDATE_DEVICE} from "../query/ratingAPI";

const DevicePage = observer(() => {
	const [device, setDevice] = useState({info: []})
	const [ratingVisible, setRatingVisible] = useState(false)
	const [rating, setRating] = useState({})
	const [typeRatingVisible, setTypeRatingVisible] = useState('')

	const {showWarning, showSuccess, variant, message, showToasts, title, setShowToasts} = useShowMessageToasts()

	const {user} = useContext(Context)
	const {basket} = useContext(Context)

	// id из адресной строки
	const {id} = useParams()

	const [addDeviceBasket] = useMutation(ADD_DEVICE_BASKET, {
		variables: {
			userId: user.user.id,
			deviceId: id,
		}
	})

	const [checkDeviceBasket, {refetch}] = useLazyQuery(CHECK_DEVICE_BASKET, {
		variables: {
			userId: user.user.id,
			deviceId: id,
		}
	})
	
	const [deleteRatingDevice] = useMutation(DELETE_RATE, {
		variables:{
			id: rating.id
		}
	})

	const [getRatingDevice] = useLazyQuery(GET_RATING_DEVICE, {
		variables: {
			deviceId: id,
		}
	})

	const [updateDevice] = useMutation(UPDATE_DEVICE)

	const [checkRateDevice] = useLazyQuery(CHECK_RATE_USER)

	const navigate = useNavigate()



	const [getDevice] = useLazyQuery(GET_DEVICE, {
		variables: {
			id
		},
		fetchPolicy: 'cache-and-network',
	})

	console.log('📌:rating', rating, '🌴 🏁')

	useEffect(() => {
		getDevice().then(({data}) => {
			setDevice({
				id: data?.device.objectId,
				info: data?.device_infos.edges || [],
				img: data?.device.img,
				name: data?.device.name,
				price: data?.device.price,
				rating: data?.device.rating,
				brandId: data?.device.brandId.objectId,
				typeId: data?.device.typeId.objectId,
			})
		})
	}, [rating, id, device.id])

	useEffect(() => {
		if (!!user.user.id && !!device.id) {
			checkRateDevice({
						variables: {
							userId: user.user.id,
							deviceId: device.id
						}, fetchPolicy: 'cache-and-network'
					}
			).then(({data}) => setRating({
				id: data?.ratings?.edges[0]?.node.objectId,
				rate: data?.ratings?.edges[0]?.node.rate
			}))
		}
	}, [device.id, ratingVisible, user])

	const voteHandler = () => {
		if (user.isAuth && !rating?.id) {
			// модальное окно с вводом ретинга
			setTypeRatingVisible('addRating')
			setRatingVisible(true)
		} else if (rating.id) {
			return showWarning('Ваш голос уже учтен...')
		} else if (!user.isAuth) {
			return showWarning('Голосовать могут только авторизированные пользователи')
		}
	}

	const addBasket = async () => {
		if (user.isAuth) {
			await refetch()
			try {
				await checkDeviceBasket().then((t) => {
							if (!t.data.basket_Devices.edges.length) {
								addDeviceBasket().then(res => {
									showSuccess(`Товар ${device.name} добавлен в корзину`)
									basket.addQuantityDevices()
								})
							} else {
								showWarning('Товар уже есть в корзине...')
							}
						}
				)
			} catch (error) {
				showWarning(error.message)
			}
		} else {
			showWarning('Авторизируйтесь для добавления товара в корзину...')
		}
	}

	const showToastsCreateRating = (message) => {
		showSuccess(message)
	}

	const showToastsErrorCreateRating = (message) => {
		showWarning(message)
	}

	const changeRating = () => {
		setTypeRatingVisible('editRating')
		setRatingVisible(true)
	}

	const deleteRating = () => {

		// deleteRatingDevice(rating.id).then(data => {
		// 			setTypeRatingVisible('')
		// 			fetchOneDevices(id).then(data => setDevice(data))
		// 			fetchRatingDevice({userId: user.user.id, deviceId: id}).then(data => setRating(data))
		// 		}
		// )

		deleteRatingDevice().then(res => {
			getRatingDevice().then(({data}) => {
				let quantity = data.ratings.count
				const sumRate = data.ratings.edges.map(({node}) => node.rate).reduce((sum, a) => sum + a, 0)
				console.log( '📌:',quantity, sumRate,'🌴 🏁')
				
				updateDevice({variables: {deviceId: id, rate: (!!quantity ? (sumRate / quantity) : 0)}}).then( up => console.log( '📌:',up,'🌴 🏁')
				)
			})
		})
	}

	const deleteHandler = () => {
		//deleteDevice(id).then(data => showSuccess(data.message))
		setTimeout(navigateFunc, 2000)
	}
	const navigateFunc = () => {
		navigate(SHOP_ROUTE)
	}

	return (
			<Container className='mt-4'>
				<Row>
					<Col md={4}>
						<Image src={device.img} width={300} height={300}/>
					</Col>
					<Col md={4}>
						<Stack className='d-flex flex-column align-items-center'>
							<h2>{device.name}</h2>
							<div
									style={{
										background: `url(${bigStar}) no-repeat center center`,
										width: 200,
										height: 200,
										backgroundSize: 'cover',
										fontSize: 64
									}}
									className='d-flex align-items-center justify-content-center'
							>
								{device.rating}
							</div>
						</Stack>
						<div style={{cursor: "pointer"}}
						     className='d-flex align-items-center justify-content-center mt-3'>
							<div>{!!rating?.id
									?
									<div className='d-flex flex-column align-items-center'>
										<div onClick={changeRating}>Ваша оценка - {rating.rate}</div>
										<div className='d-flex justify-content-evenly align-items-center w-75 mt-1'>
											<img style={{width: 20, height: 20}} src={editIcon} alt="edit"
											     onClick={changeRating}/>
											<img style={{width: 20, height: 20}} src={deleteIcon} alt="delete"
											     onClick={deleteRating}/>
										</div>
									</div>
									:
									<div onClick={voteHandler}>
										{user.isAuth
												? <div style={{fontWeight: 700, fontSize: 18, color: '#0d6efd'}}>Оценить</div>
												:
												<div className='text-md-center text-black-50' style={{fontSize: 14}}>Для возможности
													голосования - авторизируйтесь</div>}
									</div>}
							</div>
						</div>
					</Col>
					<Col md={4}>
						<Card
								className='d-flex flex-column align-items-center justify-content-center'
								style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgrey'}}
						>
							<h3>{priceFormatter(device.price)}</h3>
							<Button variant={'outline-primary'} className="mt-5" onClick={addBasket}>Добавить в
								корзину</Button>

							{user.user.role === 'ADMIN' &&
									<Button variant={'outline-danger'} className="mt-5" onClick={deleteHandler}>Удалить товар из
										базы</Button>}
						</Card>
					</Col>
				</Row>
				<Row>
					<h1>Характеристики</h1>
					{device?.info.map((info, index) =>
							<Row key={info.node.objectId} style={{
								background: index % 2 === 0 ? 'lightgray' : 'transparent',
								padding: 10
							}}> {info.node.title} : {info.node.description} </Row>
					)}
				</Row>
				<CreateRating
						show={ratingVisible}
						typeRatingVisible={typeRatingVisible}
						onHide={() => setRatingVisible(false)}
						userId={user.id}
						setDevice={setDevice}
						setRating={setRating}
						rating={rating}
						showToastsCreateRating={showToastsCreateRating}
						showToastsErrorCreateRating={showToastsErrorCreateRating}
				/>
				<Toasts variant={variant} title={title} show={showToasts} text={message} setShow={setShowToasts}
				        position={'top-center'}/>
			</Container>

	);
})

export default DevicePage;