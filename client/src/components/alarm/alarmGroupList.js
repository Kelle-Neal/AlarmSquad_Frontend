import React from 'react';
import axios from 'axios';

class AlarmGroupList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			alarmGroups : [],
		}

	}

	async componentDidMount() {
		axios.get('https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/alarmGroups/')
		.then(res => {
			let data = res.data.results;
			this.setState({
				alarmGroups : data	
			});
		})
		.catch(err => console.log(err));
	};

render() {
	console.log(this.state);
	return(
		<>
			{this.state.alarmGroups.map((alarmGroup, id) => (
			<div key={id}>
			<div >
				<div >
					<h1>{alarmGroup.aGroupName}</h1>
				</div>
			</div>
			</div>
			)
		)}
	</>
	);
}
}

export default AlarmGroupList;