import {Router} from "express";
import { getSharedBrain, shareBrain } from "../controllers/brainController.js";
const router = Router();

router.post("/share", shareBrain)
})
router.get("/:shareLink", getSharedBrain)

export default router;