import { Card, CardContent, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { fetchData } from "../../api/index";

const CountryCard = ({ country }) => {
	const [confirmed, setConfirmed] = useState(0);
	const [recovered, setRecovered] = useState(0);
	const [deaths, setDeaths] = useState(0);
	const [lastUpdate, setLastUpdate] = useState();

	const [state, setState] = useState({
		raised: false,
		shadow: 1,
	});

	useEffect(() => {
		setTimeout(() => {
			const getCountriesData = async () => {
				try {
					const data = await fetchData(country);

					if (data) {
						// console.log(data);
						setConfirmed(data.confirmed.value);
						setRecovered(data.recovered.value);
						setDeaths(data.deaths.value);
						setLastUpdate(data.lastUpdate);
					}
				} catch (error) {}
			};

			getCountriesData();
		}, 0);

		return () => {
			setConfirmed(null);
			setRecovered(null);
			setDeaths(null);
			setState({});
		};
	}, [country]);

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
										text: `Last Updated on ${new Date(
											lastUpdate
										).toUTCString()}`,
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
