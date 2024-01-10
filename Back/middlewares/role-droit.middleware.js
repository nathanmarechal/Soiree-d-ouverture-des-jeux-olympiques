const pool = require("../database/db");
exports.checkRoleDroitExists = async (req, res, next) => {
    const id_droit = req.body.id_droit;
    const id_role = req.body.id_role;
    try {
        const conn = await pool.connect();

        const checkResult = await conn.query("SELECT * FROM role_droits WHERE id_droit = $1 AND id_role = $2", [id_droit, id_role]);
        if (checkResult.rows.length > 0) {
            conn.release();
            return res.status(409).send("Association role/droit déjà existante");
        }
        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}