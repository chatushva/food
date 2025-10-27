
// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");
//     if (!token) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = { userId: decoded.id }; // make sure token has `id`
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// export default authMiddleware;
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.replace("Bearer ", "").trim();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // req.user = { userId: decoded.userId };
    req.user = { userId: decoded.userId || decoded.id }; // accommodate both `userId` and `id`


    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") return res.status(401).json({ message: "jwt expired" });
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;


