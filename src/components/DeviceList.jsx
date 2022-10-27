import React from 'react';
import {observer} from "mobx-react-lite";
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";


const DeviceList = observer(({device,brands}) => {


    return (
        <Row className='d-flex mt-3' >
            {device.devices?.map( device =>
                <DeviceItem key={device.id} device={device} brands={brands}/>
            )}
        </Row>
    );
})

export default DeviceList;