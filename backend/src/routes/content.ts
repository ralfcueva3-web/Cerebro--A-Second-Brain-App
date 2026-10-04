import {Router} from "express";
import { authMiddleware } from "../middlewares/auth.js";
const router = Router();

router.post("/", (req, res) => {
    res.send("ok content post")
})
router.get("/", authMiddleware, (req, res) => {
    res.send("ok content get")
})
router.delete("/", (req, res) => {
    res.send("ok content delete")
})

export default router;