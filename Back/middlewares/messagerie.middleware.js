const pool = require("../database/db");
const userService = require("../services/users.service");

exports.checkConversationExists = async (req, res, next) => {
    const id = req.query.id_conversation || req.body.id_conversation;

    if (!id) {
        return res.status(400).send("ID conversation requis.");
    }

    try {
        const conn = await pool.connect();
        const checkResult = await conn.query("SELECT * FROM conversations WHERE id_conversation = $1", [id]);
        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(404).send("Conversation non trouvée");
        }
        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

exports.checkConversationBelongsToCurrentUserExists = async (req, res, next) => {
    const id_conversation = req.query.id_conversation;
    const session_id = req.headers['session_id'];

    const user = await userService.getUserBySessionIdAsync(session_id)

    if (!id_conversation) {
        return res.status(400).send("ID conversation requis.");
    }

    try {
        const conn = await pool.connect();
        const checkResult = await conn.query("SELECT * FROM conversations WHERE id_conversation = $1 AND id_creator = $2", [id_conversation, user.id_user]);
        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(404).send("Conversation non trouvée");
        }
        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};