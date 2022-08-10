import { check, body, validationResult } from "express-validator";

const createAuthValidator = (req, res, next) => {
  check("email", "이메일 형식에 맞지 않습니다")
    .isEmail()(req, res, next);
};

const createAuthValidatorPassword = (req, res, next) => {
  body("password", "비밀번호 형식에 맞지 않습니다.")
    .isLength({ min: 5})
    .isAlphanumeric()(req, res, next);
};

const createAuthResult = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.array());
  // console.log(errors.isEmpty());
  return next();
};

export {
  createAuthValidator,
  createAuthResult,
  createAuthValidatorPassword,
};