import express from "express";
import morgan from "morgan";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/auth-route.js";

import passportConfig from "./passport/index.js";

import * as handler from "./middlewares/error-handler.js";

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.router();
    this.errorMiddleware();
  }

  middleware() {
    if (process.env.NODE_ENV) {
      this.app.use(morgan("dev"));
    } else {
      this.app.use(morgan("combined"));
    }
    // this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(passport.initialize());
    passportConfig();
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
