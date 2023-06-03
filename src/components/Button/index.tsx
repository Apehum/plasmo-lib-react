// eslint-disable-next-line no-unused-vars
import React, { MouseEventHandler } from "react";
import "./Button.scss";

export enum ButtonStyle {
	MAIN = "button_main",
	MAIN_INVERTED = "button_main_inverted",
	MAIN_ALTERNATIVE = "button_main_alt",
	SECONDARY = "button_secondary",
}

export enum ButtonSize {
	SMALL = "button_14",
	NORMAL = "button_16",
	LARGE = "button_18",
}

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
	size = ButtonSize.NORMAL,
	className,
	onClick,
	disabled,
	href,
	children,
	icons,
}) => (
	(
		<a
			className={`button ${icons ? ` _icons` : ""} ${style} ${size}${
				className ? ` ${className}` : ""
			}${disabled ? ` _disabled` : ""}`}
			onClick={!disabled ? onClick : undefined}
			href={!disabled ? href : undefined}
		>
			{children}
		</a>
	)
)

export default Button;
