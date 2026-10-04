import {Router} from "express";
const router = Router();

router.post("/", (req, res) => {
    res.send("ok content post")
})
router.get("/", (req, res) => {
    res.send("ok content get")
})
router.delete("/", (req, res) => {
    res.send("ok content delete")
})

export default router;