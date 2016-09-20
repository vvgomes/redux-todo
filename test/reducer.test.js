import defineReducer from "../lib/reducer";
import assert from "assert";
import { stub } from "sinon";

describe("reducer()", () => {
  const actionHandlers = {
    incrementCounter: stub().returns(1)
  };

  const reducer = defineReducer(actionHandlers);

  it("calls appropriate handler for action", () => {
    const state = 0;
    const action = { type: "incrementCounter" };
    assert.equal(reducer(state, action), 1);
  });

  it("returns unchanged state when no handler is found", () => {
    const state = 0;
    const action = { type: "unknown" };
    assert.equal(reducer(state, action), 0);
  });

  it("returns unchanged state when action has no type", () => {
    const state = 0;
    const action = {};
    assert.equal(reducer(state, action), 0);
  });
});
