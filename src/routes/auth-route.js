import express from "express";

import * as authController from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/create", authController.createAuth);

export default router;