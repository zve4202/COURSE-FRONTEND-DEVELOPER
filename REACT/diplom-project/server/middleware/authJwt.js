const jwt = require("jsonwebtoken");
const config = require("../config/config.json");

verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  //   const token = authHeader.split(" ")[1];
  console.log(token);

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded._id;
    next();
  });
};

const authJwt = {
  verifyToken,
};
module.exports = authJwt;
