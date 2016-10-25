import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer as defaultReducer } from "./reducer";

export const createTodoStore = (reducer = defaultReducer) =>
  createStore(reducer, { todos: [] }, applyMiddleware(thunk));

