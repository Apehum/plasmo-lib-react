import React, { FunctionComponent } from "react";
import "./Container.scss";

type Props = {
	className?: string;
};

const Container: FunctionComponent<Props> = ({ children, className }) => {
	return (
		<div className={`container${className ? ` ${className}` : ""}`}>
			{children}
		</div>
	);
};

export default Container;
