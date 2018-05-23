import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import MainRoute from "../routes/MainRoute";
import ListRoute from "../routes/ListRoute";
import DetailRoute from "../routes/DetailRoute";
import indexedDBUtil from "../lib/indexedDBUtil";
import offlineUtil from "../lib/offlineUtil";

import coupwaFetch from "../lib/coupwaFetch";

class App extends Component {
	constructor(props) {
		super(props);
		offlineUtil.storeCacheViewToon(true).then(r => {
			if (!r) console.log("이미 데이터가 있습니다.");
			else console.log("정상적으로 저장되었습니다.");
		});
		offlineUtil.isCachedViewToon("ViewCount", "mon").then(r => {
			if (r) console.log("caching이 되어있습니다.");
			else console.log("없습니다");
		});
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
