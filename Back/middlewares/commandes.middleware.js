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

exports.checkLigneCommandeExists = async (req, res, next) => {
    const id_presta = req.query.id_prestation || req.body.id_prestation;
    const id_creneau = req.query.id_creneau || req.body.id_creneau;
    const id_commande = req.query.id_commande || req.body.id_commande;
    if (!id) {
        return res.status(400).send("ID commande requis.");
    }

    try {
        const conn = await pool.connect();
        const checkResult = await conn.query("SELECT FROM ligne_commande WHERE id_commande = $1 AND id_prestation = $2 AND id_creneau = $3", [id_commande, id_presta, id_creneau]);
        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(404).send("Ligne commande non trouvée");
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