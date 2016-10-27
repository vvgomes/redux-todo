import { validate } from "predicado";
import { pipe, prop, where, flip, contains, pluck, has, complement, isEmpty } from "ramda";

export const addTodo = (state, action) =>
  validate(action, [
    {
      error: "Todo must have a text description.",
      predicate: pipe(prop("todo"), has("text"))
    },
    {
      error: "Todo text must not be empty.",
      predicate: pipe(prop("todo"), where({ text: complement(isEmpty) }))
    },
    {
      error: "Todo text must be unique.",
      predicate: pipe(
        prop("todo"),
        where({
          text: flip(complement(contains))(pluck("text", state.todos))
        })
      )
    }
  ]);

export const toggleTodo = (state, action) =>
  validate(action, [
    {
      error: "Todo not found.",
      predicate: pipe(prop("todo"), where({ id: flip(contains)(pluck("id", state.todos)) }))
    }
  ]);
