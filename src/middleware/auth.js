import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  token = token.split(" ")[1];

  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

  if (!decodedToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  console.log("ReqUser", decodedToken);

  req.user = decodedToken;    

  next();
};

export default auth;
