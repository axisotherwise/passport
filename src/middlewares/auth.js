const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("로그인 성공");
    console.log(req.user);
    next();
  } else {
    console.log("로그인 실패");
    res.json("로그인 실패");
  }
};

const isNotAuthenticated = (req, res, next) => {

};

export {
  isAuthenticated,
  isNotAuthenticated,
};