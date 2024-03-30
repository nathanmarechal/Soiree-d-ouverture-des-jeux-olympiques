const pool = require("../database/db");
const usersService = require("../services/users.service");

exports.checkIfUserWithStandThatExists = async (req, res, next) => {
    const session_id = req.headers['session_id'];

    const user = await usersService.getUserBySessionIdAsync(session_id);

    try {
        const conn = await pool.connect();
        const checkResult = await conn.query("SELECT id_stand FROM utilisateur WHERE id_user = $1", [user.id_user]);
        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(404).send("Stand non trouvé pour ce prestataire");
        }
        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};