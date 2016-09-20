import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import defineReducer from "./reducer";
import defineValidator from "./validator";

export const createTodoStore = (
  reducer = defineReducer(),
  initialState = { todos: [] },
  middleware = applyMiddleware(thunk)
) => createStore(reducer, initialState, middleware);

export const validate = defineValidator(); 


