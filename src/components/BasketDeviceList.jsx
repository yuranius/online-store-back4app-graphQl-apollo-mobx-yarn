import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Badge, Button, Image, ListGroup, Row} from "react-bootstrap";
import BasketDeviceItem from "./BasketDeviceItem";
import {priceFormatter} from "../utils/formatter";


const BasketDeviceList = observer(({basketDevices, totalPrice}) => {
    return (
        <ListGroup as='ol' numbered>
            {basketDevices.map(basketDevice =>
                <BasketDeviceItem key={basketDevice.id} basketDevice={basketDevice}/>
            )}

            {basketDevices.length
                ? <div className='d-flex px-3 mt-3 align-self-end'>
                    <div className='fw-bold'>Итого: {priceFormatter(totalPrice)}</div>
                    </div>
                : <div className='d-flex justify-content-center fw-bold'>У Вас пока нет товаров в корзине...</div>
            }
            {basketDevices.length ? <Button className='mt-5 m-auto' style={{width:200}}>Оформить заказ</Button> : null}
        </ListGroup>

    );
})

export default BasketDeviceList;