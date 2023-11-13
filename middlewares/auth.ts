import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      loggedUser?: { username: string; role: number }; 
    }
  }
}

export function auth(req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    try {
      req.loggedUser = decodeToken(token);
      next();
    } catch {
      res.status(403).json({ message: "Invalid Auth" });
    }
  } else {
    res.status(403).json({ message: "Invalid Auth" });
  }
}

export function authorizeAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.loggedUser && req.loggedUser.role === 1) {
    next();
  } else {
    res.status(403).json({ message: "Forbidden access" });
  }
}