import { evolve, map, when, propEq, not } from "ramda";

const toggleTodo = (state, action) =>
  evolve({
    todos: map(when(
      propEq("id", action.id),
      evolve({ completed: not })
    ))
  }, state)

export default toggleTodo;

