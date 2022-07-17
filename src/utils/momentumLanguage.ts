export type MomentumLanguage = {
	few: string;
	after: string;
	ago: string;
	today: string;
	yesterday: string;
	secondsAgo1: Array<string>;
	secondsAgo2: Array<string>;
	minutesAgo1: Array<string>;
	minutesAgo2: Array<string>;
	hoursAgo: Array<string>;
	daysAgo: Array<string>;
	weeksAgo1: Array<string>;
	weeksAgo2: Array<string>;
	monthsAgo: Array<string>;
	yearsAgo: Array<string>;
	months: Array<Array<string>>
};

export const momentumLanguages: Map<String, MomentumLanguage> = new Map();

momentumLanguages.set("ru", {
	few: "несколько",
	after: "через",
	ago: "назад",
	today: "сегодня",
	yesterday: "вчера",
	secondsAgo1: ["секунда", "секунды", "секунд"], // осталась
	secondsAgo2: ["секунду", "секунды", "секунд"], // через
	minutesAgo1: ["минута", "минуты", "минут"], // осталась
	minutesAgo2: ["минуту", "минуты", "минут"], // через
	hoursAgo: ["час", "часа", "часов"],
	daysAgo: ["день", "дня", "дней"],
	weeksAgo1: ["неделя", "недели", "недель"], // осталась
	weeksAgo2: ["неделю", "недели", "недель"], // через
	monthsAgo: ["месяц", "месяца", "месяцев"],
	yearsAgo: ["год", "года", "лет"],
	months: [
		["январь", "января"],
		["февраль", "февраля"],
		["март", "марта"],
		["апрель", "апреля"],
		["май", "мая"],
		["июнь", "июня"],
		["июль", "июля"],
		["август", "августа"],
		["сентябрь", "сентября"],
		["октябрь", "октября"],
		["ноябрь", "ноября"],
		["декабрь", "декабря"]
	]
});
