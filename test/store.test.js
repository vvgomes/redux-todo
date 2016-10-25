import { createTodoStore } from "../lib/store";
import { expect } from "chai";
import { stub, match } from "sinon";
import Validation from "data.validation";

describe("createTodoStore()", () => {
  const reducer = stub()
    .withArgs(match.any, { type: "addTodo" })
    .returns({
      todos: [{
        id: "1",
        text: "wash dishes",
        completed: false
      }]
    });

  let store;
  beforeEach(() => store = createTodoStore(reducer));

  it("dispatches actions", () => {
    const action = { type: "addTodo" };
    store.dispatch(action);

    expect(store.getState()).deep.eq({
      todos: [{
        id: "1",
        text: "wash dishes",
        completed: false
      }]
    });
  });

  it("dispatches validation results", () => {
    const action = { type: "addTodo" };
    const validator = stub()
      .withArgs(action)
      .returns((dispatch, getState) =>
        Validation.Success(action).map(dispatch));

    store.dispatch(validator(action));
    expect(store.getState()).deep.eq({
      todos: [{
        id: "1",
        text: "wash dishes",
        completed: false
      }]
    });
  });

  it("returns validation results after dispatching", () => {
    const action = { type: "addTodo" };
    const validator = stub()
      .withArgs(action)
      .returns((dispatch, getState) =>
        Validation.Success(action).map(dispatch));

    const result = store.dispatch(validator(action));
    expect(result).deep.eq(Validation.Success(action));
  });
});
