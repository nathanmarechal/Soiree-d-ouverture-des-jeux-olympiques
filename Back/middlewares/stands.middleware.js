const pool = require("../database/db");

exports.checkStandExists = async (req, res, next) => {
    let id;

    if (req.body.id_stand != null){
        id = req.body.id_stand;
    }
    else {
        id = req.params.id;
    }
    /*
    if (id == null){
        next();
    }
     */
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

exports.checkStandAppartenance = async (req, res, next) => {
    const userId = req.params.id;
    const standId = req.body.id_stand;

    if (!standId) {
        return next();
    }

    try {
        const conn = await pool.connect();

        const checkResult1 = await conn.query("SELECT * FROM stand WHERE id_stand = $1", [standId]);
        if (checkResult1.rows.length === 0) {
            conn.release();
            return res.status(404).send("Stand non trouvé");
        }

        const checkResult2 = await conn.query("SELECT * FROM utilisateur WHERE id_stand = $1", [standId]);

        const proprio = checkResult2.rows[0];
        if (proprio.id_user != userId) {
            conn.release();
            return res.status(409).send("Le stand est déjà assigné à un autre utilisateur");
        }

        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};
