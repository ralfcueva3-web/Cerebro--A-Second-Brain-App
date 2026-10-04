import {Router} from "express";
const router = Router();


// ===========signup==========

router.post("/signup", (req, res) => {
    res.send("signup ok");
} )


// ===========signin===========

router.post("/signin", (req, res) => {
    res.send("signin ok");
} )

export default router;