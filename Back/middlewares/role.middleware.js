const pool = require("../database/db");

exports.checkRoleExists = async (req, res, next) => {
    const id = req.body.id_role || req.params.idRole || req.query.id_role;
    try {
        const conn = await pool.connect();

        console.log("id_role : " + id)

        const checkResult = await conn.query("SELECT * FROM role WHERE id_role = $1", [id]);
        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(404).send("Role non trouvé");
        }
        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

exports.checkIfClient = async (req, res, next) => {
    const id = req.body.id_role;
    try {
        if (id != 3) {
            return res.status(400).send("Vous n'êtes pas un client");
        }
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

exports.checkIfPrestataire = async (req, res, next) => {
    const id = req.body.user.id_role;
    try {
        if (id != 2) {
            return res.status(400).send("Vous n'êtes pas un prestataire");
        }
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}