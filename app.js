import express from "express";
import "dotenv/config";
import path from "path";
import pool from "db/pool.js";

import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local/Strategy";
import pgSimple from "connect-pg-simple";
const pgSession = pgSimple(session);

const app = express();
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    store: new pgSession({
      pool,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  }),
);
app.use(passport.session());

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("app listening on port 3000!");
});
