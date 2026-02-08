import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = "test"; // In production, use process.env.JWT_SECRET

interface AuthRequest extends Request {
  userId?: string;
}

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      const decodedData = jwt.verify(token, secret) as { id: string };
      req.userId = decodedData?.id;
    } else {
        return res.status(401).json({ message: "Unauthenticated" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthenticated" });
  }
};

export default auth;
