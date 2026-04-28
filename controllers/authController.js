import bcrypt from "bcrypt";
import crypto from "node:crypto";

// TODO validate user form

export async function createUser(req, res, next) {
  try {
    const formData = req.body;
    const salt = crypto.randomBytes(32).toString("hex");
    const hashedPw = bcrypt.hash(formData.password, salt);
    await pool.query(
      `
      INSERT INTO (email, password, first_name, last_name)
      VALUES ($1, $2, $3, $4)
      `,
      [formData.username, hashedPw, formData.first_name, formData.last_name],
    );
  } catch (error) {
    next(error);
  }
}

export async function showSignup(req, res) {
  res.render("signup");
}

export async function showLogin(req, res) {
  res.render("login");
}

export async function logoutUser(req, res) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}
