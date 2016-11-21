import express from "express";
import bodyParser from "body-parser";
import { createTodoStore } from "./store";
import { validator } from "./validator";

export const createApi = (store = createTodoStore()) =>
  express.Router()
    .use(bodyParser.json())

    .get("/state", (req, res) => {
      res.status(200).json(store.getState())
    })

    .post("/actions", (req, res) => {
      const action = req.body;
      const onSuccess = action => res.status(202).json({ action });
      const onFailure = errors => res.status(400).json({ errors });
      store.dispatch(validator(action)).fold(onFailure, onSuccess);
    });

