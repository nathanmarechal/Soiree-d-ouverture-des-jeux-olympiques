const pool = require("../database/db");

exports.checkStandExists = async (req, res, next) => {
    const id = req.body.id_stand;
    if (id == null){
        next();
    }
    try {
        const conn = await pool.connect();

        const checkResult = await conn.query("SELECT * FROM stand WHERE id_stand = $1", [id]);
        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(404).send("Stand non trouvé");
        }
        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}