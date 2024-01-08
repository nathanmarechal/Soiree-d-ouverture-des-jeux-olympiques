const pool = require("../database/db");

exports.checkRight = async (req, res, next) => {
    try {
        const sessionId = req.query.session_id || req.body.session_id;
        const rightName = getRightName(req.originalUrl);

        if (!rightName) {
            console.log(`No right assigned to path: ${req.originalUrl}`);
            return res.status(403).send("Aucun droit associé à ce chemin");
        }

        const hasRight = await checkRight(sessionId, rightName);
        if (!hasRight) {
            return res.status(403).send("L'utilisateur courant ne dispose pas de ce droit");
        }

        next();
    } catch (error) {
        return res.status(400).send(`Erreur: ${error}`);
    }
};

function getRightName(url) {
    const paths = {
        "/api/users/get": "see_users",
        "/api/users/update": "update_users",
        "/api/users/delete": "delete_users",
        "/api/users/create-user": "create_users",

        "/api/users/getUserAttente": "see_waiting_users",
        "/api/users/refuseUser": "refuse_waiting_users",
        "/api/users/acceptUser": "accept_waiting_users",

        /*
        "/api/map/create-zone": "create_stands",
        "/api/map/update-zone": "update_stands",
        "/api/map/delete-zone": "delete_stands",

        "/api/map/create-zone": "create_zones",
        "/api/map/update-zone": "update_zones",
        "/api/map/delete-zone": "delete_zones",

        "/api/map/create-zone": "create_areas",
        "/api/map/update-zone": "update_areas",
        "/api/map/delete-zone": "delete_areas",
         */

        "/api/roles/get": "see_roles",
        "/api/roles/add": "create_roles",
        "/api/roles/update": "update_roles",
        "/api/roles/delete": "delete_roles",
    };


    const path = url.split('?')[0]; // Enlève la query string
    return paths[path] || "";
}

async function checkRight(sessionId, rightName) {
    const query = `
        SELECT EXISTS (
            SELECT 1
            FROM session
             JOIN utilisateur ON utilisateur.id_user = session.id_user
             JOIN role ON role.id_role = utilisateur.id_role
             JOIN role_droits ON role.id_role = role_droits.id_role
             JOIN droits ON droits.id = role_droits.id_droit
            WHERE session.session_id = $1
              AND droits.libelle = $2
              AND now() <= session.timeLimit
        ) AS has_right;
    `;
    const conn = await pool.connect();
    const res = await conn.query(query, [sessionId, rightName]);
    conn.release();
    return res.rows[0].has_right;
}
