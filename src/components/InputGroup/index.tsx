import React, { FunctionComponent, useEffect, useState } from "react";
import "./InputGroup.scss";

type Props = {
	error?: boolean;
	removeErrorOnChange?: boolean;
	disabled?: boolean;
	readOnly?: boolean
	className?: string;
};

export type Context = {
	groupOnChange?: (value: string) => void;
	readOnly?: boolean;
};

export const TestContext = React.createContext<Context | undefined>(undefined);

const InputGroup: FunctionComponent<Props> = ({
	children,
	className,
	error,
	disabled,
	readOnly,
	removeErrorOnChange = true,
}) => {
	const [err, setError] = useState(error || false);
	const [rOnly, setReadOnly] = useState(error || false);

	useEffect(() => {
		setError(!!error);
	}, [error]);

	useEffect(() => {
		setReadOnly(!!readOnly)
	}, [readOnly]);

	return (
		<div
			className={`input_group${className ? ` ${className}` : ""}${
				err ? " _error" : ""
			}${disabled ? " _disabled" : ""}${readOnly ? " _read_only" : ""}`}
		>
			<TestContext.Provider
				value={{
					groupOnChange: (value) => {
						if (removeErrorOnChange && value) {
							setError(false);
						}
					},
					readOnly: rOnly
				}}
			>
				{children}
			</TestContext.Provider>
		</div>
	);
};

export default InputGroup;
