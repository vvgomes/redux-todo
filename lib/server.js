import express from "express";
import bodyParser from "body-parser";
import proxy from "proxy-middleware";
import url from "url";
import { createTodoStore, validate } from "./todos";

export const createServer = (store = createTodoStore()) => {
  const app = express();

  app.use(bodyParser.json());
  app.use("/web", proxy(url.parse("http://localhost:8080")));

  app.get("/", (req, res) => {
    res.redirect("/web/");
  });

  app.get("/state", (req, res) => {
    res.status(200).json(store.getState());
  });

  app.post("/actions", (req, res) => {
    const action = req.body;

    const onSuccess = (action) => res.status(202).json(action);
    const onFailure = (errors) => res.status(400).json(errors);

    store.dispatch(validate(action)).fold(onFailure, onSuccess);
  });

  return app;
}

