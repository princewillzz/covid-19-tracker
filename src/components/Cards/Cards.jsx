import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";

import styles from "./Cards.module.css";

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
	const [lastUpdatedAt, setLastUpdatedAt] = useState();

	useEffect(() => {
		if (lastUpdate) {
			setLastUpdatedAt(new Date(lastUpdate).toDateString());
		}
	}, [lastUpdate]);

	return (
		<div className={styles.container}>
			<Grid container spacing={3} justify="center">
				<Grid
					item
					component={Card}
					xs={12}
					md={3}
					className={cx(styles.card, styles.infected)}
				>
					<CardContent>
						<Typography color="textSecondary" gutterBottom>
							{" "}
							Infected
						</Typography>

						<Typography variant="h5" gutterBottom>
							{" "}
							<CountUp
								start={0}
								end={!confirmed ? 0 : confirmed.value}
								duration={2.5}
								separator=","
							/>
						</Typography>
						<Typography color="textSecondary" gutterBottom>
							{" "}
							{lastUpdatedAt}
						</Typography>
						<Typography variant="body2" gutterBottom>
							{" "}
							Number of active cases of covid-19
						</Typography>
					</CardContent>
				</Grid>
				<Grid
					item
					component={Card}
					xs={12}
					md={3}
					className={cx(styles.card, styles.recovered)}
				>
					<CardContent>
						<Typography color="textSecondary" gutterBottom>
							{" "}
							Recovered
						</Typography>
						<Typography variant="h5" gutterBottom>
							{" "}
							<CountUp
								start={0}
								end={!recovered ? 0 : recovered.value}
								duration={2.5}
								separator=","
							/>
						</Typography>
						<Typography color="textSecondary" gutterBottom>
							{" "}
							{lastUpdatedAt}
						</Typography>
						<Typography variant="body2" gutterBottom>
							{" "}
							Number of recovered cases of covid-19
						</Typography>
					</CardContent>
				</Grid>
				<Grid
					item
					component={Card}
					xs={12}
					md={3}
					className={cx(styles.card, styles.deaths)}
				>
					<CardContent>
						<Typography color="textSecondary" gutterBottom>
							{" "}
							Deaths
						</Typography>
						<Typography variant="h5" gutterBottom>
							{" "}
							<CountUp
								start={0}
								end={!deaths ? 0 : deaths.value}
								duration={2.5}
								separator=","
							/>
						</Typography>
						<Typography color="textSecondary" gutterBottom>
							{" "}
							{lastUpdatedAt}
						</Typography>
						<Typography variant="body2" gutterBottom>
							{" "}
							Number of deaths cases of covid-19
						</Typography>
					</CardContent>
				</Grid>
			</Grid>
		</div>
	);
};

export default Cards;
