import addTodo from "../../lib/action.handlers/add.todo";
import assert from "assert";
import { always } from "ramda";

describe("addTodo() action", () => {
  const uuidGen = always("c5cdc877-19da-48eb-99f3-983cde01379f");
  const clock = always("2016-09-08T01:47:00.490+0000");

  it("adds a new todo to the todo list", () => {
    const state = { todos: [] };

    const action = {
      type: "addTodo",
      text: "wash dishes"
    };

    assert.deepEqual(
      addTodo(state, action, uuidGen, clock),
      {
        todos: [
          {
            id: "c5cdc877-19da-48eb-99f3-983cde01379f",
            text: "wash dishes",
            completed: false,
            timestamp: "2016-09-08T01:47:00.490+0000"
          }
        ]
      }
    );
  });
});

