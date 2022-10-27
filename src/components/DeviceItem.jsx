import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from '../images/star.png'
import { useNavigate } from 'react-router-dom';
import {DEVICE_ROUTE} from "../utils/consts";



const DeviceItem = ({device,brands}) => {
    // получаем имя бренда текущего элемента
    const brand = brands?.filter( (brand) => brand.id === device.brandId).map( brand => brand.name)[0]
    const navigate = useNavigate()
    return (
        <Col  md={3} onClick={()=> navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card
                border={"light"}
                style={{width: 150, cursor: "pointer", marginTop:10}}
            >
                <Image src={device.img} width={150} height={150}/>
                <div className='text-black-50 d-flex justify-content-between align-items-center mt-2'>
                    <div>{brand}</div>
                    <div className='d-flex align-items-center'>
                        <div className='mx-1'>{device.rating}</div>
                        <Image src={star} width={18} height={18} />
                    </div>
                </div>
                <div>
                    {device.name}
                </div>
            </Card>
        </Col>
    );
};

export default DeviceItem;