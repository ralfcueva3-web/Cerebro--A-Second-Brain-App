import {Router} from "express";
const router = Router();

router.post("/share", (req, res) => {
    res.send("ok share")
})
router.get("/:shareLink", (req, res) => {
    res.send("ok shareLink")
})

export default router;