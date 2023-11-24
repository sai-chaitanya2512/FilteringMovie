import React, { Component } from "react";
import Chip from "@mui/joy/Chip";
import ChipDelete from "@mui/joy/ChipDelete";

export default class Display extends Component {
	renderFilters = (data) => {
		let insertChipKeys = Object.entries(data[0]);
		console.log(insertChipKeys);
		console.log(data);
		return insertChipKeys.map((e) => {
			console.log(e, e[1]);
			return (
				<>
					{e[1] ? (
						<Chip
							size="lg"
							variant="soft"
							color="primary"
							endDecorator={
								<ChipDelete onDelete={() => this.props.onDelete(e[0])} />
							}
						>
							{e[0]} : {e[1]}
						</Chip>
					) : null}
				</>
			);
		});
	};

	render() {
		const { display } = this.props;
		if (!display.length) {
			return <h1>"NO Filters applied"</h1>;
		}

		return (
			<div style={{ marginTop: "1rem" }}>{this.renderFilters(display)}</div>
		);
	}
}
