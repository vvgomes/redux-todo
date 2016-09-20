import assert from "assert";
import toggleTodo from "../../lib/action.validators/toggle.todo";
import Validation from "data.validation";

const Success = Validation.Success;
const Failure = Validation.Failure;

describe("toggleTodo() validation", () => {

  it("results in success when there are no violations", () => {
    const state = {
      todos: [
        {
          id: "666",
          text: "wash dishes",
          completed: false,
          timestamp: "2016-09-08T01:47:00.490+0000"
        },
        {
          id: "667",
          text: "walk the dog",
          completed: false,
          timestamp: "2016-09-08T01:48:00.490+0000"
        }
      ]
    };

    const action = {
      type: "toggleTodo",
      id: "666"
    };

    assert.deepEqual(
      toggleTodo(state, action),
      Success({
        type: "toggleTodo",
        id: "666"
      })
    );
  });

  it("fails when todo is cannot be found", () => {
    const state = {
      todos: [
        {
          id: "667",
          text: "walk the dog",
          completed: false,
          timestamp: "2016-09-08T01:48:00.490+0000"
        }
      ]
    };

    const action = {
      type: "toggleTodo",
      id: "666"
    };

    assert.deepEqual(
      toggleTodo(state, action),
      Failure(["Todo not found."])
    );
  });
});

