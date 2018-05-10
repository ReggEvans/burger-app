import React from 'react';

import './Input.css';

const input = props => {
	let inputElement = null;
	let validationError = null;
	const inputClasses = ['inputElement'];

	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push('invalid');
		validationError = <p className="validationError">{props.errorMessage}</p>;
	}

	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case 'textarea':
			inputElement = (
				<textarea
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case 'select':
			inputElement = (
				<select
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				>
					{props.elementConfig.options.map(option => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = <input className="inputElement" {...props.elementConfig} value={props.value} />;
	}

	return (
		<div className="input">
			<label>{props.label}</label>
			{inputElement}
			{validationError}
		</div>
	);
};

export default input;
