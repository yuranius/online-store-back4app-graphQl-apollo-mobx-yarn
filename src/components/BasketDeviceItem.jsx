import React, {useContext} from 'react';
import {Badge, Image, ListGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {priceFormatter} from "../utils/formatter";
import {useMutation} from "@apollo/client";
import {DELETE_DEVICE_BASKET} from "../query/basketAPI";


const BasketDeviceItem = observer(({basketDevice}) => {

    const {basket} = useContext(Context)


    const [deleteDeviceBasket] = useMutation(DELETE_DEVICE_BASKET)

    const deleteHandler = (id) => {
        deleteDeviceBasket({variables: {id}}).then(res => {
            basket.deleteBasketDevices(id)
            basket.deleteQuantityDevices()
        })
    }

    return (
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold" style={{width: 150}}>{basketDevice.name}</div>
                <div className="mx-5">
                    <Image src={basketDevice.img} width={30} height={30}/>
                </div>

            </div>
            <div className="fw-bold" style={{width: 150}}>{priceFormatter(basketDevice.price)}</div>
            <Badge bg="danger" style={{cursor:'pointer'}} onClick={()=> deleteHandler(basketDevice.id)}>
                Убрать
            </Badge>
        </ListGroup.Item>

    );
})

export default BasketDeviceItem;