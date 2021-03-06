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
	icons?: boolean;
	size?: ButtonSize;
	className?: string;
	href?: string;
	disabled?: boolean;
	onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const Button: React.FC<Props> = ({
	style,
	size,
	className,
	onClick,
	disabled,
	href,
	children,
	icons,
}) => {
	size = size === undefined ? ButtonSize.NORMAL : size;

	return (
		<a
			className={`button ${icons ? ` _icons` : ""} ${styleToCSS[style]} ${sizeToCSS[size!]}${
				className ? ` ${className}` : ""
			}${disabled ? ` _disabled` : ""}`}
			onClick={!disabled ? onClick : undefined}
			href={!disabled ? href : undefined}
		>
			{children}
		</a>
	);
};

export default Button;
