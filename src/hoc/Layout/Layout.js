import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import './Layout.css';
import Toolbar from './../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from './../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer: false,
	};

	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	};

	sideDrawerToggleHandler = () => {
		// When using state in setState, ( i.e. this.setState({showSideDrawer: !this.state.showSideDrawer})) )
		// due to the asnyc nature of setState the example above may lead to unexpected outcomes.
		// Below is the clean way to set state when it depends on the old state
		this.setState(prevState => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};

	render() {
		return (
			<Aux>
				<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
				<SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer} />
				<main className="layout-content">{this.props.children}</main>
			</Aux>
		);
	}
}

export default Layout;
