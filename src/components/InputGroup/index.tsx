import React, { FunctionComponent, useState } from "react";
import "./InputGroup.scss";

type Props = {
	error?: boolean;
	disabled?: boolean;
	className?: string;
};

export type Context = {
	groupOnChange?: (value: string) => void;
};

export const TestContext = React.createContext<Context | undefined>(undefined);

const InputGroup: FunctionComponent<Props> = ({
	children,
	className,
	error,
	disabled,
}) => {
	const [err, setError] = useState(error || false);

	return (
		<div
			className={`input_group${className ? ` ${className}` : ""}${
				err ? " _error" : ""
			}${disabled ? " _disabled" : ""}`}
		>
			<TestContext.Provider
				value={{
					groupOnChange: () => {
						setError(false);
					},
				}}
			>
				{children}
			</TestContext.Provider>
		</div>
	);
};

export default InputGroup;
