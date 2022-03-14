export type MomentumLanguage = {
	few: string;
	after: string;
	ago: string;
	today: string;
	yesterday: string;
	secondsAgo: Array<string>;
	minutesAgo: Array<string>;
	hoursAgo: Array<string>;
	daysAgo: Array<string>;
	weeksAgo: Array<string>;
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
	secondsAgo: ["секунду", "секунды", "секунд"],
	minutesAgo: ["минуту", "минуты", "минут"],
	hoursAgo: ["час", "часа", "часов"],
	daysAgo: ["день", "дня", "дней"],
	weeksAgo: ["неделю", "недели", "недель"],
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
