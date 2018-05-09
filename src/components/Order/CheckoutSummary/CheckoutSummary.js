import React from 'react';

import Burger from './../../Burger/Burger';
import Button from './../../UI/Button/Button';
import './CheckoutSummary.css';

const checkoutSummary = props => {
	return (
		<div className="checkout-summary">
			<h1>We hope you love it!</h1>
			<div>
				<Burger ingredients={props.ingredients} />
			</div>
			<Button btnType="danger" clicked={props.onCheckoutCancelled}>
				CANCEL
			</Button>
			<Button btnType="success" clicked={props.onCheckoutContinued}>
				CONTINUE
			</Button>
		</div>
	);
};

export default checkoutSummary;
