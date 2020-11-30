class Index {
	isBrowser = () => typeof window !== "undefined";
}

const utils = new Index();

export default utils;
