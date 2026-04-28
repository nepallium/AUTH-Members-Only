import bcrypt from "bcrypt";
import crypto from "node:crypto";
import pool from "../db/pool.js"

// TODO validate user form

export async function createUser(req, res, next) {
  try {
    const formData = req.body;
    const hashedPw = await bcrypt.hash(formData.password, 10);
    console.log(hashedPw)
    await pool.query(
      `
      INSERT INTO users (email, password, first_name, last_name)
      VALUES ($1, $2, $3, $4)
      `,
      [formData.email, hashedPw, formData.first_name, formData.last_name],
    );
    res.redirect("/")
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
