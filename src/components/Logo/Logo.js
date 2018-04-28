import React from 'react';

import './Logo.css';
// import images in React
import burgerLogo from './../../assets/images/burger-logo.png';

// importing the image here and using in jsx below will refer to
// a string that defines a path where webpack stores the optimized
// and copied image.

const logo = props => (
	<div className="logo">
		<img src={burgerLogo} alt="Burger Logo" />
	</div>
);

export default logo;
