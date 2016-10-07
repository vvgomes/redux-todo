import Maybe from "data.maybe";
import Validation from "data.validation";
import { curry } from "ramda";

const defineValidator = (actionValidators) =>
  curry((action, dispatch, getState) =>
    Maybe
      .fromNullable(actionValidators[action.type])
      .map(validator => validator(getState(), action))
      .getOrElse(Validation.Success(action))
      .map(dispatch));

export default defineValidator;

