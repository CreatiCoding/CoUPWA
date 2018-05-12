import {combineReducers} from "redux";
import mainHeaderReducer from "./mainHeaderReducer";
import mainContentsReducer from "./mainContentsReducer";
import mainBannerReducer from "./mainBannerReducer";

const reducers = combineReducers({
	mainHeaderReducer,
	mainContentsReducer,
	mainBannerReducer
	//, reducer2
});

export default reducers;
