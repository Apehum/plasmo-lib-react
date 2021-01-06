// eslint-disable-next-line no-unused-vars
import React, { MouseEventHandler } from "react";
import "./Button.scss";

export enum ButtonStyle {
	MAIN,
	MAIN_ALTERNATIVE,
	SECONDARY,
}

export enum ButtonSize {
	SMALL,
	NORMAL,
	LARGE,
}

const styleToCSS = ["button_main", "button_main_alt", "button_secondary"];
const sizeToCSS = ["button_14", "button_16", "button_18"];

type Props = {
	style: ButtonStyle;
	size?: ButtonSize;
	text: string;
	className?: string;
	href?: string;
	disabled?: boolean;
	onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const Button = ({
	style,
	size,
	className,
	onClick,
	disabled,
	href,
	text,
}: Props) => {
	size = size === undefined ? ButtonSize.NORMAL : size;

	return (
		<a
			className={`button ${styleToCSS[style]} ${sizeToCSS[size!]}${
				className ? ` ${className}` : ""
			}${disabled ? ` _disabled` : ""}`}
			onClick={onClick}
			href={href}
		>
			{text}
		</a>
	);
};

export default Button;
