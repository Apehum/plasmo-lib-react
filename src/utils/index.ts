export const isBrowser = () => typeof window !== "undefined";
export const firstLetterUpperCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export const isToday = (date: Date, now: Date = new Date()) => {
    return date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();
};
export const isYesterday = (date: Date, now: Date = new Date()) => {
    const yesterday = new Date(now);
    yesterday.setHours(-24, 0, 0, 0);

    return date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear();
};
