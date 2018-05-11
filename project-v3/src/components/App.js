import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import MainRoute from "../routes/MainRoute";
import ListRoute from "../routes/ListRoute";
import DetailRoute from "../routes/DetailRoute";

class App extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Router>
				<div className="app">
					<Route exact path="/" component={MainRoute} />
					<Route path="/list/:toon_info_idx" component={ListRoute} />
					<Route path="/detail" component={DetailRoute} />
				</div>
			</Router>
		);
	}
}

export default App;
