const pool = require("../database/db");

exports.checkAvisExists = async (req, res, next) => {
    const id = req.query.id_avis;

    if (!id) {
        return res.status(400).send("ID avis requis.");
    }

    try {
        const conn = await pool.connect();
        const checkResult = await conn.query("SELECT * FROM avis_stand_utilisateur WHERE id_avis_stand_utilisateur = $1", [id]);
        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(404).send("Avis non trouvée");
        }
        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};