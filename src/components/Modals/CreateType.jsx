import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useMutation, useQuery} from "@apollo/client";
import {CREATE_TYPE, FETCH_TYPES_BRANDS} from "../../query/deviceAPI";


const CreateType = ({show, onHide}) => {
	const [value, setValue] = useState('')

	const [ newType ] = useMutation(CREATE_TYPE)
	const { refetch } = useQuery(FETCH_TYPES_BRANDS)

	const addType = () => {
		newType({
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
			<Modal show={show} onHide={() => onHide(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Добавить новый тип</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Control
									type="text"
									placeholder="Введите название типа"
									value={value}
									onChange={(e) => setValue(e.target.value)}
									autoFocus
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => onHide(false)}>
						Закрыть
					</Button>
					<Button variant="primary" onClick={addType}>
						Добавить
					</Button>
				</Modal.Footer>
			</Modal>
	);
};

export default CreateType;