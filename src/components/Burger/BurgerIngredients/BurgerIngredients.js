import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './BurgerIngredients.css';

class BurgerIngredients extends Component {
	render() {
		let ingredient = null;

		switch (this.props.type) {
			case 'bread-bottom':
				ingredient = <div className="bread-bottom" />;
				break;
			case 'bread-top':
				ingredient = (
					<div className="bread-top">
						<div className="seeds1" />
						<div className="seeds2" />
					</div>
				);
				break;
			case 'meat':
				ingredient = <div className="meat" />;
				break;
			case 'cheese':
				ingredient = <div className="cheese" />;
				break;
			case 'lettuce':
				ingredient = <div className="lettuce" />;
				break;
			case 'bacon':
				ingredient = <div className="bacon" />;
				break;
			default:
				ingredient = null;
		}
		return ingredient;
	}
}

BurgerIngredients.propTypes = {
	type: PropTypes.string.isRequired,
};

export default BurgerIngredients;
