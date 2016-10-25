import * as actionValidators from "./action.validators";
import Maybe from "data.maybe";
import Validation from "data.validation";

export const validator =
  (action, validators = actionValidators) =>
    (dispatch, getState) =>
      Maybe
      .fromNullable(validators[action.type])
      .map(validator => validator(getState(), action))
      .getOrElse(Validation.Success(action))
      .map(dispatch);
