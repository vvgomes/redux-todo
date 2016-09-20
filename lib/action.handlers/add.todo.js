import { evolve, append } from "ramda";
import uuid from "uuid";
import utcClock from "../util/utc.clock";

const addTodo = (state, action, uuidGen = uuid.v4, clock = utcClock) =>
  evolve({
    todos: append({
      id: uuidGen(),
      text: action.text,
      completed: false,
      timestamp: clock()
    })
  }, state);

export default addTodo;

