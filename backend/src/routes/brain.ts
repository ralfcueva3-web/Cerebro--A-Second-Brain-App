import { Router } from "express";

import {
    shareBrain,
    getSharedBrain
} from "../controllers/brainController.js";

import { authMiddleware } from "../middlewares/auth.js";


const router = Router();


router.post(
    "/share",
    authMiddleware,
    shareBrain
);


router.get(
    "/share/:shareLink",
    getSharedBrain
);


export default router;