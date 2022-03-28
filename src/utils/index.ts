export const isBrowser = () => typeof window !== "undefined";
export const firstLetterUpperCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export const isToday = (date: Date, now: Date = new Date()) => {
    return date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();
};
export const isYesterday = (date: Date, now: Date = new Date()) => {
    return date.getDate() === now.getDate() - 1 &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();
};
