export type MomentumLanguage = {
	few: string;
	ago: string;
	yesterday: string;
	secondsAgo: Array<string>;
	minutesAgo: Array<string>;
	hoursAgo: Array<string>;
	daysAgo: Array<string>;
	weeksAgo: Array<string>;
	monthsAgo: Array<string>;
	yearsAgo: Array<string>;
};

export const momentumLanguages: Map<String, MomentumLanguage> = new Map();

momentumLanguages.set("ru", {
	few: "несколько",
	ago: "назад",
	yesterday: "вчера",
	secondsAgo: ["секунду", "секунды", "секунд"],
	minutesAgo: ["минуту", "минуты", "минут"],
	hoursAgo: ["час", "часа", "часов"],
	daysAgo: ["день", "дня", "дней"],
	weeksAgo: ["неделю", "недели", "недель"],
	monthsAgo: ["месяц", "месяца", "месяцев"],
	yearsAgo: ["год", "года", "лет"],
});
