import assert from "assert";
import addTodo from "../../lib/action.validators/add.todo";
import Validation from "data.validation";

const Success = Validation.Success;
const Failure = Validation.Failure;

describe("addTodo() validation", () => {

  it("results in success when there are no violations", () => {
    const state = { todos: [] };
    const action = {
      type: "addTodo",
      text: "wash dishes"
    };

    assert.deepEqual(
      addTodo(state, action),
      Success({
        type: "addTodo",
        text: "wash dishes"
      })
    );
  });

  it("fails when the todo does not have a text description", () => {
    const state = { todos: [] };
    const action = { type: "addTodo" };

    assert.deepEqual(
      addTodo(state, action),
      Failure(["Todo must have a text description."])
    );
  });

  it("fails when the todo text is empty", () => {
    const state = { todos: [] };
    const action = {
      type: "addTodo",
      text: ""
    };

    assert.deepEqual(
      addTodo(state, action),
      Failure(["Todo text must not be empty."])
    );
  });

  it("fails when the todo is duplicated", () => {
    const state = {
      todos: [
        {
          id: "666",
          text: "wash dishes",
          completed: false,
          timestamp: "today"
        }
      ]
    };

    const action = {
      type: "addTodo",
      text: "wash dishes"
    };

    assert.deepEqual(
      addTodo(state, action),
      Failure(["Todo text must be unique."])
    );
  });
});

