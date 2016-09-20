import { validate } from "predicado";
import { has, where, complement, isEmpty, flip, contains, pluck } from "ramda";

const addTodo = (state, action) =>
  validate(action, [{
    error: "Todo must have a text description.",
    predicate: has("text")
  }, {
    error: "Todo text must not be empty.",
    predicate: where({ text: complement(isEmpty) })
  }, {
    error: "Todo text must be unique.",
    predicate: where({ text: flip(complement(contains))(pluck("text", state.todos)) })
  }]);

export default addTodo;
