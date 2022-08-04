import passport from "passport";

const verifyToken = (req, res, next) => {
  passport.authenticate("jwt", { session: false })(req, res, next);
};

const isAuthenticated = (req, res, next) => { // 로그인 상태
  if (req.isAuthenticated()) return next();
  else return res.status(418).json("비로그인 상태");
};

const isNotAuthenticated = (req, res, next) => { // 비로그인 상태
  if (req.isAuthenticated()) return res.status(418).json("로그인 상태");
  else return next();
};

export {
  verifyToken,
  isAuthenticated,
  isNotAuthenticated,
};