import * as db from "../db/queries.js";

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(date));
}

export async function showHomePage(req, res) {
  const messages = await db.getAllMessages();

  const newMessages = messages.map((m) => ({
    ...m,
    created_at: formatDate(m.created_at),
  }));

  res.render("index", { messages: newMessages });
}

export async function createMessage(req, res, next) {
  try {
    await db.createMessage({ ...req.body, author_id: req.user.user_id });
    res.redirect("/");
  } catch (error) {
    next(err);
  }
}
