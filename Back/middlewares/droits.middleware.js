const pool = require("../database/db");

exports.checkRight = async (req, res, next) => {
    try {
        const sessionId = req.query.session_id;
        const rightName = getRightName(req.originalUrl);

        if (!rightName) {
            console.log(`No right assigned to path: ${req.originalUrl}`);
            return res.status(403).send("Aucun droit associé à ce chemin");
        }

        const hasRight = await checkRight(sessionId, rightName);
        if (!hasRight) {
            return res.status(403).send("L'utilisateur courant ne dispose pas de ce droit");
        }
        console.log("POSSEDE LES DROITS")
        next();
    } catch (error) {
        return res.status(400).send(`Erreur: ${error}`);
    }
};

function getRightName(url) {
    const paths = {
        "/api/users/get": "see_users",
        "/api/users/update": "update_users",
        "/api/users/updateSolde": "update_users",
        "/api/users/updateUserCourantWoPassword": "update_users",
        "/api/users/delete": "delete_users",
        "/api/users/create-user": "create_users",

        "/api/users/getUserAttente": "see_waiting_users",
        "/api/users/refuseUser": "refuse_waiting_users",
        "/api/users/acceptUser": "accept_waiting_users",

        "/api/stands/add": "create_stands",
        "/api/stands/description": "update_stands",
        "/api/stands/update": "update_stands",
        "/api/stands/delete": "delete_stands",

        "/api/map/create-area": "create_areas",
        "/api/emplacement-logistique/add": "create_areas",
        "/api/map/update-area": "update_areas",
        "/api/emplacement-logistique/update": "update_areas",
        "/api/map/delete-area": "delete_areas",
        "/api/emplacement-logistique/delete": "delete_areas",

        "/api/map/create-zone": "create_zones",
        "/api/map/update-zone": "update_zones",
        "/api/map/delete-zone": "delete_zones",

        "/api/roles/add": "create_roles",
        "/api/role-droit/add": "create_roles",
        "/api/roles/update": "update_roles",
        "/api/roles/delete": "delete_roles",
        "/api/role-droit/delete": "delete_roles",
        "/api/role-droit/deleteByIdRole": "delete_roles",

        "/api/prestations/add": "create_prestations",
        "/api/prestations/update": "update_prestations",
        "/api/prestations/update/is-available": "update_prestations",
        "/api/prestations/delete": "delete_prestations",

        "/api/avis/add": "create_avis",
        "/api/avis/deleteAvisByIdStandUser": "delete_avis",

        "/api/homePage/description": "update_home_page"
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

exports.checkDroitExists = async (req, res, next) => {
    const id = req.body.id_droit;
    try {
        const conn = await pool.connect();

        const checkResult = await conn.query("SELECT * FROM droits WHERE id = $1", [id]);
        if (checkResult.rows.length === 0) {
            conn.release();
            return res.status(404).send("Droit non trouvé");
        }
        conn.release();
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}