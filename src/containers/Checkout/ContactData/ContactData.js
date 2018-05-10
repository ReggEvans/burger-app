import React, { Component } from 'react';
import axios from './../../../axios-order';

import Button from './../../../components/UI/Button/Button';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Input from './../../../components/UI/Input/Input';
import './ContactData.css';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Name',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				errorMessage: 'Please enter a valid name.',
				touched: false,
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				errorMessage: 'Please enter a valid street.',
				touched: false,
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip Code',
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
				},
				valid: false,
				errorMessage: 'Please enter a valid zip code.',
				touched: false,
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				errorMessage: 'Please enter a valid country.',
				touched: false,
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Email',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				errorMessage: 'Please enter a valid email.',
				touched: false,
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' },
					],
				},
				value: 'fastest',
				validation: {},
				valid: true,
			},
		},
		loading: false,
		formIsValid: false,
	};

	orderHandler = event => {
		event.preventDefault();
		this.setState({ loading: true });
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData,
		};
		axios
			.post('/orders.json', order)
			.then(response => {
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({ loading: false });
			});
	};

	checkValidity(value, rules) {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		return isValid;
	}

	inputChangedHandler = (event, inputIdentifier) => {
		// cloning state as not to mutate
		const updatedOrderForm = {
			...this.state.orderForm,
		};
		// also have to clone nested levels as not to mutate those either
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier],
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		updatedOrderForm[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		}

		this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
	};

	render() {
		const formElementArray = [];
		for (let key in this.state.orderForm) {
			formElementArray.push({
				id: key,
				config: this.state.orderForm[key],
			});
		}
		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementArray.map(formElement => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						errorMessage={formElement.config.errorMessage}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						changed={event => this.inputChangedHandler(event, formElement.id)}
					/>
				))}
				<Button btnType="success" disabled={!this.state.formIsValid}>
					ORDER
				</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className="contact-data">
				<h4>Enter your Contact Info</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
