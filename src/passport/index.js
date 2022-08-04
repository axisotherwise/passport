import passport from "passport";

import LocalStrategy from "./LocalStrategy.js";
import JwtStrategy from "./JwtStrategy.js";

export default () => {
  passport.use("local", LocalStrategy);
  passport.use("jwt", JwtStrategy);
};
