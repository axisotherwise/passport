import express from "express";
import morgan from "morgan";

import authRoutes from "./routes/auth-route.js";

import * as handler from "./middlewares/error-handler.js";

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.router();
    this.errorMiddleware();
  }

  middleware() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  router() {
    this.app.use("/auth", authRoutes);
  }
  errorMiddleware() {
    this.app.use(handler.error404Handler);
    this.app.use(handler.errorHandler);
  }
}

export default new App().app;
