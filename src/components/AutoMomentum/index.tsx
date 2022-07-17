import React, { useEffect, useRef, useState } from "react";
import { LanguageVariant, Momentum } from "../../utils/momentum";
import { firstLetterUpperCase, isToday, isYesterday } from "../../utils";

type NextDayListener = () => void;

const momentum = new Momentum();
let nextDayListeners: NextDayListener[] = [];
let nextDayTimeout: NodeJS.Timeout | undefined;

const removeOnNextDay = (callback: NextDayListener) => {
	nextDayListeners = nextDayListeners.filter(cb => cb !== callback);
	if (nextDayTimeout && nextDayListeners.length === 0)
		clearTimeout(nextDayTimeout);
};

const onNextDay = (callback: NextDayListener) => {
	nextDayListeners.push(callback);
	if (!nextDayTimeout) updateNextDayTimeout();
};

const updateNextDayTimeout = () => {
	const now = new Date();

	const midnight = new Date();
	midnight.setHours(24, 0, 0, 0);

	nextDayTimeout = setTimeout(() => {
		nextDayListeners.forEach(listener => listener());
		updateNextDayTimeout();
	}, midnight.getTime() - now.getTime());
};

const Day: React.FC<{
	date: Date;
	uppercase?: boolean;
	time?: boolean;
}> = ({ date, uppercase, time }) => {
	const calculateValue = () => (
		uppercase
			? firstLetterUpperCase(momentum.dateOf(date, time))
			: momentum.dateOf(date, time)
	);

	const callback = useRef<NextDayListener>();
	const [autoMomentum, setAutoMomentum] = useState(calculateValue());

	const setupCallback = () => {
		if (isToday(date) || isYesterday(date)) {
			callback.current = () => setAutoMomentum(calculateValue());
			onNextDay(callback.current);
		}
	};

	useEffect(() => {
		setAutoMomentum(calculateValue());
		setupCallback();
	}, [date]);

	useEffect(() => {
		setupCallback();

		return () => {
			if (callback.current) removeOnNextDay(callback.current);
		};
	}, []);

	return <React.Fragment>{autoMomentum}</React.Fragment>;
};

const Start: React.FC<{
	date: Date;
	variant?: LanguageVariant;
}> = ({ date, variant = LanguageVariant.SECOND }) => {
	const [autoMomentum, setAutoMomentum] = useState(momentum.startOf(date));
	const interval = useRef<NodeJS.Timeout>();

	useEffect(() => {
		setAutoMomentum(momentum.startOf(date, variant));

		const calculateInterval = () => {
			const duration = momentum.startOfDuration(date);

			if (duration < 86400) {
				if (duration < 60) {
					interval.current = setInterval(() => {
						setAutoMomentum(momentum.startOf(date, variant));

						if (momentum.startOfDuration(date) > 60) {
							if (interval.current) clearInterval(interval.current);
							calculateInterval();
						}
					}, 1000);
				} else if (duration < 3600) {
					interval.current = setInterval(() => {
						setAutoMomentum(momentum.startOf(date, variant));

						if (momentum.startOfDuration(date) > 3600) {
							if (interval.current) clearInterval(interval.current);
							calculateInterval();
						}
					}, 60000);
				} else {
					interval.current = setInterval(() => {
						setAutoMomentum(momentum.startOf(date, variant));
					}, 3600000);
				}
			}
		};

		calculateInterval();

		return () => {
			if (interval.current) clearInterval(interval.current);
		};
	}, [date]);

	return <React.Fragment>{autoMomentum}</React.Fragment>;
};

const End: React.FC<{
	date: Date;
	seconds?: boolean;
	prefix?: boolean;
	onEnd?: () => void;
	variant?: LanguageVariant;
}> = ({ date, onEnd, prefix = true, seconds = true, variant = LanguageVariant.SECOND }) => {
	const [autoMomentum, setAutoMomentum1] = useState(prefix ? momentum.endOfPrefix(date, seconds, variant) : momentum.endOf(date, seconds, variant));
	const setAutoMomentum = (date: Date | "") => setAutoMomentum1(
		date === ""
			? ""
			: prefix ? momentum.endOfPrefix(date, seconds, variant) : momentum.endOf(date, seconds, variant)
	);
	const interval = useRef<NodeJS.Timeout>();

	useEffect(() => {
		setAutoMomentum(date);

		const calculateInterval = () => {
			const duration = momentum.endOfDuration(date);

			if (duration < 86400) {
				if (duration <= 60) {
					interval.current = setInterval(() => {
						if(momentum.endOfDuration(date) === 0) {
							if(onEnd) onEnd();
							setAutoMomentum("");
							if (interval.current) clearInterval(interval.current);
						}
						setAutoMomentum(date);
					}, 1000);
				} else if (duration < 3600) {
					interval.current = setInterval(() => {
						setAutoMomentum(date);

						if (momentum.endOfDuration(date) <= 60) {
							if (interval.current) clearInterval(interval.current);
							calculateInterval();
						}
					}, 60000);
				} else {
					interval.current = setInterval(() => {
						setAutoMomentum(date);
						if (momentum.endOfDuration(date) <= 3600) {
							if (interval.current) clearInterval(interval.current);
							calculateInterval();
						}
					}, 3600000);
				}
			}
		};

		calculateInterval();

		return () => {
			if (interval.current) clearInterval(interval.current);
		};
	}, [date]);

	return <React.Fragment>{autoMomentum}</React.Fragment>;
};

export default {
	Day,
	Start,
	End
};
