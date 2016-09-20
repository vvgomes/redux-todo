import { validate } from "predicado";
import { where, flip, contains, pluck } from "ramda";

const toggleTodo = (state, action) =>
  validate(action, [{
    error: "Todo not found.",
    predicate: where({ id: flip(contains)(pluck("id", state.todos)) })
  }]);

export default toggleTodo;
