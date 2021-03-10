import React, { AllHTMLAttributes, FunctionComponent } from "react";
import "./Row.scss";

const Row: FunctionComponent<AllHTMLAttributes<HTMLDivElement>> = (props) => {
	return (
		<div {...props} className={`row${props.className ? ` ${props.className}` : ""}`}>
			{props.children}
		</div>
	);
};

export default Row;
