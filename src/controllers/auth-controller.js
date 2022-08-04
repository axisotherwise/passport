import bcrypt from "bcrypt";

import * as authService from "../services/auth-service.js";
import * as t from "../services/transaction-service.js";

import * as handler from "../middlewares/handler.js";

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

export {
  createAuth,
};