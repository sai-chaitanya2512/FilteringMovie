import { Button } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

import SelectingTag from "./Select";
import RadioGroups from "./RadioGroup";

export default class Form extends React.Component {
	state = this.props.state;

	componentDidUpdate(prevProps) {
		if (prevProps.state !== this.props.state) {
			this.setState({ ...this.props.state });
		}
	}

	clickFun = () => {
		this.setState(
			(prevState) => ({ ...prevState }),
			() => this.props.but(this.state),
		);
	};

	handleChange = (event) => {
		let obj = {
			...this.state,
			[event.target.name]: event.target.value,
		};
		this.setState(obj);
	};

	render() {
		console.log(this.state);
		return (
			<>
				<h1>This is inputing field</h1>
				<Box
					sx={{
						width: 500,
						border: "2px solid",
						padding: 2,
						borderColor: "primary.main",
					}}
				>
					<FormControl fullWidth>
						<SelectingTag data={this.state} handleChange={this.handleChange} />

						<RadioGroups data={this.state} handleChange={this.handleChange} />
						<Button
							onClick={this.clickFun}
							sx={{ marginTop: 2 }}
							variant="contained"
						>
							Filter
						</Button>
					</FormControl>
				</Box>
			</>
		);
	}
}
