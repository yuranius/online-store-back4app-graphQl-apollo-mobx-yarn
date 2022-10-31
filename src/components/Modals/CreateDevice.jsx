import React, {useContext, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import Toasts from "../Custom/Toasts";
import {useMutation, useQuery} from "@apollo/client";
import {CREATE_DEVICE, CREATE_FILE, CREATE_INFO, FETCH_TYPES_BRANDS,} from "../../query/deviceAPI";

const CreateDevice = observer(({show,onHide}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])
    const [error, setError] = useState('')
    const [showToasts, setShowToasts] = useState(false);

    // useEffect(() => {
    //     fetchTypes().then(data => device.setTypes(data))
    //     fetchBrands().then(data => device.setBrands(data))
    // },[])

    const addInfo = () => {
        setInfo([...info,{title:'', description:'', number: Date.now()}])
    }
    const deleteInfo = (number) => {
        setInfo(info.filter( i => i.number !== number))
    }

    const selectFile = (e) => {
        setFile(e.target.files[0])
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map( i => i.number === number ? {...i, [key]: value} : i))
    }

    const [createFile] = useMutation(CREATE_FILE)
    const [ newDevice ] = useMutation(CREATE_DEVICE)
    const [newInfo] = useMutation(CREATE_INFO)
    const { refetch } = useQuery(FETCH_TYPES_BRANDS)

    const addDevice = async () => {
        let linkFile = await createFile({
            variables: {
                file: file
            }
        }).then( (t) => t.data.createFile.fileInfo.url)

        let createdDevice = await newDevice({
            variables: {
                name: name,
                price: price,
                img: linkFile,
                brandId: device.selectedBrand.id,
                typeId: device.selectedType.id,
                rating: 0
            }
        }).then( (data) => {
            refetch()
            onHide()
            return data.data.createDevice.device
        })


        {info && info.map( el => {
            newInfo({
                variables: {
                    title: el.title,
                    description: el.description,
                    deviceId: createdDevice.objectId
                }
            })
        })}
    }


    // const addDevice = async () => {
    //
    //     try {
    //         const formData = new FormData()
    //         formData.append('name', name)
    //         formData.append('price', `${price}`)
    //         formData.append('img', file)
    //         formData.append('brandId', device.selectedBrand.id)
    //         formData.append('typeId', device.selectedType.id)
    //         formData.append('info', JSON.stringify(info))
    //         await createDevice(formData).then(data => {
    //             onHide()
    //         })
    //     } catch (error) {
    //         setShowToasts(true);
    //         setError(error.response.data.message)
    //     }
    // }

    
    return (
        <Modal show={show} onHide={() => onHide(false)} >
            <Modal.Header closeButton>
                <Modal.Title>Добавить новое устройство</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2">
                        <Dropdown.Toggle>{device.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map( type =>
                                <Dropdown.Item key={type.id} onClick={() => device.setSelectedType(type)}>{type.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2">
                        <Dropdown.Toggle>{device.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map( brand =>
                                <Dropdown.Item key={brand.id} onClick={() => device.setSelectedBrand(brand)}>{brand.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Group className="mt-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                            className="mt-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Введите название устройства"
                            autoFocus
                        />
                        <Form.Control
                            className="mt-2"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            type="number"
                            placeholder="Введите стоимость устройства"
                        />
                        <Form.Control
                            className="mt-2"
                            type="file"
                            onChange={selectFile}
                        />
                        <hr />
                        <Button variant={"outline-secondary"} onClick={addInfo}>
                            Добавить новое свойство
                        </Button>
                        {info.map( i =>
                            <Row key={i.number} className='mt-3'>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.title}
                                        placeholder='Введите название характеристики'
                                        onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.description}
                                        placeholder='Введите описание характеристики'
                                        onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button variant={"outline-danger"} onClick={() => deleteInfo(i.number)}>Удалить</Button>
                                </Col>
                            </Row>
                        )}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onHide(false)} >
                    Закрыть
                </Button>
                <Button variant="primary" onClick={() => addDevice()}>
                    Добавить
                </Button>
            </Modal.Footer>
            <Toasts variant={'Dark'} title={'Ошибка!'}  className='text-muted' show={showToasts} text={error} setShow={setShowToasts} position={'bottom-end'}/>
        </Modal>
    );
})

export default CreateDevice;