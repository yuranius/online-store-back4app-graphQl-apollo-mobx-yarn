import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {ListGroup} from "react-bootstrap";
import {Context} from "../index";

const TypeBar = observer(({loading}) => {
	const {device} = useContext(Context)

	const selectedType = (id, type) => {
		if (id === device.selectedType.id) {
			device.setSelectedType({})
		} else {
			device.setSelectedType(type)
		}
	}

	return (
			<div>
				<ListGroup style={{cursor: "pointer"}}>
					{device.types?.map(type =>
							<ListGroup.Item disabled={loading} key={type.id}
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