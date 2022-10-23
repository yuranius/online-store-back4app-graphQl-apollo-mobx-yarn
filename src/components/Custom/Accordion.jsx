import React from 'react';
import {Accordion} from "react-bootstrap";

const Acc = () => {
	return (
			<Accordion>
				<Accordion.Item eventKey="0">
					<Accordion.Header><div style={{color: '#6C757D'}}>Для тестирования пользователя с Admin правами</div></Accordion.Header>
					<Accordion.Body style={{color: '#155FCC', fontWeight:'bold'}}>
						<div>Email: <span className='mx-5'>test@test.ru</span></div>
						<div>Password: <span className='mx-3'>123456</span></div>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
	);
};

export default Acc;