import * as db from "../db/queries.js"

export function showHomePage(req, res) {
    res.render("index")
}

export async function createMessage(req, res) {
    await db.createMessage(req.body)
    res.redirect("/")
}