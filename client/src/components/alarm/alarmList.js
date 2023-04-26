import React from 'react';
import axios from 'axios';

class AlarmList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			alarms : [],
		}

	}

	componentDidMount() {
		axios.get('https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us95.gitpod.io/alarms/')
		.then(res => {
			let data = res.data.results;
			this.setState({
				alarms : data	
			});
		})
		.catch(err => {})
	}

render() {
	console.log(this.state);
	return(
		<>
			{this.state.alarms.map((alarm, id) => (
			<div key={id}>
			<div >
				<div >
						<h1>{alarm.alarmName}" - "{alarm.alarmTime}</h1>
				</div>
			</div>
			</div>
			)
		)}
	</>
	);
}
}

export default AlarmList;























// import { useState, useEffect } from 'react'
// import axios from 'axios';

// const BASE_URL = 'https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us95.gitpod.io/api'

// function AlarmList() {
//   const [alarms, setAlarms] = useState([]);

//   useEffect (() => {
//     const getAlarms = async () => {
//       let config = {
//         url: '/alarms/',
//         baseURL: BASE_URL,
//         method: 'get',
//       }
//       let response = await axios.request(config);
//       setAlarms(response.data);
//     }
//     getAlarms();
//   }, [])

//   return (
//     <>
//       <div>
//       {alarms.map((a) => <h3>(a.label)" - "(a.whatTime)</h3>)}
//       </div>
//     </>
//   )

// }

// export default AlarmList;