import { addTodo, toggleTodo } from "../lib/action.validators";
import { expect } from "chai";
import Validation from "data.validation";

const Success = Validation.Success;
const Failure = Validation.Failure;

describe("actionValidators{}", () => {
  const state = {
    todos: [
      {
        id: "8c046a2d-b057-4f97-ba50-d7cacd04637e",
        text: "wash dishes",
        completed: true,
        timestamp: "2016-09-08T01:47:00.490+0000"
      }
    ]
  };

  describe("addTodo()", () => {
    it("results in success when there are no violations", () => {
      const action = { type: "addTodo", todo: { text: "walk the dog" } };
      const result = addTodo(state, action);

      expect(result).deep.eq(
        Success({
          type: "addTodo",
          todo: { text: "walk the dog" }
        })
      );
    });

    it("fails when the todo does not have a text description", () => {
      const action = { type: "addTodo", todo: {}};
      const result = addTodo(state, action);

      expect(result).deep.eq(
        Failure(["Todo must have a text description."])
      );
    });

    it("fails when the todo text is empty", () => {
      const action = { type: "addTodo", todo: { text: "" } };
      const result = addTodo(state, action);

      expect(result).deep.eq(
        Failure(["Todo text must not be empty."])
      );
    });

    it("fails when the todo is duplicated", () => {
      const action = { type: "addTodo", todo: { text: "wash dishes" } };
      const result = addTodo(state, action);

      expect(result).deep.eq(
        Failure(["Todo text must be unique."])
      );
    });
  });

  describe("toggleTodo()", () => {
    it("results in success when there are no violations", () => {
      const action = { type: "toggleTodo", todo: { id: "8c046a2d-b057-4f97-ba50-d7cacd04637e" } };
      const result = toggleTodo(state, action);

      expect(result).deep.eq(
        Success({
          type: "toggleTodo",
          todo: { id: "8c046a2d-b057-4f97-ba50-d7cacd04637e" }
        })
      );
    });

    it("fails when todo is cannot be found", () => {
      const action = { type: "toggleTodo", todo: { id: "666" } };
      const result = toggleTodo(state, action);

      expect(result).deep.eq(
        Failure(["Todo not found."])
      );
    });
  });
});
