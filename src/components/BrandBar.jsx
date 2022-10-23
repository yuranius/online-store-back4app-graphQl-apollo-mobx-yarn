import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Card, Col, Row} from "react-bootstrap";
import {Context} from "../index";
import {fetchDevices} from "../http/deviceAPI";

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    const selectedBrand = (id, brand) => {
        if (id === device.selectedBrand.id) {
            fetchDevices(device.selectedType.id, null, device.page, device.limit).then(data => {
                device.setDevices(data.rows)
                device.setTotalCount(data.count)
            })
            device.setSelectedBrand({})
        } else {
            device.setSelectedBrand(brand)
        }
    }

    return (
        <div>
            <Row className='d-flex'>
                {device.brands.map(brand =>
                    <Col md={3} key={brand.id}>
                        <Card
                            style={{cursor:"pointer"}}
                            className='p-3'
                            onClick={()=> selectedBrand(brand.id, brand)}
                            border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
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