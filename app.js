import express from "express";
import "dotenv/config";
import path from "path";
import pool from "./db/pool.js";

import session from "express-session";
import passport from "passport";
import "./config/passport.js"; // need to import passport config so app.js knows abt it
import pgSimple from "connect-pg-simple";
const pgSession = pgSimple(session);

import authRouter from "./routes/authRouter.js"

// ### general setup
const app = express();
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ### session setup
const sessionStore = new pgSession({ pool });

app.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  }),
);

// ### passport authentication
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(authRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log("app listening on port", PORT);
});
