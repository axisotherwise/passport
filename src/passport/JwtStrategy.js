import dotenv from "dotenv";
import jwt from "passport-jwt";

import * as authService from "../services/auth-service.js";

dotenv.config();

const jwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const JwtConfig = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.TOKEN,
};


const JwtVerify = async (jwtPayload, done) => {
  try {
    const [ user ] = await authService.readUser(jwtPayload.email);
    if (!user) return done(null, false, { message: "존재하지않는 유저입니다. "});
    done(null, user.email);
  } catch (err) {
    console.error(err);
    done(err);
  }
};

export default new jwtStrategy(JwtConfig, JwtVerify);