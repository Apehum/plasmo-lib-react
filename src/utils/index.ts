export const isBrowser = () => typeof window !== "undefined";
export const firstLetterUpperCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
