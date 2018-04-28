import React, { Component } from 'react';

import './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
	// Complex Performance Improvment:
	// this ensures that OrderSummary will not rerender until "this.props.show" === true
	// There's no reason to rerender OrderSummary unless the modal is visable.
	// OrderSummary can be controled here because the Modal component wraps around
	// it in BurgerBuilder
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.show !== this.props.show;
	}
	// componentWillUpdate() {
	// 	console.log('[Modal] WillUpdate');
	// }
	render() {
		return (
			<Aux>
				<Backdrop show={this.props.show} clicked={this.props.modalClosed} />
				<div
					className="main-modal"
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.show ? '1' : '0',
					}}
				>
					{this.props.children}
				</div>
			</Aux>
		);
	}
}

export default Modal;
