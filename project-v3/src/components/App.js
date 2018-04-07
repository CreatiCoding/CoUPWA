import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MainRoute from '../routes/MainRoute';
import ListRoute from '../routes/ListRoute';
import DetailRoute from '../routes/DetailRoute';


const App = () => {
	return (
		<Router>
			<div className="app">
				<Route exact path="/" component={MainRoute}/>
				<Route path="/list" component={ListRoute}/>
				<Route path="/detail" component={DetailRoute}/>
			</div>
		</Router>
	);
}
export default App;
