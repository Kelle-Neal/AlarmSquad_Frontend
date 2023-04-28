import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete,
{ createFilterOptions } from '@material-ui/lab/Autocomplete';
import AlarmGroupList from './alarmGroupList';
const filter = createFilterOptions();

const SelectAlarmGroup = () => {

// Our sample dropdown options
const options = <AlarmGroupList/>

return (
	<div style={{ marginLeft: '40%', marginTop: '60px' }}>
	<Autocomplete
		filterOptions={(options, params) => {
		const filtered = filter(options, params);
		// Suggest the creation of a new value
		if (params.inputValue !== '') {
			filtered.push(`Add "${params.inputValue}"`);
		}
		return filtered;
		}}
		selectOnFocus
		clearOnBlur
		handleHomeEndKeys
		options={options}
		renderOption={(option) => option}
		style={{ width: 300 }}
		freeSolo
		renderInput={(params) => (
		<TextField {...params} label="Select Alarm Group"
			variant="outlined" />
		)}
	/>
	</div>
);
}

export default SelectAlarmGroup;
