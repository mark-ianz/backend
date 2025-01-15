import { Router } from "express";
import { createUser, getAccountInfo } from "../controllers/user";

const router = Router();

router.get ("/:username", getAccountInfo)
router.post("/", createUser);

export default router;
