import React from 'react';
import {Toast, ToastContainer} from "react-bootstrap";


const Toasts = ({variant, title, text, show, setShow, position}) => {
    return (
        <ToastContainer style={{width:450}} position={position}>
            <Toast
                className="d-inline-block m-1"
                bg={variant.toLowerCase()}
                onClose={() => setShow(false)} show={show} delay={3000} autohide animation
                style={{
                    position: 'absolute',
                    top: 100,
                    right: 100,
                    minWidth: 200
                }}

            >
                <Toast.Header>
                    <strong className="me-auto">{title}</strong>
                </Toast.Header>
                <Toast.Body className={(variant === 'Dark' || variant === 'Danger' || variant === 'Success') && 'text-white'}>
                    {text}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default Toasts;