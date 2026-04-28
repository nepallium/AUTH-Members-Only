import pool from "./pool.js"

export async function createUser(formData) {
    await pool.query(
        `
        INSERT INTO users (email, password, first_name, last_name)
        VALUES ($1, $2, $3, $4)
        `,
        [formData.email, formData.password, formData.first_name, formData.last_name],
      );
}

export async function isEmailTaken(value) {
    const existingUser = pool.query("SELECT * FROM users WHERE email = $1", [value])
    if (existingUser) {
        return false;
    }
}

export async function createMessage(formData) {
    await pool.query(`
        INSERT INTO messages (author_id, title, content)
        VALUES ($1, $2, $3)
        `, [formData.author_id, formData.title, formData.content])
}

export async function getAllMessages() {
    const {rows} = await pool.query("SELECT * FROM messages")
    return rows
}