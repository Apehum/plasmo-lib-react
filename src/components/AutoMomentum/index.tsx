import React, { useEffect, useState } from "react";
import { Momentum } from "../../utils/momentum";

type PropsStart = {
	date: Date;
};

type NextDayListener = () => void;

const momentum = new Momentum();
let nextDayListeners: NextDayListener[] = [];
let nextDayTimeout: NodeJS.Timeout | undefined;

const removeOnNextDay = (callback: NextDayListener) => {
	nextDayListeners = nextDayListeners.filter(cb => cb !== callback);
	if (nextDayTimeout && nextDayListeners.length === 0) {
		clearTimeout(nextDayTimeout);
	}
};

const onNextDay = (callback: NextDayListener) => {
	nextDayListeners.push(callback);
	if (!nextDayTimeout) {
		const now = new Date();

		const midnight = new Date();
		midnight.setHours(24, 0, 0, 0);

		nextDayTimeout = setTimeout(() => {

		}, midnight.getTime() - now.getTime());
	}
};

const Day = ({ date }: PropsStart) => {
	const [autoMomentum, setAutoMomentum] = useState(momentum.dateOf(date));

	useEffect(() => {
		const callback = () => setAutoMomentum(momentum.dateOf(date));
		onNextDay(callback);
		return () => removeOnNextDay(callback);
	}, []);

	return <React.Fragment>{autoMomentum}</React.Fragment>;
}

const Start = ({ date }: PropsStart) => {
	const [autoMomentum, setAutoMomentum] = useState(momentum.startOf(date));
	let interval: NodeJS.Timeout;

	useEffect(() => {
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

		calculateInterval();

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [date]);

	return <React.Fragment>{autoMomentum}</React.Fragment>;
};

type PropsEnd = {
	date: Date;
	seconds?: boolean;
	prefix?: boolean;
	onEnd?: () => void;
};

const End = ({ date, onEnd, prefix = true, seconds = true }: PropsEnd) => {
	const [autoMomentum, setAutoMomentum] = useState(prefix ? momentum.endOfPrefix(date) : momentum.endOf(date));
	let interval: NodeJS.Timeout;

	useEffect(() => {
		const calculateInterval = () => {
			const duration = momentum.endOfDuration(date);

			if (duration < 86400) {
				if (duration <= 60) {
					interval = setInterval(() => {
						if(momentum.endOfDuration(date) === 0) {
							if(onEnd) {
								onEnd();
							}
							setAutoMomentum("");
							clearInterval(interval);
						}
						setAutoMomentum(prefix ? momentum.endOfPrefix(date, seconds) : momentum.endOf(date, seconds));
					}, 1000);
				} else if (duration < 3600) {
					interval = setInterval(() => {
						setAutoMomentum(prefix ? momentum.endOfPrefix(date) : momentum.endOf(date));

						if (momentum.endOfDuration(date) <= 60) {
							clearInterval(interval);
							calculateInterval();
						}
					}, 60000);
				} else {
					interval = setInterval(() => {
						setAutoMomentum(prefix ? momentum.endOfPrefix(date) : momentum.endOf(date));
						if (momentum.endOfDuration(date) <= 3600) {
							clearInterval(interval);
							calculateInterval();
						}
					}, 3600000);
				}
			}
		};

		calculateInterval();

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [date]);

	return <React.Fragment>{autoMomentum}</React.Fragment>;
};

export default {
	Day,
	Start,
	End
};
