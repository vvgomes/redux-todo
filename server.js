import express from "express";
import proxy from "proxy-middleware";
import url from "url";
import { createApi } from "./lib/api";

const port = 3000;

express()
  .use("/api", createApi())
  .use("/", proxy(url.parse("http://localhost:8080")))
  .listen(port, () => console.log("Server listening at http://localhost:%s", port));

