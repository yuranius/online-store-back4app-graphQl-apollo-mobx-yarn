import React, {useContext} from 'react';
import {Badge, Card, Col, Image, ListGroup} from "react-bootstrap";
import star from '../images/star.png'
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {priceFormatter} from "../utils/formatter";
import {deleteBasketDevice} from "../http/basketAPI";




const BasketDeviceItem = observer(({basketDevice}) => {

    const {basket} = useContext(Context)

    const deleteHandler = (id) => {
        deleteBasketDevice({id, basketId:basketDevice.basketId}).then(data => {
            basket.deleteBasketDevices(id)
            basket.deleteQuantityDevices()
        })
    }


    return (
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto d-flex justify-content-between align-items-start">
                <div className="fw-bold" style={{width:150}}>{basketDevice.name}</div>
                <div>
                    <Image src={process.env.REACT_APP_API_URL + basketDevice.img} width={30} height={30}/>
                </div>

            </div>
            <div className="fw-bold" style={{width:150}}>{priceFormatter(basketDevice.price)}</div>
            <Badge bg="danger" style={{cursor:'pointer'}} onClick={()=> deleteHandler(basketDevice.id)}>
                Убрать
            </Badge>
        </ListGroup.Item>

    );
})

export default BasketDeviceItem;