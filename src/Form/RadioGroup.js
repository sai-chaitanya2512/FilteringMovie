import React, { Component } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default class RadioGroups extends Component {
	render() {
		const { handleChange, data } = this.props;

		return (
			<RadioGroup
				row
				aria-labelledby="demo-form-control-label-placement"
				name="judgement"
				defaultValue="top"
				value={data.judgement}
				onChange={handleChange}
			>
				<FormControlLabel value="Flop" control={<Radio />} label="Flop" />
				<FormControlLabel value="Hit" control={<Radio />} label="Hit" />
				<FormControlLabel
					value="Blockbuster"
					control={<Radio />}
					label="Blockbuster"
				/>
			</RadioGroup>
		);
	}
}
