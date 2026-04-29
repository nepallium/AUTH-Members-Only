import * as db from "../db/queries.js";
import { body, validationResult, matchedData } from "express-validator";

export function showJoinPage(req, res, next) {
  // too lazy to add another partial ejs for this, so just store in errors
  const errors = req.flash("success").map((msg) => ({ msg }));
  res.render("member-join", { errors });
}

export const postMemberStatus = [
  body("code").equals(process.env.MEMBER_SECRET).withMessage("Wrong code!"),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(401)
          .render("member-join", { errors: errors.array() });
      }

      req.flash("success", "Correct! Welcome to the club");
      db.changeMemberStatusPositive(req.user.user_id);
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  },
];
