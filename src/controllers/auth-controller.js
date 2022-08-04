import dotenv from "dotenv";
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";

import * as authService from "../services/auth-service.js";
import * as t from "../services/transaction-service.js";

import * as handler from "../middlewares/handler.js";

dotenv.config();

const createAuth = async (req, res, next) => {
  const { email, password, gender, address } = req.body;
  if (!email || !password || !gender || !address) {
    return res.status(418).json(handler.responseHandler(
      false,
      "Request body is not found",
    ));
  }
  try {
    const exist = await authService.readUser(email);
    if (exist.length >= 1) {
      return res.status(418).json(handler.responseHandler(
        false,
        "Has been already user",
      ));
    }
    const hash = await bcrypt.hash(password, 12);
    await t.transaction();
    const user = await authService.createAuth(email, hash, gender);
    const userId = user.insertId;
    const detail = await authService.createAuthDetail(address, userId);
    await t.commit();
    return res.status(201).json(handler.responseHandler(
      true,
      "User create success",
    ));
  } catch (err) {
    t.rollback();
    console.error(err);
    return next(err);
  }
};

const loginAuth = async (req, res, next) => {
  try {
    passport.authenticate("local", (err, user, message) => {
      if (err || !user) return res.status(418).json(handler.responseHandler(false, message));
      req.login(user, { session: false }, (loginError) => {
        if (loginError) return res.status(418).json(handler.responseHandler(false, loginError));
        const token = jwt.sign(
          { email: user.email },
          process.env.TOKEN,
          {
            expiresIn: "10m",
            issuer: "axisotherwise",
          },
        );
        console.log(token);
        return res.status(201).json(handler.responseHandler(
          true,
          "Login success",
          token,
        ));
      });
    })(req, res, next);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export {
  createAuth,
  loginAuth,
};