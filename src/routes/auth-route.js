import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import * as authController from "../controllers/auth-controller.js";

import * as verify from "../middlewares/verify.js";

const router = express.Router();

router.post("/create", verify.isNotAuthenticated, authController.createAuth);
router.post("/login", verify.isNotAuthenticated, authController.loginAuth);

export default router;