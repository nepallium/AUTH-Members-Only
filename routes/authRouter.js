import { Router } from "express";
import passport from "passport";
import * as authMiddleware from "./authMiddleware.js";
import * as controller from "../controllers/authController.js";

const router = Router();

// post
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/",
    failureFlash: true,
    successRedirect: "",
  }),
);

router.post("/signup", controller.createUser);
router.post("/logout", controller.logoutUser);

// get
router.get("/signup", controller.showSignup);
router.get("/login", controller.showLogin);

export default router;
