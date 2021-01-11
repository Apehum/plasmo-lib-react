import React, { FunctionComponent } from "react";
import "./InputText.scss";

type Props = {
	size?: InputTextSize,
	className?: string,
};

export enum InputTextSize {
	SMALL,
	NORMAL,
}

const sizeToCSS = ["_small", "_normal"];

const InputText: FunctionComponent<Props> = ({ size, children, className }) => {
	size = size === undefined ? InputTextSize.NORMAL : size;

	return (
		<p className={`input_text ${sizeToCSS[size!]}${className ? ` ${className}` : ""}`}>
			{children}
		</p>
	);
};

export default InputText;
