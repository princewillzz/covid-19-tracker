import { Card, CardContent, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { fetchData } from "../../api/index";

const CountryCard = ({ country }) => {
	const [confirmed, setConfirmed] = useState(0);
	const [recovered, setRecovered] = useState(0);
	const [deaths, setDeaths] = useState(0);

	useEffect(() => {
		console.log("Data");
		const getCountriesData = async () => {
			try {
				const data = await fetchData(country);

				if (data) {
					// const c = data.confirmed.value;
					// console.log(data.confirmed.value);
					setConfirmed(data.confirmed.value);
					setRecovered(data.recovered.value);
					setDeaths(data.deaths.value);
				}
			} catch (error) {
				console.log(error);
			}
		};

		getCountriesData();
	}, []);

	const [state, setState] = useState({
		raised: false,
		shadow: 1,
	});

	return (
		<>
			<Card
				onMouseOver={() => setState({ raised: true, shadow: 3 })}
				onMouseOut={() => setState({ raised: false, shadow: 1 })}
				raised={state.raised}
				zdepth={state.shadow}
				variant={state.raised ? "elevation" : "outlined"}
				className={"country_card"}
			>
				<CardContent>
					<Typography color="textSecondary" gutterBottom>
						{country}
					</Typography>
					<div className="chart-container">
						{!confirmed ? (
							"Loading..."
						) : (
							<Pie
								className="country_chart"
								data={{
									labels: ["infected", "Recovered", "Deaths"],
									datasets: [
										{
											backgroundColor: [
												"#ffbb3d",
												"green",
												"red",
											],
											data: [
												confirmed,
												recovered,
												deaths,
											],
										},
									],
								}}
								options={{
									legend: { display: true },
									title: {
										display: true,
										text: `Current state in country name`,
									},
									maintainAspectRatio: true,
									responsive: true,
								}}
							/>
						)}
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export default CountryCard;
