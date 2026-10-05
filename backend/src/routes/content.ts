import {Router} from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { addContent, getContent, deleteContent } from "../controllers/contentController.js";
const router = Router();

router.post("/", authMiddleware, addContent)
router.get("/", authMiddleware, getContent)
router.delete("/", authMiddleware, deleteContent)

export default router;