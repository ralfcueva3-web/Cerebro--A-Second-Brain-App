import { type Request, type Response, type NextFunction } from "express";
import jwt, {type JwtPayload} from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            userId?: String
        }
    }
}
export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const header = req.headers.authorization;

    if(!header){
        res.status(401).json({msg: "Token missing"});
        return;
    }
    const token = header.startsWith("Bearer ") ? header.slice(7) : header;

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECTER as string) as JwtPayload;
        req.userId = decoded.id;
        next();
    } catch (err){
        res.status(403).json({msg: "Invalid or expired token"})
    }
}