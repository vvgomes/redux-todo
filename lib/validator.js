import Maybe from "data.maybe";
import Validation from "data.validation";
import { curry } from "ramda";
import addTodo from "./action.validators/add.todo";
import toggleTodo from "./action.validators/toggle.todo";

const defineValidator = (actionValidators = { addTodo, toggleTodo }) =>
  curry((action, dispatch, getState) =>
    Maybe
      .fromNullable(actionValidators[action.type])
      .map(validator => validator(getState(), action))
      .getOrElse(Validation.Success(action))
      .map(dispatch));

export default defineValidator;

