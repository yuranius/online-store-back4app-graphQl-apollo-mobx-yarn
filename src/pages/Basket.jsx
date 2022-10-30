import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import BasketDeviceList from "../components/BasketDeviceList";
import {useGetBasketDevice} from "../hooks/useGetBasketDevice";

const Basket = observer(() => {
    const [totalPrice, setTotalPrice] = useState(0)
    const {user} = useContext(Context)
    const {basket} = useContext(Context)


    const {fetchDeviceBasket} = useGetBasketDevice()

    useEffect( () => {
        if (!!user.user.id) {
            fetchDeviceBasket(user.user.id)
        }
    }, [])


    useEffect(() => {
        if (basket.basketDevices.length !== 0) {
            setTotalPrice(basket.basketDevices.map(object => object.price).reduce((p, c) => p + c))
        } else {
            setTotalPrice(0)
        }
    }, [basket.basketDevices]);


    return (
        <Container>
            <Row className='mt-5'>
                <Col md={12}>
                    <BasketDeviceList basketDevices={basket.basketDevices} totalPrice={totalPrice}/>
                </Col>
            </Row>
        </Container>
    );
})

export default Basket;