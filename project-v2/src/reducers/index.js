import { combineReducers } from 'redux';
import mainHeaderReducer from './mainHeaderReducer';
import mainContentsReducer from "./mainContentsReducer"

const reducers = combineReducers({
	mainHeaderReducer,
	mainContentsReducer,
	//, reducer2
});

export default reducers;
