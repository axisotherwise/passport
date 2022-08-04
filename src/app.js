import express from "express";
import morgan from "morgan";

class App {
  constructor() {
    this.app = express();
  }

  middleware() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  errorMiddleware() {
    this.app.use();
  }
}

export default new App().app;
