import { combineReducers } from 'redux';
import mainHeaderReducer from './mainHeaderReducer';
// import reducer2 from "./reducer2"

const reducers = combineReducers({
	mainHeaderReducer,
	//, reducer2
});

export default reducers;
