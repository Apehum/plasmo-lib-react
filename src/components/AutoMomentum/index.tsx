import React, { useEffect, useState } from "react";
import { Momentum } from "../../utils/momentum";

type Props = {
	date: Date;
};

const momentum = new Momentum();

const AutoMomentum = ({ date }: Props) => {
	const [autoMomentum, setAutoMomentum] = useState(momentum.startOf(date));
	let interval: NodeJS.Timeout;

	const calculateInterval = () => {
		const duration = momentum.startOfDuration(date);

		if (duration < 86400) {
			if (duration < 60) {
				interval = setInterval(() => {
					setAutoMomentum(momentum.startOf(date));

					if (momentum.startOfDuration(date) > 60) {
						clearInterval(interval);
						calculateInterval();
					}
				}, 1000);
			} else if (duration < 3600) {
				interval = setInterval(() => {
					setAutoMomentum(momentum.startOf(date));

					if (momentum.startOfDuration(date) > 3600) {
						clearInterval(interval);
						calculateInterval();
					}
				}, 60000);
			} else {
				interval = setInterval(() => {
					setAutoMomentum(momentum.startOf(date));
				}, 3600000);
			}
		}
	};

	useEffect(() => {
		calculateInterval();

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [date]);

	return <React.Fragment>{autoMomentum}</React.Fragment>;
};

export default AutoMomentum;
