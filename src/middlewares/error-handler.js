import * as handler from "./handler.js";

const error404Handler = async (req, res, next) => {
  const error = new Error("404 error", { cause: `메서드 ${req.method} URL ${req.url} 존재하지 않습니다.`});
  error.status = 404;
  return next(error);
};

const errorHandler = async (err, req, res, next) => {
  res.status(err.status || 500);
  return res.json(handler.responseHandler(
    false,
    err.cause,
    err,
  ));
};

export {
  error404Handler,
  errorHandler,
};