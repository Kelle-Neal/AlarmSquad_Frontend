// import Component from the react module
import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from 'axios';

// create a class that extends the component
class Alarms2 extends Component {

// add a constructor to take props
constructor(props) {
	super(props);
	
	// add the props here
	this.state = {
	
	// the viewCompleted prop represents the status
	// of the alarm. Set it to false by default
	viewCompleted: false,
	activeAlarm: {
		title: "",
		description: "",
		completed: false
	},
	
	// this list stores all the completed tasks
	alarmList: []
	};
}

// Add componentDidMount()
async componentDidMount() {
	this.refreshList();
}


refreshList = () => {
	axios //Axios to send and receive HTTP requests
	.get("https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us95.gitpod.io/alarms/")
	.then(res => this.setState({ taskList: res.data }))
	.catch(err => console.log(err));
};

// Main variable to render alarms on the screen
renderAlarms = () => {
	const { viewAlarms } = this.state;
	const newAlarms = this.state.alarmList.filter(
	(alarm) => alarm.completed === viewAlarms
	);
	return newAlarms.map((alarm) => (
	<li
		key={alarm.id}
		className="list-group-alarm d-flex justify-content-between align-items-center"
	>
		<span>
		<button
			onClick={() => this.editAlarm(alarm)}
			className="btn btn-secondary mr-2"
		>
			Edit
		</button>
		<button
			onClick={() => this.handleDelete(alarm)}
			className="btn btn-danger"
		>
			Delete
		</button>
		</span>
	</li>
	));
};

toggle = () => {
	//add this after modal creation
	this.setState({ modal: !this.state.modal });
};


// Submit an alarm
handleSubmit = (alarm) => {
	this.toggle();
	alert("save" + JSON.stringify(alarm));
	if (alarm.id) {
	// if old post to edit and submit
	axios
		.put(`https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us95.gitpod.io/alarms/${alarm.id}/`, alarm)
		.then((res) => this.refreshList());
	return;
	}
	// if new post to submit
	axios
	.post("https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us95.gitpod.io/alarms/", alarm)
	.then((res) => this.refreshList());
};

// Delete alarm
handleDelete = (alarm) => {
	alert("delete" + JSON.stringify(alarm));
	axios
	.delete(`https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us95.gitpod.io/alarms/${alarm.id}/`)
	.then((res) => this.refreshList());
};

// Create alarm
createAlarm = () => {
	const alarm = { alarmName: "", alarmTime: ""};
	this.setState({ activeAlarm: alarm, modal: !this.state.modal });
};

//Edit alarm
editAlarm = (alarm) => {
	this.setState({ activeAlarm: alarm, modal: !this.state.modal });
};

// Start by visual effects to viewer
render() {
	return (
	<main className="content">
		<h1 className="text-success text-uppercase text-center my-4">
		AlarmSquad
		</h1>
		<div className="row ">
		<div className="col-md-6 col-sm-10 mx-auto p-0">
			<div className="card p-3">
			<div className="">
				<button onClick={this.createAlarm} className="btn btn-info">
				Add Alarm
				</button>
			</div>
			{this.renderTabList()}
			<ul className="list-group list-group-flush">
				{this.renderAlarms()}
			</ul>
			</div>
		</div>
		</div>
		{this.state.modal ? (
		<Modal
			activeAlarm={this.state.activeAlarm}
			toggle={this.toggle}
			onSave={this.handleSubmit}
		/>
		) : null}
	</main>
	);
}
}
export default Alarms2;
