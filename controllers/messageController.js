import * as db from "../db/queries.js"

export async function showHomePage(req, res) {
    const messages = await db.getAllMessages()

    res.render("index", {messages})
}

export async function createMessage(req, res) {
    await db.createMessage(req.body)
    
}