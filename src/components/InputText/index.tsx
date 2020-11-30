import React, { FunctionComponent } from "react";
import "./InputText.scss";

type Props = {
	className?: string,
};

const InputText: FunctionComponent<Props> = ({ children, className }) => {
	return (
		<p className={`input_text${className ? ` ${className}` : ""}`}>
			{children}
		</p>
	);
};

export default InputText;
