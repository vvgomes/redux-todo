import { createServer } from "../lib/server";
import { createTodoStore } from "../lib/todos";
import request from "supertest";
import sinon from "sinon";
import { last } from "ramda";

describe("Todo server", () => {
  let store;
  let app;
  let lastTodo;

  beforeEach(() => {
    store = createTodoStore();

    store.subscribe(() => {
      lastTodo = last(store.getState().todos);
    });

    store.dispatch({ 
      type: "addTodo",
      text: "wash dishes"
    });

    app = createServer(store);
  });

  describe("GET /state", () => {
    it("responds with the current state", (done) => {
      request(app)
        .get("/state")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, {
          todos: [{
            id: lastTodo.id,
            text: "wash dishes",
            completed: false,
            timestamp: lastTodo.timestamp
          }]
        }, done);
    });
  });

  describe("POST /actions", () => {
    it("responds with the successful action", (done) => {
      request(app)
        .post("/actions")
        .send({ type: "toggleTodo", id: lastTodo.id })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(202, {
          type: "toggleTodo",
          id: lastTodo.id
        }, done);
    });

    it("responds with bad request when action is not accepted", (done) => {
      request(app)
        .post("/actions")
        .send({ type: "toggleTodo", id: "gibberish" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400, [ "Todo not found." ], done);
    });
  });
});


