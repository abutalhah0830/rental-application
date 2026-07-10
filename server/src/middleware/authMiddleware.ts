import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
interface DecodedToken extends JwtPayload {
    sub: string;
    "custom:role"?: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: string;
            };
        }
    }
}

export const authMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {

    console.log("Authorization Header:", req.headers.authorization);

    const token = req.headers.authorization?.split(" ")[1];

    console.log("Extracted Token:", token);

    if (!token) {
      console.log("NO TOKEN FOUND");
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      const decoded = jwt.decode(token) as DecodedToken;

      console.log("Decoded Token:", decoded);

      const userRole = decoded["custom:role"] || "";

      console.log("Role:", userRole);

      req.user = {
        id: decoded.sub,
        role: userRole,
      };

      const hasAccess = allowedRoles.includes(userRole.toLowerCase());

      if (!hasAccess) {
        console.log("Access Denied");
        res.status(403).json({ message: "Access denied" });
        return;
      }

      next();
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Invalid token" });
    }
  };
};