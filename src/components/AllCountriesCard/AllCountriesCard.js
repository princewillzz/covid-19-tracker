import React, { useEffect, useState } from "react";

import CountryCard from "./CountryCard";

import "./AllCountriesCard.css";

import { fetchCountries } from "../../api/index";
import { Button, Paper } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { RestoreOutlined, SearchOutlined } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

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
		setTimeout(() => {
			const setCountriesList = async () => {
				const countries = await fetchCountries();
				setFinalCountries(countries);
				setCountries(countries);
			};
			setCountriesList();
		}, 0);
	}, []);

	// Render sub-components
	const renderComponents = () => {
		if (!countries || countries.length <= 0) {
			return (
				<Alert
					style={{ width: "70vw", margin: "auto" }}
					severity="error"
					action={
						<Button
							onClick={handleReset}
							color="inherit"
							size="small"
						>
							UNDO
						</Button>
					}
				>
					{" "}
					No Results found ...!
				</Alert>
			);
		}

		return countries.map((country) => {
			return <CountryCard key={country} country={country} />;
		});
	};

	const handleReset = () => {
		setSearchValue("");
		setCountries(finalCountries);
	};

	const handleSearch = (value) => {
		setSearchValue(value);
		console.log(value);

		if (!value) {
			setCountries(finalCountries);
			return;
		}

		const searchResult = finalCountries.filter((country) =>
			country.toLowerCase().includes(value.toLocaleLowerCase())
		);
		// console.log(searchResult);
		setCountries(searchResult);
	};

	return (
		<>
			<div className="search-container">
				<IconButton type="button" onClick={handleReset}>
					<RestoreOutlined />
				</IconButton>
				<Paper
					// onSubmit={handleSearch}
					// component="form"
					className={classes.root}
				>
					<InputBase
						value={searchValue}
						onChange={(e) => handleSearch(e.target.value)}
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
			<div className="allCountiesContainer">{renderComponents()}</div>
		</>
	);
};

export default AllCountriesCard;
