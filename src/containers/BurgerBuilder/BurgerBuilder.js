import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
	// ==== MY NOTES ====
	// The 'constructor' way to add state to a component
	// constructor(props) {
	//     super(props);
	//     this.state = { your state }
	// }
	// ======================

	// This is a more "modern" way to add state
	state = {
		ingredients: {
			lettuce: 1,
			bacon: 1,
			cheese: 2,
			meat: 2,
		},
	};
	render() {
		return (
			<Aux>
				<Burger ingredients={this.state.ingredients} />
				<div>BuildControls</div>
			</Aux>
		);
	}
}

export default BurgerBuilder;
