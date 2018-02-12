import React, { Component } from 'react';
import MainHeaderContainer from '../containers/MainHeaderContainer';

const propTypes = {};

const defaultProps = {};

class App extends Component {

	componentDidMount() {}

	render() {
		return (
			<div>
				<MainHeaderContainer />
			</div>
		);
	}
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
