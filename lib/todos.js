import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { defineReducer } from "redux-definer";
import { defineValidator } from "./validator";
import * as actionHandlers from "./action.handlers";
import * as actionValidators from "./action.validators";

export const createTodoStore = (
  reducer = defineReducer(actionHandlers),
  initialState = { todos: [] },
  middleware = applyMiddleware(thunk)
) => createStore(reducer, initialState, middleware);

export const validate = defineValidator(actionValidators); 


