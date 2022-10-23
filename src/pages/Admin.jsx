import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateDevice from "../components/Modals/CreateDevice";
import CreateType from "../components/Modals/CreateType";
import CreateBrand from "../components/Modals/CreateBrand";


const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

    return (
        <Container className='d-flex flex-column align-items-center'>
            <Button variant={"outline-dark"} className='mt-4 p-2' style={{width: 600}}
                    onClick={() => setTypeVisible(true)}>Добавить тип</Button>
            <Button variant={"outline-dark"} className='mt-4 p-2' style={{width: 600}}
                    onClick={() => setBrandVisible(true)}>Добавить бренд</Button>
            <Button variant={"outline-dark"} className='mt-4 p-2' style={{width: 600}}
                    onClick={() => setDeviceVisible(true)}>Добавить устройство</Button>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
        </Container>
    );
};

export default Admin;