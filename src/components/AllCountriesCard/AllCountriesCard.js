import React, { useEffect, useState } from "react";

import CountryCard from "./CountryCard";

import "./AllCountriesCard.css";

import { fetchCountries, fetchData } from "../../api/index";
import { Paper } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { SearchOutlined } from "@material-ui/icons";

// import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
	root: {
		padding: "2px 4px",
		display: "flex",
		alignItems: "center",
		width: 400,
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
	divider: {
		height: 28,
		margin: 4,
	},
}));

const AllCountriesCard = () => {
	const [finalCountries, setFinalCountries] = useState([]);

	const [countries, setCountries] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const classes = useStyles();

	useEffect(() => {
		const setCountriesList = async () => {
			const countries = await fetchCountries();
			setFinalCountries(countries);
			setCountries(countries);
		};
		setCountriesList();
	}, []);

	const handleSearch = (e) => {
		e.preventDefault();
		if (!searchValue) {
			return;
		}
		console.log(searchValue);
		const searchResult = finalCountries.filter((country) =>
			country.toLowerCase().includes(searchValue.toLocaleLowerCase())
		);
		console.log(searchResult);
		setCountries(searchResult);
	};

	return (
		<>
			<div className="search-container">
				<Paper
					onSubmit={handleSearch}
					component="form"
					className={classes.root}
				>
					<InputBase
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						className={classes.input}
						placeholder="Search Country"
						inputProps={{ "aria-label": "search country" }}
					/>
					<IconButton
						type="submit"
						className={classes.iconButton}
						aria-label="search"
					>
						<SearchOutlined />
					</IconButton>
					<Divider
						className={classes.divider}
						orientation="vertical"
					/>
				</Paper>
			</div>
			<div className="allCountiesContainer">
				{countries.map((country) => {
					return <CountryCard key={country} country={country} />;
				})}
			</div>
		</>
	);
};

export default AllCountriesCard;
