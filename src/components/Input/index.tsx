import React, { FunctionComponent } from "react";
import "./Input.scss";
import { Context, TestContext } from "../InputGroup";

type Props = {
	size?: InputSize;
	value?: string;
	onChange?: (value: string) => void;
	type?: string;
	className?: string;
	placeholder?: string;
};

export enum InputSize {
	NORMAL,
	LARGE,
}

const sizeToCSS = ["input_normal", "input_large"];

const Input: FunctionComponent<Props> = ({
	className,
	value,
	onChange,
	type,
	placeholder,
	size,
}) => {
	size = size || InputSize.NORMAL;

	return (
		<TestContext.Consumer>
			{({ groupOnChange }: Context) => (
				<input
					type={type}
					placeholder={placeholder}
					className={`input ${sizeToCSS[size!]}${
						className ? ` ${className}` : ""
					}`}
					value={value}
					onChange={(e) => {
						groupOnChange!(e.target.value);
						if (onChange) {
							onChange(e.target.value);
						}
					}}
				/>
			)}
		</TestContext.Consumer>
	);
};

export default Input;
