import { Router } from "express";
import * as controller from "../controllers/memberController.js";

const router = Router();

router.get("/join", controller.showJoinPage);

router.post("/join", controller.postMemberStatus);

export default router;
