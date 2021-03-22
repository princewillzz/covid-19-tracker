import axios from "axios";

const url = "https://covid19.mathdro.id/api";

const fakeDataStore = new Map();

export const fetchData = async (country) => {
	let changeableUrl = url;
	if (country) {
		changeableUrl = `${url}/countries/${country}`;
	}

	// Trying to get the data from the fake local datastore
	try {
		// console.log(fakeDataStore.get(country));
		if (fakeDataStore.get(country)) {
			return fakeDataStore.get(country);
		}
	} catch (error) {}

	try {
		// fetch(changeableUrl).then((res) => console.log(res));

		const {
			data: { confirmed, recovered, deaths, lastUpdate },
		} = await axios.get(changeableUrl);

		fakeDataStore.set(country, {
			confirmed,
			recovered,
			deaths,
			lastUpdate,
		});

		return { confirmed, recovered, deaths, lastUpdate };

		//return modifiedData;
		//return response; returning the whole response
	} catch (error) {}
};

export const fetchDailyData = async () => {
	try {
		const { data } = await axios.get(`${url}/daily`);
		const modifiedData = data.map((dailyData) => ({
			confirmed: dailyData.confirmed.total,
			deaths: dailyData.deaths.total,
			date: dailyData.reportDate,
		}));
		return modifiedData;
	} catch (error) {}
};

export const fetchCountries = async () => {
	// return fetch(`${url}/countries`)
	// 	.then((res) => res.json())
	// 	.then((data) => {
	// 		const { countries } = data;
	// 		console.log(countries);
	// 		return countries.map((country) => country.name);
	// 	});

	try {
		const {
			data: { countries },
		} = await axios.get(`${url}/countries`);

		return countries.map((country) => country.name);
	} catch (error) {}
};
