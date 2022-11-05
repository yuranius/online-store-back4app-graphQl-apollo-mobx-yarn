import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import Toasts from "../Custom/Toasts";
import {Context} from "../../index";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useLazyQuery, useMutation} from "@apollo/client";
import {ADD_RATE, CHANGE_RATE, CHECK_RATE_USER, GET_RATING_DEVICE, UPDATE_DEVICE} from "../../query/ratingAPI";

const CreateRating = observer(({
	                               show,
	                               onHide,
	                               setDevice,
	                               setRating,
	                               rating,
	                               showToastsCreateRating,
	                               showToastsErrorCreateRating,
	                               typeRatingVisible,
                               }) => {
	const [value, setValue] = useState('')
	const [showToasts, setShowToasts] = useState(false);
	const [message, setMessage] = useState('')
	const [variant, setVariant] = useState('')
	const [title, setTitle] = useState('')
	const {user} = useContext(Context)
	const {id} = useParams()

	const setError = (message) => {
		setShowToasts(true);
		setVariant('Warning')
		setTitle('Ошибка!')
		setMessage(message)
	}

	const validateValue = (e) => {
		let value = e.target.value

		if (!value || value > 5 || value < 1) {
			setError('Значение должно быть от 1 до 5 включительно')
		} else {
			setValue(e.target.value)
		}
	}

	// ? await ratingDevice(addRatingDevice)
	//
	// : await ratingDevice(changeRatingDevice)
	function ratingDevice(nameFunction) {
		nameFunction({rate: value, userId: user.user.id, deviceId: id})
				.then(data => {
					showToastsCreateRating('Ваш голос учтен...')
					setValue('')
					onHide()
				})
				.catch(error => {
					showToastsErrorCreateRating(error.response.data.message)
					setValue('')
					onHide()
				})
	}

	const [addRatingDevice] = useMutation(ADD_RATE, {
		variables: {
			deviceId: id,
			userId: user.user.id,
			rate: +value,
		}
	})

	const [changeRatingDevice] = useMutation(CHANGE_RATE, {
		variables: {
			id: rating.id,
			rate: +value,
		}
	})

	const [checkRatingUserDevice] = useLazyQuery(CHECK_RATE_USER, {
		variables: {
			userId: user.user.id,
			deviceId: id,
		},
		fetchPolicy: 'cache-and-network'
	})

	const [getRatingDevice] = useLazyQuery(GET_RATING_DEVICE, {
		variables: {
			deviceId: id,
		},
		fetchPolicy: 'cache-and-network'
	})

	const [updateDevice] = useMutation(UPDATE_DEVICE)

	const [checkRateDevice] = useLazyQuery(CHECK_RATE_USER, {
		variables: {
			userId: user.user.id,
			deviceId: id,
		}
	})

	// const {data} = useQuery(GET_DEVICE, {
	// 	variables: {
	// 		id
	// 	},
	// 	fetchPolicy:'cache-and-network',
	// })
	//
	// useEffect(() => {
	// 	setDevice({
	// 		id: data?.device.objectId,
	// 		info: data?.device_infos.edges || [],
	// 		img: data?.device.img,
	// 		name: data?.device.name,
	// 		price: data?.device.price,
	// 		rating: data?.device.rating,
	// 		brandId: data?.device.brandId.objectId,
	// 		typeId: data?.device.typeId.objectId,
	// 	})
	// }, [id, data, rating])

	const ratingHandler = async () => {
		if (!value) {
			setShowToasts(true);
			return setMessage('Введите значение в дипазоне от 1 до 5')
		}
		try {
			{
				typeRatingVisible === 'addRating'
						? (checkRatingUserDevice().then(({data}) => {
									if (!data.ratings.count) {
										addRatingDevice().then(res => {
											getRatingDevice().then(({data}) => {
												let quantity = data.ratings.count
												const sumRate = data.ratings.edges.map(({node}) => node.rate).reduce((sum, a) => sum + a, 0)
												updateDevice({variables: {deviceId: id, rate: sumRate / quantity}})
											})
											showToastsCreateRating('Ваш голос учтен...')
											setValue('')
											onHide()
										})
									} else {
										showToastsErrorCreateRating('Ваш голос уже учтен...')
										setValue('')
										onHide()
									}
								})
						)
						: (
								changeRatingDevice().then(res => {
									console.log( '📌:',res,'🌴 🏁')
											getRatingDevice().then(({data}) => {
												let quantity = data.ratings.count
												const sumRate = data.ratings.edges.map(({node}) => node.rate).reduce((sum, a) => sum + a, 0)
												updateDevice({variables: {deviceId: id, rate: sumRate / quantity}})
											})
											showToastsCreateRating('Ваш голос учтен...')
											setValue('')
											onHide()
										}
								))
			}

			checkRateDevice().then(({data}) => setRating({
				id: data?.ratings?.edges[0]?.node.objectId,
				rate: data?.ratings?.edges[0]?.node.rate
			}))

			// fetchOneDevices(id).then(data => setDevice(data))
			// fetchRatingDevice({userId: user.user.id, deviceId: id}).then(data => setRating(data))
		} catch (error) {
			showToastsErrorCreateRating(error.response.data.message)
		}
	}

	return (
			<Modal show={show} onHide={() => onHide(false)}>
				<Modal.Header closeButton>
					<Modal.Title>{typeRatingVisible === 'addRating' ? 'Добавить' : 'Изменить'} голос</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Control
									type="number"
									placeholder="Введите значение от 1 до 5 (включительно)..."
									value={value}
									onChange={(e) => validateValue(e)}
									autoFocus
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => onHide(false)}>
						Закрыть
					</Button>
					<Button variant="primary" onClick={ratingHandler}>
						{typeRatingVisible === 'addRating' ? 'Добавить' : 'Изменить'}
					</Button>
				</Modal.Footer>
				<Toasts variant={variant} title={title} show={showToasts} text={message} setShow={setShowToasts}
				        position={'bottom-center'}/>
			</Modal>
	);
})

export default CreateRating;