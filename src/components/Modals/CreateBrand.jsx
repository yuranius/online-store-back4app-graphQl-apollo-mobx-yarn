import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createBrand} from "../../http/deviceAPI";
import {useMutation, useQuery} from "@apollo/client";
import {CREATE_BRAND, FETCH_TYPES_BRANDS_DEVICES} from "../../query/deviceAPI";

const CreateBrand = ({show,onHide}) => {
    const [value, setValue] = useState('')


  const [ newBrand ] = useMutation(CREATE_BRAND)
  const { refetch } = useQuery(FETCH_TYPES_BRANDS_DEVICES)

  const addBrand = () => {
    newBrand({
      variables: {
        name: value,
      }
    }).then( () => {
      refetch()
      setValue('')
      onHide()
    })
  }


    return (
        <Modal show={show} onHide={() => onHide(false)} >
            <Modal.Header closeButton>
                <Modal.Title>Добавить новый бренд</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                            type="text"
                            placeholder="Введите название бренда"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            autoFocus
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onHide(false)} >
                    Закрыть
                </Button>
                <Button variant="primary" onClick={addBrand} >
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;