import { addTodo, toggleTodo } from "../lib/action.handlers";
import { expect } from "chai";
import { always } from "ramda";

describe("actionHandlers{}", () => {
  const state = {
    todos: [
      {
        id: "8c046a2d-b057-4f97-ba50-d7cacd04637e",
        text: "wash dishes",
        completed: true,
        timestamp: "2016-09-08T01:47:00.490+0000"
      },
      {
        id: "b3eccb22-ea89-46d1-bf5c-25c24cf3f85e",
        text: "walk the dog",
        completed: false,
        timestamp: "2016-09-08T01:48:00.490+0000"
      }
    ]
  };

  describe("addTodo()", () => {
    const uuidGen = always("c5cdc877-19da-48eb-99f3-983cde01379f");
    const clock = always("2016-09-08T01:49:00.490+0000");

    it("adds a new todo to the todo list", () => {
      const action = { type: "addTodo", todo: { text: "take trash out" } };
      const newState = addTodo(state, action, uuidGen, clock);

      expect(newState).deep.eq({
        todos: [
          {
            id: "8c046a2d-b057-4f97-ba50-d7cacd04637e",
            text: "wash dishes",
            completed: true,
            timestamp: "2016-09-08T01:47:00.490+0000"
          },
          {
            id: "b3eccb22-ea89-46d1-bf5c-25c24cf3f85e",
            text: "walk the dog",
            completed: false,
            timestamp: "2016-09-08T01:48:00.490+0000"
          },
          {
            id: "c5cdc877-19da-48eb-99f3-983cde01379f",
            text: "take trash out",
            completed: false,
            timestamp: "2016-09-08T01:49:00.490+0000"
          }
        ]
      });
    });
  });

  describe("toggleTodo()", () => {
    it("marks an uncompleted todo as completed", () => {
      const action = { type: "toggleTodo", todo: { id: "b3eccb22-ea89-46d1-bf5c-25c24cf3f85e" } };
      const newState = toggleTodo(state, action);

      expect(newState).deep.eq({
        todos: [
          {
            id: "8c046a2d-b057-4f97-ba50-d7cacd04637e",
            text: "wash dishes",
            completed: true,
            timestamp: "2016-09-08T01:47:00.490+0000"
          },
          {
            id: "b3eccb22-ea89-46d1-bf5c-25c24cf3f85e",
            text: "walk the dog",
            completed: true,
            timestamp: "2016-09-08T01:48:00.490+0000"
          }
        ]
      });
    });

    it("marks a completed todo back to uncompleted", () => {
      const action = { type: "toggleTodo", todo: { id: "8c046a2d-b057-4f97-ba50-d7cacd04637e" } };
      const newState = toggleTodo(state, action);

      expect(newState).deep.eq({
        todos: [
          {
            id: "8c046a2d-b057-4f97-ba50-d7cacd04637e",
            text: "wash dishes",
            completed: false,
            timestamp: "2016-09-08T01:47:00.490+0000"
          },
          {
            id: "b3eccb22-ea89-46d1-bf5c-25c24cf3f85e",
            text: "walk the dog",
            completed: false,
            timestamp: "2016-09-08T01:48:00.490+0000"
          }
        ]
      });
    });

    it("does nothing when the todo cannot be found", () => {
      const action = { type: "toggleTodo", todo: { id: "666" } };
      const newState = toggleTodo(state, action);

      expect(newState).deep.eq({
        todos: [
          {
            id: "8c046a2d-b057-4f97-ba50-d7cacd04637e",
            text: "wash dishes",
            completed: true,
            timestamp: "2016-09-08T01:47:00.490+0000"
          },
          {
            id: "b3eccb22-ea89-46d1-bf5c-25c24cf3f85e",
            text: "walk the dog",
            completed: false,
            timestamp: "2016-09-08T01:48:00.490+0000"
          }
        ]
      });
    });
  });

});
