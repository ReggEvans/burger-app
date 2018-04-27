import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
	const ingredientSummary = Object.keys(props.ingredients).map(ingredientKey => {
		return (
			<li key={ingredientKey}>
				<span style={{ textTransform: 'capitalize' }}>
					{ingredientKey}: {props.ingredients[ingredientKey]}
				</span>
			</li>
		);
	});
	return (
		<Aux>
			<h3>Your Order</h3>
			<p>Delicious burger with the following ingredients:</p>
			<ul>{ingredientSummary}</ul>
			<p>
				<strong>Total Price: ${props.price.toFixed(2)}</strong>
			</p>
			<p>Continue to checkout?</p>
			<Button btnType="danger" clicked={props.purchaseCancelled}>
				CANCEL
			</Button>
			<Button btnType="success" clicked={props.purchaseContinued}>
				CONTINUE
			</Button>
		</Aux>
	);
};

export default orderSummary;
