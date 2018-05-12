import React, { Component } from 'react';
import { connect } from 'react-redux';

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
				<Toolbar isAuth={this.props.isAuth} drawerToggleClicked={this.sideDrawerToggleHandler} />
				<SideDrawer
					isAuth={this.props.isAuth}
					closed={this.sideDrawerClosedHandler}
					open={this.state.showSideDrawer}
				/>
				<main className="layout-content">{this.props.children}</main>
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(Layout);
