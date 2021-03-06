import React from 'react';

import Logo from './../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems';
import Backdrop from './../../UI/Backdrop/Backdrop';
import Aux from './../../../hoc/Aux/Aux';
import './SideDrawer.css';

const sideDrawer = props => {
	let attachedClasses = ['side-drawer', 'close'];
	if (props.open) {
		attachedClasses = ['side-drawer', 'open'];
	}
	return (
		<Aux>
			<Backdrop show={props.open} clicked={props.closed} />
			<div className={attachedClasses.join(' ')}>
				<div className="side-drawer-logo">
					<Logo />
				</div>
				<nav>
					<NavigationItems isAuth={props.isAuth} />
				</nav>
			</div>
		</Aux>
	);
};

export default sideDrawer;
