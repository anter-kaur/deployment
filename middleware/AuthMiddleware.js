const jwt = require("jsonwebtoken");

const AuthMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log("token in middleware->>", token);
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    console.log("decoded token->>", decodedToken);
    // if(!decodedToken){
    //     return res.status(400).json({msg:'Token invalid'})
    // }
    // console.log(decodedToken);
    req.user = decodedToken;
    // res.status(200).json({ msg: "Token verified" });
    next(); 
  } catch (error) {
    res.status(400).json("Token invalid");
  }
};

module.exports = AuthMiddleware;
