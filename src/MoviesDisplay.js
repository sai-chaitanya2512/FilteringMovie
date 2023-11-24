import React, { Component } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: "#1976d2",
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

class MoviesDisplay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			order: "asc",
			orderBy: "director",
			page: 0,
			dense: true,
			rowsPerPage: 5,
		};
	}

	handleRequestSort = (event, property) => {
		const { orderBy, order } = this.state;
		const isAsc = orderBy === property && order === "asc";
		this.setState({
			order: isAsc ? "desc" : "asc",
			orderBy: property,
		});
	};

	handleChangePage = (event, newPage) => {
		this.setState({
			page: newPage,
		});
	};

	handleChangeRowsPerPage = (event) => {
		this.setState({
			rowsPerPage: parseInt(event.target.value, 10),
			page: 0,
		});
	};

	handleChangeDense = (event) => {
		this.setState({
			dense: event.target.checked,
		});
	};

	render() {
		const { order, orderBy, page, dense, rowsPerPage } = this.state;
		const { movies } = this.props;

		const visibleRows = this.stableSort(
			movies,
			this.getComparator(order, orderBy),
		).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

		return (
			<Box sx={{ width: "100%" }}>
				<Paper sx={{ width: "100%", mb: 2 }}>
					<TableContainer>
						<Table
							sx={{ minWidth: 750 }}
							aria-labelledby="tableTitle"
							size={dense ? "small" : "medium"}
						>
							<TableHead>
								<TableRow>
									<StyledTableCell align="left" padding="normal">
										<TableSortLabel
											active={orderBy === "name"}
											direction={order}
											onClick={(e) => this.handleRequestSort(e, "name")}
										>
											Movie Name
											{orderBy === "name" ? (
												<Box component="span" sx={visuallyHidden}>
													{order === "desc"
														? "sorted descending"
														: "sorted ascending"}
												</Box>
											) : null}
										</TableSortLabel>
									</StyledTableCell>
									<StyledTableCell align="left" padding="normal">
										<TableSortLabel
											active={orderBy === "director"}
											direction={order}
											onClick={(e) => this.handleRequestSort(e, "director")}
										>
											Director
											{orderBy === "director" ? (
												<Box component="span" sx={visuallyHidden}>
													{order === "desc"
														? "sorted descending"
														: "sorted ascending"}
												</Box>
											) : null}
										</TableSortLabel>
									</StyledTableCell>
									<StyledTableCell align="left" padding="normal">
										<TableSortLabel
											active={orderBy === "actor"}
											direction={order}
											onClick={(e) => this.handleRequestSort(e, "actor")}
										>
											Actors
											{orderBy === "actor" ? (
												<Box component="span" sx={visuallyHidden}>
													{order === "desc"
														? "sorted descending"
														: "sorted ascending"}
												</Box>
											) : null}
										</TableSortLabel>
									</StyledTableCell>
									<StyledTableCell align="left" padding="normal">
										<TableSortLabel
											active={orderBy === "releaseDate"}
											direction={order}
											onClick={(e) => this.handleRequestSort(e, "releaseDate")}
										>
											Release date
											{orderBy === "releaseDate" ? (
												<Box component="span" sx={visuallyHidden}>
													{order === "desc"
														? "sorted descending"
														: "sorted ascending"}
												</Box>
											) : null}
										</TableSortLabel>
									</StyledTableCell>
									<StyledTableCell align="left" padding="normal">
										<TableSortLabel
											active={orderBy === "hitOrFlop"}
											direction={order}
											onClick={(e) => this.handleRequestSort(e, "hitOrFlop")}
										>
											Hit Or Flop
											{orderBy === "hitOrFlop" ? (
												<Box component="span" sx={visuallyHidden}>
													{order === "desc"
														? "sorted descending"
														: "sorted ascending"}
												</Box>
											) : null}
										</TableSortLabel>
									</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{visibleRows.map((row) => (
									<StyledTableRow key={row.id}>
										<StyledTableCell align="left">{row.name}</StyledTableCell>
										<StyledTableCell align="left">
											{row.director}
										</StyledTableCell>
										<StyledTableCell align="left">{row.actor}</StyledTableCell>
										<StyledTableCell align="left">
											{row.releaseDate}
										</StyledTableCell>
										<StyledTableCell align="left">
											{row.hitOrFlop}
										</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={movies.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={this.handleChangePage}
						onRowsPerPageChange={this.handleChangeRowsPerPage}
					/>
				</Paper>
				<FormControlLabel
					control={<Switch checked={dense} onChange={this.handleChangeDense} />}
					label="Dense padding"
				/>
			</Box>
		);
	}

	stableSort(array, comparator) {
		const stabilizedThis = array.map((el, index) => [el, index]);
		stabilizedThis.sort((a, b) => {
			const order = comparator(a[0], b[0]);
			if (order !== 0) {
				return order;
			}
			return a[1] - b[1];
		});
		return stabilizedThis.map((el) => el[0]);
	}

	getComparator(order, orderBy) {
		return order === "desc"
			? (a, b) => this.descendingComparator(a, b, orderBy)
			: (a, b) => -this.descendingComparator(a, b, orderBy);
	}

	descendingComparator(a, b, orderBy) {
		if (b[orderBy] < a[orderBy]) {
			return -1;
		}
		if (b[orderBy] > a[orderBy]) {
			return 1;
		}
		return 0;
	}
}

export default MoviesDisplay;
