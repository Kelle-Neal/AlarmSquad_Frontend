// import Component from the react module
import React, { Component } from "react";
import Modal from "../components";
import axios from 'axios';

// create a class that extends the component
class Alarms2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			alarms: {
				alarmName: "",
				alarmTime: "",
			},
			alarmList: []
		};
	}
	

async componentDidMount() {
	this.refreshList();
}


refreshList = () => {
	axios.get("https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/")
	.then(res => this.setState({ alarmList: res.data }))
	.catch(err => console.log(err));
};

renderTabList = () => {
	return(
		<>
			<div className="my-5 tab-list">
				<span
					onClick={() => this.displayAlarms(true)}
					className={this.state.viewAlarms ? 'active' : ""}>Alarms</span>
			</div>
		</>
	);
};



renderAlarms = () => {
	const { viewAlarms } = this.state;
	const newAlarms = this.state.alarmList.filter(
	(alarm) => alarm.alarmName === viewAlarms
	);
	return newAlarms.map((alarm) => (
	<li
		key={alarm.id}
		className="list-group-alarm d-flex justify-content-between align-items-center"
	>
		<span>
		<button
			onClick={() => this.editAlarm(alarm)}
			className="btn btn-secondary mr-2">Edit</button>

		<button
			onClick={() => this.handleDelete(alarm)}
			className="btn btn-danger">Delete</button>
		</span>
	</li>
	));
};

toggle = () => {
	this.setState({ modal: !this.state.modal });
};


// Submit an alarm
handleSubmit = (alarm) => {
	this.toggle();
	alert("save" + JSON.stringify(alarm));
	if (alarm.id) {
	axios
		.put(`https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/${alarm.id}/`, alarm)
		.then((res) => this.refreshList());
	return;
	}
	axios
	.post("https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/", alarm)
	.then((res) => this.refreshList());
};

handleDelete = (alarm) => {
	alert("delete" + JSON.stringify(alarm));
	axios
	.delete(`https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarms/${alarm.id}/`)
	.then((res) => this.refreshList());
};

createAlarm = () => {
	const alarm = { alarmName: "", alarmTime: ""};
	this.setState({ activeAlarm: alarm, modal: !this.state.modal });
};

editAlarm = (alarm) => {
	this.setState({ activeAlarm: alarm, modal: !this.state.modal });
};

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
