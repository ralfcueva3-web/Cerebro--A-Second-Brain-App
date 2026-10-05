import {Router} from "express";
import { signin, signup } from "../controllers/authController.js";
const router = Router();


// ===========signup==========

router.post("/signup", signup);


// ===========signin===========

router.post("/signin", signin)

export default router;