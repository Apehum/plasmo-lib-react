import React, { FunctionComponent, ReactHTMLElement } from "react";
import "./Row.scss";

const Row: FunctionComponent<ReactHTMLElement<HTMLDivElement>> = ({props, children}) => {
	return (
		<div {...props} className={`row${props.className ? ` ${props.className}` : ""}`}>
			{children}
		</div>
	);
};

export default Row;
