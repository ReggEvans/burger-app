import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

// Ingredient Prices
const INGREDIENT_PRICES = {
	lettuce: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

class BurgerBuilder extends Component {
	// ==== MY NOTES ====
	// The 'constructor' way to add state to a component
	// constructor(props) {
	//     super(props);
	//     this.state = { your state }
	// }
	// ======================

	// This is a more "modern" way to add state to a component
	state = {
		ingredients: {
			lettuce: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
	};

	// Disable 'Order Now' button if no ingredients have been added
	updatePurchaseState = ingredients => {
		const sum = Object.keys(ingredients)
			.map(ingredientKey => {
				return ingredients[ingredientKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		this.setState({
			purchasable: sum > 0,
		});
	};

	// Handler for adding an ingredient and increasing price
	addIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		// Make a copy of state as not to mutate
		const updatedIngredients = {
			...this.state.ingredients,
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	};

	// Handler for removing an ingredient and decreasing price
	removeIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount - 1;
		// Make a copy of state as not to mutate
		const updatedIngredients = {
			...this.state.ingredients,
		};
		updatedIngredients[type] = updatedCount;
		const priceSubtraction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceSubtraction;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	};

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		alert('You continued!');
	};

	render() {
		// Make a copy of state.ingredients
		const disabledInfo = {
			...this.state.ingredients,
		};
		// For each key in disabledInfo, set value to true/false if less-than/greater-than 0
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					<OrderSummary
						ingredients={this.state.ingredients}
						price={this.state.totalPrice}
						purchaseCancelled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler}
					/>
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					// Pass true/false values
					disabled={disabledInfo}
					purchasable={this.state.purchasable}
					price={this.state.totalPrice}
					ordered={this.purchaseHandler}
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;
