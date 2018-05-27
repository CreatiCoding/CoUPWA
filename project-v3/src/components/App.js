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
			.cacheViewToon(commonUtil.getYYMMDD(), "ViewCount")
			.then(r => offlineUtil.storeCacheThumb(r));
		offlineUtil
			.cacheViewToon(commonUtil.getYYMMDD(), "StarScore")
			.then(r => offlineUtil.storeCacheThumb(r));
		offlineUtil
			.cacheViewToon(commonUtil.getYYMMDD(), "TitleName")
			.then(r => offlineUtil.storeCacheThumb(r));
		offlineUtil
			.cacheViewToon(commonUtil.getYYMMDD(), "Update")
			.then(r => offlineUtil.storeCacheThumb(r));
		offlineUtil
			.cacheViewBannerImage(commonUtil.getYYMMDD())
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
