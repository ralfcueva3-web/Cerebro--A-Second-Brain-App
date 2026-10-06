import {
    type Request,
    type Response,
    type NextFunction
} from "express";

import jwt, {
    type JwtPayload
} from "jsonwebtoken";


declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}


export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {

    const header = req.headers.authorization;

    // No Authorization header
    if (!header) {
        res.status(401).json({
            msg: "Token missing"
        });

        return;
    }


    // Extract token
    const token = header.startsWith("Bearer ")
        ? header.slice(7)
        : header;


    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;


        // JWT contains userId
        req.userId = decoded.userId;


        console.log("Authenticated user:", req.userId);


        next();

    } catch (err) {

        console.log("JWT ERROR:", err);

        res.status(403).json({
            msg: "Invalid or expired token"
        });
    }
};