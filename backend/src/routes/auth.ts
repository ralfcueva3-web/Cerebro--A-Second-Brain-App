import {Router} from "express";
import { signup } from "../controllers/authController.js";
const router = Router();


// ===========signup==========

router.post("/signup", signup);


// ===========signin===========

router.post("/signin", (req, res) => {
    res.send("signin ok");
} )

export default router;