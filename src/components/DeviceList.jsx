import React from 'react';
import {observer} from "mobx-react-lite";
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import Loader from "./Custom/Loader";

const DeviceList = observer(({device, brands, loading}) => {

    if (loading) {
        return <Loader animation={'border'} variant={'primary'}/>
    }

    return (
        <>
            {device.devices?.length ?
                <Row className='d-flex mt-3'>
                    {device.devices?.map(device =>
                        <DeviceItem key={device.id} device={device} brands={brands}/>
                    )}
                </Row>
                : <h2 className='d-flex justify-content-center mt-5 text-black-50'>Товары не найдены</h2>}
        </>
    );
})

export default DeviceList;