import { Component } from "react";
import "./App.css";
import { Button, FormControl } from "@mui/material";
import moviesData from "./Movies.json";
import Display from "./Form/Display";
import Form from "./Form/Form";
import MoviesDisplay from "./MoviesDisplay";

export default class App extends Component {
	state = {
		displayArray: {},
		movies: moviesData,
		obj: {
			dirName: "",
			judgement: "",
			actor: "",
		},
	};

	onButton = (obj) => {
		this.setState({ displayArray: [obj] }, () => {
			this.filter(this.state.displayArray);
		});
	};

	onDelete = (key) => {
		this.setState(
			(prevState) => {
				const updatedDisplayArray = [...prevState.displayArray];
				const updatedObject = { ...updatedDisplayArray[0], [key]: "" };
				updatedDisplayArray[0] = updatedObject;
				return { displayArray: updatedDisplayArray };
			},
			() => {
				this.filter(this.state.displayArray);
				console.log(this.state);
			},
		);
	};

	filter = (arr) => {
		console.log(arr, "displayArray");
		let pushingArray = [],
			sai;
		let dupli = moviesData;
		console.log(dupli);
		arr.forEach((e) => {
			sai = dupli.filter((movieItem) => {
				// console.log(e, movieItem);
				return (
					// movieItem.director === e.dirName &&
					(e.dirName != "" ? movieItem.director === e.dirName : true) &&
					(e.judgement != "" ? movieItem.hitOrFlop === e.judgement : true) &&
					(e.actor != "" ? movieItem.actor === e.actor : true)
				);
			});
			pushingArray = [...pushingArray, ...sai];
		});
		console.log(pushingArray, "filytererd movies");
		this.setState((prevState) => ({
			...prevState,
			movies: pushingArray,
		}));
	};

	clear = () => {
		let OBJ = {
			displayArray: [],
			movies: moviesData,
			obj: {
				dirName: "",
				judgement: "",
				actor: "",
			},
		};
		this.setState(OBJ, () => console.log(this.state));
	};

	render() {
		// console.log(this.state);
		return (
			<div>
				<center>
					<Form state={this.state.obj} but={this.onButton} />

					<Display onDelete={this.onDelete} display={this.state.displayArray} />

					<FormControl>
						<Button
							onClick={this.clear}
							sx={{ marginTop: 2 }}
							variant="contained"
						>
							clear
						</Button>
						<br />
					</FormControl>
					<MoviesDisplay
						movies={this.state.movies}
						displayArray={this.state.displayArray}
					/>
				</center>
			</div>
		);
	}
}
