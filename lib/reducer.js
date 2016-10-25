import * as actionHandlers from "./action.handlers";
import Maybe from "data.maybe";

export const reducer =
  (state, action, handlers = actionHandlers) => 
    Maybe
      .fromNullable(handlers[action.type])
      .map(handler => handler(state, action))
      .getOrElse(state);

