import {Router} from "express"
import * as controller from "../controllers/messageController.js"

const router = Router()

router.get("/", controller.showHomePage)

router.post("/createMessage", controller.createMessage)

export default router;