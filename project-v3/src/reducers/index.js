import {combineReducers} from "redux";
import mainHeaderReducer from "./mainHeaderReducer";
import mainContentsReducer from "./mainContentsReducer";
import mainBannerReducer from "./mainBannerReducer";
import listContentsReducer from "./listContentsReducer";

const reducers = combineReducers({
	mainHeaderReducer,
	mainContentsReducer,
	mainBannerReducer,
	listContentsReducer
	//, reducer2
});

export default reducers;
