import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {ListGroup} from "react-bootstrap";
import {Context} from "../index";
import {fetchDevices, fetchTypes} from "../http/deviceAPI";


const TypeBar = observer(() => {
    const {device} = useContext(Context)


    const selectedType = (id, type) => {
        if (id === device.selectedType.id) {
            fetchDevices(null, device.selectedBrand.id, device.page, device.limit).then(data => {
                device.setDevices(data.rows)
                device.setTotalCount(data.count)
            })
            device.setSelectedType({})
        } else {
            device.setSelectedType(type)
        }
    }


    return (
        <div>
            <ListGroup style={{cursor: "pointer"}}>
                {device.types.map(type =>
                    <ListGroup.Item key={type.id}
                                    onClick={(e) => selectedType(type.id, type)}
                                    active={type.id === device.selectedType.id}
                    >{type.name}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
})

export default TypeBar;