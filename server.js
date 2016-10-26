import express from "express";
import proxy from "proxy-middleware";
import url from "url";
import { createApi } from "./lib/api";

express()
  .use("/api", createApi())
  .use("/", proxy(url.parse("http://localhost:8080")))
  .listen(3000, () => console.log("Server listening at http://localhost:3000"));

