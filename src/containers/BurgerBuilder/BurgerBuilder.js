import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from './../../axios-order';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

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
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false,
	};

	componentDidMount() {
		axios
			.get('https://react-my-burger-ea5a9.firebaseio.com/ingredients.json')
			.then(res => {
				this.setState({ ingredients: res.data });
			})
			.catch(error => {
				this.setState({ error: true });
			});
	}

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
		// alert('You continued!');
		this.setState({ loading: true });
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
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
				this.setState({ loading: false, purchasing: false });
			})
			.catch(error => {
				this.setState({ loading: false, purchasing: false });
			});
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
		let orderSummary = null;
		let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
		if (this.state.ingredients) {
			burger = (
				<Aux>
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
			orderSummary = (
				<OrderSummary
					ingredients={this.state.ingredients}
					price={this.state.totalPrice}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
				/>
			);
		}
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}
		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
