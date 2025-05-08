import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "No token provided" });
    return;
  }
  try {
    const decodedData = jwt.verify(
      authHeader,
      process.env.JWT_SECRET || "DEFAULT_SECRET"
    );
    req.userId = (decodedData as JwtPayload).userId;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
