import { MomentumLanguage, momentumLanguages } from "./momentumLanguage";
import { formatNumberCases } from "./formatNumberCases";
import { isBrowser, isToday, isYesterday } from "./index";

export enum LanguageVariant {
	FIRST = 1,
	SECOND = 2,
}

// Violence, Speed,
export class Momentum {
	// forsenCd
	private language: MomentumLanguage;

	constructor(language?: string) {
		if (language) {
			if (momentumLanguages.has(language)) {
				this.language = momentumLanguages.get(language)!;
				return;
			}
		}

		// next.js fix
		if (isBrowser()) {
			if (navigator) {
				// @ts-ignore
				const userLang = navigator.language || navigator.userLanguage;

				if (momentumLanguages.has(userLang)) {
					this.language = momentumLanguages.get(userLang)!;
					return;
				}
			}
		}

		// default language - russian KKomrade
		this.language = momentumLanguages.get("ru")!;
	}

	startOfDuration(date: Date): number {
		const nowTime = Math.round(new Date().getTime() / 1000);
		const dateTime = Math.round(date.getTime() / 1000);

		return nowTime - dateTime;
	}

	dateOf(date: Date, time: boolean = false): string {
		const now = new Date();
		if (isToday(date, now)) {
			return time
				? (`${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`)
				: this.language.today;
		} else if (isYesterday(date, now)) {
			return this.language.yesterday;
		} else if (now.getFullYear() !== date.getFullYear()) {
			return `${date.getDate()} ${this.language.months[date.getMonth()][1]} ${date.getFullYear()}`;
		} else {
			return `${date.getDate()} ${this.language.months[date.getMonth()][1]}`;
		}
	}

	startOf(date: Date, variant: LanguageVariant = LanguageVariant.SECOND): string {
		const now = new Date();
		const nowTime = Math.round(now.getTime() / 1000);
		const dateTime = Math.round(date.getTime() / 1000);

		const duration = nowTime - dateTime;
		if (duration < 60) {
			return `${this.language.few} ${this.language["secondsAgo" + variant][2]} ${this.language.ago}`;
		} else if (duration < 3600) {
			const minutes = Math.floor(duration / 60);
			return `${minutes > 1 ? `${minutes} ` : ""}${formatNumberCases(
				minutes,
				this.language["minutesAgo" + variant],
			)} ${this.language.ago}`;
		} else if (duration < 86400) {
			const hours = Math.floor(duration / 3600);
			return `${hours > 1 ? `${hours} ` : ""}${formatNumberCases(
				hours,
				this.language.hoursAgo,
			)} ${this.language.ago}`;
		} else if (duration < 604800) {
			const days = Math.floor(duration / 86400);
			if (days === 1) {
				return this.language.yesterday;
			} else {
				return `${days} ${formatNumberCases(
					days,
					this.language.daysAgo,
				)} ${this.language.ago}`;
			}
		} else if (duration < 2592000) {
			const weeks = Math.floor(duration / 604800);
			return `${weeks > 1 ? `${weeks} ` : ""}${formatNumberCases(
				weeks,
				this.language["weeksAgo" + variant],
			)} ${this.language.ago}`;
		} else if (duration < 31536000) {
			const weeks = Math.floor(duration / 2592000);
			return `${weeks > 1 ? `${weeks} ` : ""}${formatNumberCases(
				weeks,
				this.language.monthsAgo,
			)} ${this.language.ago}`;
		} else {
			const years = Math.floor(duration / 31536000);
			return `${years > 1 ? `${years} ` : ""}${formatNumberCases(
				years,
				this.language.yearsAgo,
			)} ${this.language.ago}`;
		}
	}

	endOfDuration(date: Date): number {
		const nowTime = Math.round(new Date().getTime() / 1000);
		const dateTime = Math.round(date.getTime() / 1000);

		return dateTime > nowTime ? dateTime - nowTime : 0;
	}

