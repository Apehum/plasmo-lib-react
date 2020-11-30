import { MomentumLanguage, momentumLanguages } from "./momentumLanguage";
import { formatNumberCases } from "./formatNumberCases";
import utils from "./index";

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
		if (utils.isBrowser()) {
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

	startOf(date: Date): string {
		const now = new Date();
		const nowTime = Math.round(now.getTime() / 1000);
		const dateTime = Math.round(date.getTime() / 1000);

		const duration = nowTime - dateTime;
		if (duration < 60) {
			return `${this.language.few} ${this.language.secondsAgo[2]} ${this.language.ago}`;
		} else if (duration < 2700) {
			const minutes = Math.floor(duration / 60);
			return `${minutes > 1 ? `${minutes} ` : ""}${formatNumberCases(
				minutes,
				this.language.minutesAgo,
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
				this.language.weeksAgo,
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
}
