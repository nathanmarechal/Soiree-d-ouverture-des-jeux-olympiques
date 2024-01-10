const pool = require("../database/db");

exports.checkCommandeExists = async (req, res, next) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send("ID commande requis.");
    }

    try {
        const conn = await pool.connect();
        const checkResult = await conn.query("SELECT * FROM commande WHERE id_commande = $1", [id]);
        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(404).send("Commande non trouvée");
        }
        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};