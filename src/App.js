import React, { useState, useEffect } from "react";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import AllCountriesCard from "./components/AllCountriesCard/AllCountriesCard";
function App() {
	const [data, setData] = useState({});
	const [country, setCountry] = useState("");

	useEffect(() => {
		async function handleFetchData() {
			const fetchedData = await fetchData();
			setData(fetchedData);
		}
		handleFetchData();
	}, []);

	const handleCountryChange = async (country) => {
		setCountry(country);

		const data = await fetchData(country);
		setData(data);
	};

	return (
		<>
			<div className={styles.container}>
				<h1>Covid-19 Tracker test</h1>
				<Cards data={data} />
				<CountryPicker handleCountryChange={handleCountryChange} />
				<Chart data={data} country={country} />
			</div>
			<AllCountriesCard />
		</>
	);
}

export default App;