	endOf(date: Date, seconds: boolean = true, variant: LanguageVariant = LanguageVariant.SECOND): string {
		const now = new Date();
		const nowTime = Math.round(now.getTime() / 1000);
		const dateTime = Math.round(date.getTime() / 1000);

		const duration = dateTime > nowTime ? dateTime - nowTime : 0;
		if(duration === 0) {
			return "";
		} else if (duration < 60 && seconds) {
			return `${this.language.few} ${this.language["secondsAgo" + variant][2]}`;
		} else if (duration < 3600) {
			let minutes;
			if (duration < 60 && !seconds) {
				minutes = 1;
			} else {
				minutes = Math.floor(duration / 60);
			}

			return `${minutes > 1 ? `${minutes} ` : ""}${formatNumberCases(
				minutes,
				this.language["minutesAgo" + variant],
			)}`;
		} else if (duration < 86400) {
			const hours = Math.floor(duration / 3600);
			return `${hours > 1 ? `${hours} ` : ""}${formatNumberCases(
				hours,
				this.language.hoursAgo,
			)}`;
		} else if (duration < 604800) {
			const days = Math.floor(duration / 86400);
			return `${days} ${formatNumberCases(
				days,
				this.language.daysAgo,
			)}`;
		} else if (duration < 2592000) {
			const weeks = Math.floor(duration / 604800);
			return `${weeks > 1 ? `${weeks} ` : ""}${formatNumberCases(
				weeks,
				this.language["weeksAgo" + variant],
			)}`;
		} else if (duration < 31536000) {
			const weeks = Math.floor(duration / 2592000);
			return `${weeks > 1 ? `${weeks} ` : ""}${formatNumberCases(
				weeks,
				this.language.monthsAgo,
			)}`;
		} else {
			const years = Math.floor(duration / 31536000);
			return `${years > 1 ? `${years} ` : ""}${formatNumberCases(
				years,
				this.language.yearsAgo,
			)}`;
		}
	}

	endOfPrefix(date: Date, seconds: boolean = true, variant: LanguageVariant = LanguageVariant.SECOND): string {
		const now = new Date();
		const nowTime = Math.round(now.getTime() / 1000);
		const dateTime = Math.round(date.getTime() / 1000);

		const duration = dateTime > nowTime ? dateTime - nowTime : 0;
		if(duration === 0) {
			return "";
		} else if (duration < 60 && seconds) {
			return `${this.language.after} ${this.language.few} ${this.language["secondsAgo" + variant][2]}`;
		} else if (duration < 3600) {
			let minutes;
			if (duration < 60 && !seconds) {
				minutes = 1;
			} else {
				minutes = Math.floor(duration / 60);
			}

			return `${this.language.after} ${minutes > 1 ? `${minutes} ` : ""}${formatNumberCases(
				minutes,
				this.language["minutesAgo" + variant],
			)}`;
		} else if (duration < 86400) {
			const hours = Math.floor(duration / 3600);
			return `${this.language.after} ${hours > 1 ? `${hours} ` : ""}${formatNumberCases(
				hours,
				this.language.hoursAgo,
			)}`;
		} else if (duration < 604800) {
			const days = Math.floor(duration / 86400);
			return `${this.language.after} ${days} ${formatNumberCases(
				days,
				this.language.daysAgo,
			)}`;
		} else if (duration < 2592000) {
			const weeks = Math.floor(duration / 604800);
			return `${this.language.after} ${weeks > 1 ? `${weeks} ` : ""}${formatNumberCases(
				weeks,
				this.language["weeksAgo" + variant],
			)}`;
		} else if (duration < 31536000) {
			const weeks = Math.floor(duration / 2592000);
			return `${this.language.after} ${weeks > 1 ? `${weeks} ` : ""}${formatNumberCases(
				weeks,
				this.language.monthsAgo,
			)}`;
		} else {
			const years = Math.floor(duration / 31536000);
			return `${this.language.after} ${years > 1 ? `${years} ` : ""}${formatNumberCases(
				years,
				this.language.yearsAgo,
			)}`;
		}
	}
}
