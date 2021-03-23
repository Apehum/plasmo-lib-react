import React, { FunctionComponent } from "react";
import "./Input.scss";
import { Context, TestContext } from "../InputGroup";

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	size?: InputSize;
	type?: string;
}

export enum InputSize {
	NORMAL,
	LARGE,
}

const sizeToCSS = ["input_normal", "input_large"];

const Input: FunctionComponent<Props> = (props) => {
	const size = props.size === undefined ? InputSize.NORMAL : props.size;
	const type = props.type;

	return (
		<TestContext.Consumer>
			{({ groupOnChange }: Context) => (
				<input
					{...props}
					type={type}
					className={`input ${sizeToCSS[size!]}${
						props.className ? ` ${props.className}` : ""
					}`}
					onChange={(e) => {
						groupOnChange!(e.target.value);
						if(props.onChange) {
							props.onChange(e);
						}
					}}
				/>
			)}
		</TestContext.Consumer>
	);
};

export default Input;
