import dotenv from "dotenv";
import bcrypt from "bcrypt";
import passport from "passport";
import passportLocal from "passport-local";

import * as authService from "../services/auth-service.js";

dotenv.config();

const LocalStrategy = passportLocal.Strategy;

const LocalConfig = {
  usernameField: "email",
  passwordField: "password",
};

const LocalVerify = async (email, password, done) => {
  try {
    const [ user ] = await authService.readUser(email);
    if (!user) return done(null, false, { message: "존재하지 않는 사용자입니다." });
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) return done(null, false, { message: "비밀번호 불일치" });
    return done(null, user);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

export default new LocalStrategy(LocalConfig, LocalVerify);