const pool = require("../database/db");
const userService = require("../services/users.service");

exports.checkCommandeExists = async (req, res, next) => {
    const id = req.query.id_commande || req.body.id_commande;

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

exports.checkCommandeBelongsToUserExists = async (req, res, next) => {
    const id_commande = req.query.id_commande;
    const session_id = req.query.session_id;

    const user = userService.getUserBySessionIdAsync(session_id)

    try {
        const conn = await pool.connect();
        const checkResult = await conn.query("SELECT * FROM commande WHERE id_commande = $1 AND id_user = $2", [id_commande, user.id_user]);
        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(403).send("Commande n'appartenant pas à l'utilisateur");
        }
        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};