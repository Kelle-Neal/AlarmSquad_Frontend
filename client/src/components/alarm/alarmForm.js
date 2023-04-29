import React from "react";
import axios from "axios";

class FormNewAlarm extends React.Component {
	state = {
		alarms: [],
    label: "",
    whatTime: "",
	};

	componentDidMount() {
		let data;

		axios
			.get("https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/api/alarms/")
			.then((res) => {
				data = res.data;
				this.setState({
					alarms: data,
				});
			})
			.catch((err) => {});
	}

	renderSwitch = (param) => {
		switch (param + 1) {
			case 1:
				return "primary ";
			case 2:
				return "secondary";
			case 3:
				return "success";
			case 4:
				return "danger";
			case 5:
				return "warning";
			case 6:
				return "info";
			default:
				return "yellow";
		}
	};

	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post("https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/api/alarms/", {
				name: this.state.label,
				time: this.state.whatTime,
			})
			.then((res) => {
				this.setState({
					label: "",
					whatTime: "",
				});
			})
			.catch((err) => {});
	};

	render() {
		return (
			<div className="container jumbotron ">
				<form onSubmit={this.handleSubmit}>
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text"
								id="basic-addon1">
								{" "}
								Name{" "}
							</span>
						</div>
						<input type="text" className="form-control"
							placeholder="Name of Alarm"
							aria-label="Name"
							aria-describedby="basic-addon1"
							value={this.state.label} name="label"
							onChange={this.handleInput} />
					</div>

					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text">
							Time
							</span>
						</div>
						<textarea className="form-control "
								aria-label="With textarea"
								placeholder="Enter Time"
								value={this.state.whatTime} name="whatTime"
								onChange={this.handleInput}>
						</textarea>
					</div>

					<button type="submit" className="btn btn-primary mb-5">
						Submit
					</button>
				</form>

				<hr
					style={{
						color: "#000000",
						backgroundColor: "#000000",
						height: 0.5,
						borderColor: "#000000",
					}}
				/>

				{this.state.alarms.map((alarm, id) => (
					<div key={id}>
						<div className="card shadow-lg">
							<div className={"bg-" + this.renderSwitch(id % 6) +
										" card-header"}>Alarm {id + 1}</div>
							<div className="card-body">
								<blockquote className={"text-" + this.renderSwitch(id % 6) +
												" blockquote mb-0"}>
									<h1> {alarm.whatTime} </h1>
									<footer className="blockquote-footer">
										{" "}
									</footer>
								</blockquote>
							</div>
						</div>
						<span className="border border-primary "></span>
					</div>
				))}
			</div>
		);
	}
}
export default FormNewAlarm;











































// import React, { useEffect, useState } from "react";
// import axios from 'axios';

// function AlarmList() {
//   const [alarms, setAlarms] = useState([]);
//   const [time, setTime] = useState('');
//   const [label, setLabel] = useState('');

//   useEffect(() => {
//     axios.get('/api/alarms')
//       .then(response => setAlarms(response.data))
//       .catch(error => console.log(error));
//   }, []);

//   const handleSubmit

// }