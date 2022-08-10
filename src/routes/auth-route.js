import express from "express";
import { check } from "express-validator";

import * as authValidator from "../validator/auth-validator.js";

import * as authController from "../controllers/auth-controller.js";

import * as verify from "../middlewares/verify.js";

const router = express.Router();

router.post("/create",
  [
    authValidator.createAuthValidator,
    authValidator.createAuthValidatorPassword,
  ],
  authValidator.createAuthResult,
  verify.isNotAuthenticated,
  authController.createAuth
);
router.post("/login", verify.isNotAuthenticated, authController.loginAuth);

export default router;