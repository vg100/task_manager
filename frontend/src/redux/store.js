import { applyMiddleware, combineReducers, createStore } from "redux";

import { thunk } from "redux-thunk";
import { AuthReducer } from "./reducers/authReducer";
import { TaskReducer } from "./reducers/taskReducer";


const appReducer = combineReducers({
  auth: new AuthReducer().reducer,
  task: new TaskReducer().reducer
})


const middlewares = [thunk];

export default createStore(appReducer, applyMiddleware(...middlewares))