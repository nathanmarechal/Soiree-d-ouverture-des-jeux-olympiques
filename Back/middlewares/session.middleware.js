const pool = require("../database/db");

exports.checkSessionExists = async (req, res, next) => {
    const id = req.query.session_id;

    if (!id) {
        return res.status(400).send("ID session requis.");
    }

    try {
        const conn = await pool.connect();
        const checkResult = await conn.query("SELECT * FROM session WHERE session_id = $1", [id]);
        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(404).send("Session non trouvée");
        }
        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};