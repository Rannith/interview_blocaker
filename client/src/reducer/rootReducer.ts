import { combineReducers } from "redux";
import slotReducer from "./slotReducer";

const rootReducer = combineReducers({
    slotData: slotReducer
});

export default rootReducer;