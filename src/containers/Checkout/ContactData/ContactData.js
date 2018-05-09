import React, { Component } from 'react';
import axios from './../../../axios-order';

import Button from './../../../components/UI/Button/Button';
import Spinner from './../../../components/UI/Spinner/Spinner';
import './ContactData.css';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			city: '',
			state: '',
			postalCode: '',
		},
		loading: false,
	};

	orderHandler = event => {
		event.preventDefault();
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'John Doe',
				address: {
					street: 'Test St.',
					zipCode: '12345',
					country: 'United States',
				},
				email: 'test@test.com',
			},
			deliveryMethod: 'fastest',
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

	render() {
		let form = (
			<form>
				<input type="text" name="name" placeholder="Name" />
				<input type="email" name="email" placeholder="Email" />
				<input type="text" name="street" placeholder="Street" />
				<input type="text" name="city" placeholder="City" />
				<input type="text" name="state" placeholder="State" />
				<input type="text" name="postal" placeholder="Postal Code" />
				<Button btnType="success" clicked={this.orderHandler}>
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
