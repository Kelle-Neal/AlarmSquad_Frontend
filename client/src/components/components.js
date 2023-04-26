import React, { Component } from "react";

// importing all of these classes from reactstrap module
import {
Button,
Modal,
ModalHeader,
ModalBody,
ModalFooter,
Form,
FormGroup,
Input,
Label
} from "reactstrap";

// build a class base component
class CustomModal extends Component {
constructor(props) {
	super(props);
	this.state = {
	activeItem: this.props.activeItem
	};
}
// changes handler to check if a checkbox is checked or not
handleChange = e => {
	let { name, value } = e.target;
	if (e.target.type === "checkbox") {
	value = e.target.checked;
	}
	const activeItem = { ...this.state.activeItem, [name]: value };
	this.setState({ activeItem });
};

// rendering modal in the custommodal class received toggle and on save as props,
render() {
	const { toggle, onSave } = this.props;
	return (
	<Modal isOpen={true} toggle={toggle}>
		<ModalHeader toggle={toggle}> Alarms </ModalHeader>
		<ModalBody>
		
		<Form>
			<FormGroup>
			<Label for="name">Alarm</Label>
			<Input
				type="text"
				name="name"
				value={this.state.activeItem.name}
				onChange={this.handleChange}
				placeholder="Enter Alarm Title"
			/>
			</FormGroup>

			<FormGroup>
			<Label for="time">Alarm Time</Label>
			<Input
				type='datetime-local'
				name="TimeOfAlarm"
				value={this.state.activeItem.time}
				onChange={this.handleChange}
				placeholder="Enter Alarm Time"
			/>
			</FormGroup>
		</Form>
		</ModalBody>
		{/* create a modal footer */}
		<ModalFooter>
		<Button color="success" onClick={() => onSave(this.state.activeItem)}>
			Save
		</Button>
		</ModalFooter>
	</Modal>
	);
}
}
export default CustomModal
