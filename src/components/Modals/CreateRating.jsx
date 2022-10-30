import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {addRatingDevice, changeRatingDevice, fetchOneDevices, fetchRatingDevice} from "../../http/deviceAPI";
import Toasts from "../Custom/Toasts";
import {Context} from "../../index";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useMutation} from "@apollo/client";
import {ADD_RATE} from "../../query/ratingAPI";


const CreateRating = observer(({
                                   show,
                                   onHide,
                                   setDevice,
                                   setRating,
                                   showToastsErrorDevisePage,
                                   showToastsMessageDevisePage,
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

    function ratingDevice(nameFunction) {
        nameFunction({rate: value, userId: user.user.id, deviceId: id})
            .then(data => {
                showToastsMessageDevisePage('Ваш голос учтен...')
                setValue('')
                onHide()
            })
            .catch(error => {
                showToastsErrorDevisePage(error.response.data.message)
                setValue('')
                onHide()
            })
    }


    const [] = useMutation(ADD_RATE)


    const ratingHandler = async () => {
        if (!value) {
            setShowToasts(true);
            return setMessage('Введите значение в дипазоне от 1 до 5')
        }
        try {
            {typeRatingVisible === 'addRating'
                ? await ratingDevice(addRatingDevice)
                : await ratingDevice(changeRatingDevice)
            }
            fetchOneDevices(id).then(data => setDevice(data))
            fetchRatingDevice({userId: user.user.id, deviceId: id}).then(data => setRating(data))
        } catch (error) {
            showToastsErrorDevisePage(error.response.data.message)
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