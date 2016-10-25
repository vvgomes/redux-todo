import { reducer } from "../lib/reducer";
import { expect } from "chai";
import { stub } from "sinon";
import { always } from "ramda";

describe("reducer()", () => {
  const handlers = {
    addTodo: always({
      todos: [{
        id: "1",
        text: "wash dishes",
        completed: false
      }]
    })
  };

  it("calls appropriate handler for action", () => {
    const state = { todos: [] };
    const action = { type: "addTodo" };
    expect(reducer(state, action, handlers)).deep.eq({
      todos: [{
        id: "1",
        text: "wash dishes",
        completed: false
      }]
    });
  });

  it("returns unchanged state when no handler is found", () => {
    const state = { todos: [] };
    const action = { type: "unknown" };
    expect(reducer(state, action, handlers)).deep.eq({ todos: [] });
  });

  it("returns unchanged state when action has no type", () => {
    const state = { todos: [] };
    const action = {};
    expect(reducer(state, action, handlers)).deep.eq({ todos: [] });
  });
});

