import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkMiddleware} from "redux-thunk";
import {reducer} from "../redux/reducer";

let rootReducer = combineReducers({
    rootTable: reducer
});
export type AppState = ReturnType<typeof rootReducer>;

let store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<AppState, any>));

export default store;
