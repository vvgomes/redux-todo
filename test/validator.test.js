import { validator } from "../lib/validator";
import { expect } from "chai";
import { stub, spy } from "sinon";
import { always } from "ramda";
import Validation from "data.validation";

const Success = Validation.Success;
const Failure = Validation.Failure;

describe("validator()", () => {
  const addTodoAction = { type: "addTodo" };
  const toggleTodoAction = { type: "toggleTodo" };

  const actionValidators = {
    addTodo: stub().withArgs({}, addTodoAction).returns(Success(addTodoAction)),
    toggleTodo: stub().withArgs({}, toggleTodoAction).returns(Failure([ "Error" ]))
  };

  const getState = always({});
  let dispatch;

  beforeEach(() => {
    dispatch = spy();
  })

  it("dispatches successful result", () => {
    validator(addTodoAction, actionValidators)(dispatch, getState);
    expect(dispatch.calledWith(addTodoAction)).ok;
  });

  it("does not dispatch result when validation fails", () => {
    validator(toggleTodoAction, actionValidators)(dispatch, getState);
    expect(dispatch.called).not.ok;
  });

  it("dispatches default result when validator is not found", () => {
    const actionWithNoValidator = { type: "someAction" };
    validator(actionWithNoValidator, dispatch, getState);
    validator(actionWithNoValidator, actionValidators)(dispatch, getState);
    expect(dispatch.calledWith(actionWithNoValidator)).ok;
  });
});

