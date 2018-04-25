import React from 'react';

import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
	// ==== MY NOTES ====
	// props.ingredients is an object! We need an array of values!
	// To transform the object into an array we use "Object.keys()"
	// Object is a default javascript object. It has a keys method that extracts
	// the keys of a given object and turns that into an array!!
	// the values, however, are NOT part of the array
	// ======================
	const transformedIngredients = Object.keys(props.ingredients).map(ingredientKey => {
		return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
			return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />;
		});
	});
	// ==== MY NOTES ====
	// transformedIngredients is an array of arrays
	// each array is has an index for each type of ingredient
	// Here's an example of a double meat with bacon and double cheese:
	// [
	//     [{ props: {type: "lettuce"}, key: lettuce0} ...],
	//     [{ props: {type: "bacon"}, key: bacon0} ...],
	//     [{ props: {type: "cheese"}, key: cheese0} ...],
	//     [{ props: {type: "cheese"}, key: cheese1} ...],
	//     [{ props: {type: "meat"}, key: meat0} ...],
	//     [{ props: {type: "meat"}, key: meat1} ...],
	// ]
	// Therefore it returns a react element for each ingredient with a defined type
	// ======================
	return (
		<div className="burger">
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default burger;
