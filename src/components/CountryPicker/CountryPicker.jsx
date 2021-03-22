import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import { fetchCountries } from "../../api";

import styles from "./CountryPicker.module.css";

const CountryPicker = ({ handleCountryChange }) => {
	const [fetchedCountries, setFetchedCountries] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			setFetchedCountries(await fetchCountries());
		};

		setTimeout(() => {
			fetchAPI();
		}, 0);
	}, [setFetchedCountries]);

	const optionsOfCountries = (countries) => {
		const list = countries.map((country, index) => {
			return (
				<option key={index} value={country}>
					{country}
				</option>
			);
		});

		return list;
	};

	return (
		<FormControl className={styles.formControl}>
			<NativeSelect
				defaultValue=""
				onChange={(e) => handleCountryChange(e.target.value)}
			>
				<option value="">Global</option>
				{optionsOfCountries(fetchedCountries)}
			</NativeSelect>
		</FormControl>
	);
};

export default CountryPicker;
