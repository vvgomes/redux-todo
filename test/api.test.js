import { createApi } from "../lib/api";
import { createTodoStore } from "../lib/store";
import express from "express";
import request from "supertest";
import sinon from "sinon";
import { last } from "ramda";

describe("api", () => {
  let api;
  let store;
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

    api = createApi(store);
  });

  describe("GET /state", () => {
    it("responds with the current state", (done) => {
      request(express().use(api))
        .get("/state")
        .set("Accept", "apilication/json")
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
      request(express().use(api))
        .post("/actions")
        .send({ type: "toggleTodo", id: lastTodo.id })
        .set("Accept", "apilication/json")
        .expect("Content-Type", /json/)
        .expect(202, {
          type: "toggleTodo",
          id: lastTodo.id
        }, done);
    });

    it("responds with bad request when action is not accepted", (done) => {
      request(express().use(api))
        .post("/actions")
        .send({ type: "toggleTodo", id: "gibberish" })
        .set("Accept", "apilication/json")
        .expect("Content-Type", /json/)
        .expect(400, [ "Todo not found." ], done);
    });
  });
});


