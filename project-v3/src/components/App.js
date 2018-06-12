import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import commonUtil from "../lib/commonUtil";
import MainRoute from "../routes/MainRoute";
import ListRoute from "../routes/ListRoute";
import DetailRoute from "../routes/DetailRoute";
import offlineUtil from "../lib/offlineUtil";
import cacheUtil from "../lib/cacheUtil";

class App extends Component {
	constructor(props) {
		super(props);

		offlineUtil
			.cacheViewToon("180612", "ViewCount")
			.then(r => offlineUtil.storeCacheThumb(r));
		offlineUtil
			.cacheViewToon("180612", "StarScore")
			.then(r => offlineUtil.storeCacheThumb(r));
		offlineUtil
			.cacheViewToon("180612", "TitleName")
			.then(r => offlineUtil.storeCacheThumb(r));
		offlineUtil
			.cacheViewToon("180612", "Update")
			.then(r => offlineUtil.storeCacheThumb(r));
		offlineUtil
			.cacheViewBannerImage("180612")
			.then(r => offlineUtil.storeCacheBanner(r));
	}
	componentDidMount() {}
	render() {
		return (
			<Router>
				<div className="app">
					<Route exact path="/" component={MainRoute} />
					<Route exact path="/list/" component={ListRoute} />
					<Route
						exact
						path="/list/:toon_info_idx"
						component={ListRoute}
					/>
					<Route exact path="/detail" component={DetailRoute} />
				</div>
			</Router>
		);
	}
}

export default App;
