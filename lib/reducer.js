import Maybe from "data.maybe";
import addTodo from "./action.handlers/add.todo";
import toggleTodo from "./action.handlers/toggle.todo";

const defineReducer = (actionHandlers = { addTodo, toggleTodo }) =>
  (state, action) => 
    Maybe
      .fromNullable(actionHandlers[action.type])
      .map(handler => handler(state, action))
      .getOrElse(state);

export default defineReducer;



