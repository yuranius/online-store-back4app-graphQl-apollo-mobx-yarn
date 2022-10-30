import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Card, Col, Row} from "react-bootstrap";
import {Context} from "../index";
import {fetchDevices} from "../http/deviceAPI";

const BrandBar = observer(({loading}) => {
    const {device} = useContext(Context)

    const selectedBrand = (id, brand) => {
        if (id === device.selectedBrand.id) {
            device.setSelectedBrand({})
        } else {
            device.setSelectedBrand(brand)
        }
    }

    return (
        <div>
            <Row className='d-flex'>
                {device.brands?.map(brand =>
                    <Col md={3} key={brand.id} >
                        <Card
                            style={{cursor:"pointer"}}
                            className={loading ? 'p-3 bg-light text-muted' : 'p-3'}
                            onClick={()=> selectedBrand(brand.id, brand)}
                            border={brand.id === device.selectedBrand.id ? 'danger' : 'success'}
                        >
                            {brand.name}
                        </Card>
                    </Col>
                )}
            </Row>
        </div>
    );
})

export default BrandBar;