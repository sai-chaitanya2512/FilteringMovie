import React, { useState } from "react";
import {
	Button,
	TextField,
	Select,
	MenuItem,
	Box,
	FormControl,
	InputLabel,
} from "@mui/material";

const MyForm = () => {
	const [formData, setFormData] = useState({ text: "", select: "" });
	const [boxes, setBoxes] = useState([]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSaveClick = () => {
		setBoxes((prevBoxes) => [...prevBoxes, formData]);
		setFormData({ text: "", select: "" });
	};

	const handleDeleteClick = (index) => {
		setBoxes((prevBoxes) => prevBoxes.filter((_, i) => i !== index));
	};

	return (
		<div>
			<FormControl fullWidth>
				<TextField
					label="Text"
					name="text"
					value={formData.text}
					onChange={handleInputChange}
					fullWidth
				/>
			</FormControl>

			<FormControl fullWidth>
				<InputLabel id="select-label">Select</InputLabel>
				<Select
					labelId="select-label"
					label="Select"
					name="select"
					value={formData.select}
					onChange={handleInputChange}
					fullWidth
				>
					<MenuItem value="option1">Option 1</MenuItem>
					<MenuItem value="option2">Option 2</MenuItem>
					<MenuItem value="option3">Option 3</MenuItem>
				</Select>
			</FormControl>

			<Button variant="contained" color="primary" onClick={handleSaveClick}>
				Save
			</Button>

			{boxes.map((box, index) => (
				<Box key={index} border={1} my={2} p={2}>
					<div>Text: {box.text}</div>
					<div>Select: {box.select}</div>
					<Button
						variant="outlined"
						color="secondary"
						onClick={() => handleDeleteClick(index)}
					>
						Delete
					</Button>
				</Box>
			))}
		</div>
	);
};

export default MyForm;
