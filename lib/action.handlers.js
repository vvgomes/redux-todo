import { path, evolve, append, map, when, propEq, not } from "ramda";
import uuid from "uuid";
import utcClock from "./util/utc.clock";

export const addTodo = (state, action, uuidGen = uuid.v4, clock = utcClock) =>
  evolve({
    todos: append({
      id: uuidGen(),
      text: path(["todo", "text"], action),
      completed: false,
      timestamp: clock()
    })
  })(state);

export const toggleTodo = (state, action) =>
  evolve({
    todos: map(when(
      propEq("id", path(["todo", "id"], action)),
      evolve({ completed: not })
    ))
  })(state);
