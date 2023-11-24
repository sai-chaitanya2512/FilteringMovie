import React, { Component } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl"; // Import FormControl
import arr from "../Movies.json";

export default class SelectingTag extends Component {
	render() {
		const { handleChange, data } = this.props;
		let newArray = [...new Set(arr.map((e) => e.director))];
		let actorNewArray = [...new Set(arr.map((e) => e.actor))];

		return (
			<>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label1">Director</InputLabel>
					<Select
						labelId="demo-simple-select-label1"
						id="demo-simple-select-1"
						value={data.dirName}
						name="dirName"
						label="Director"
						onChange={handleChange}
					>
						{newArray.map((item, index) => (
							<MenuItem key={index} value={item}>
								{item}
							</MenuItem>
						))}
					</Select>
					<br />
				</FormControl>
				<FormControl>
					<InputLabel id="demo-simple-select-label2">Actor</InputLabel>
					<Select
						labelId="demo-simple-select-label2"
						id="demo-simple-select-2"
						value={data.actor}
						name="actor"
						label="Actor"
						onChange={handleChange}
					>
						{actorNewArray.map((item, index) => (
							<MenuItem key={index} value={item}>
								{item}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</>
		);
	}
}
