import React from 'react';

import './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger = props => {
	return (
		<div className="burger">
			<BurgerIngredient type="bread-top" />
			<BurgerIngredient type="cheese" />
			<BurgerIngredient type="bacon" />
			<BurgerIngredient type="meat" />
			<BurgerIngredient type="lettuce" />
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default burger;
