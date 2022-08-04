const responseHandler = (success, message, result) => {
  return {
    success,
    message,
    result,
  };
};

export {
  responseHandler,
};