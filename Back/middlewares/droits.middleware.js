const pool = require("../database/db")
const usersService = require("../services/users.service")

exports.checkRight = async (req, res, next) => {
    try {
        const sessionId = req.query.session_id;
        const rightName = getRightName(req.originalUrl);
        console.log("rightName", rightName)
        console.log("sessionId", sessionId)
        console.log(req.body)

        if (!rightName) {
            return res.status(403).send("Aucun droit associé à ce chemin");
        }
        const hasRight = await checkRight(sessionId, rightName);

        if (!hasRight) {
            res.status(403).send(`L'utilisateur courant ne dispose pas du droit nécessaire: ${rightName}`);
        }
        else{
            next();
        }
    } catch (error) {
        res.status(400).send(`Erreur: ${error}`);
    }
};

function getRightName(url) {
    const paths = {
        "/api/users/get": "see_users",
        "/api/users/update": "update_users",

        "/api/users/updateSolde": "update_self_users",
        "/api/users/updateUserCourantWoPassword": "update_self_users",

        "/api/users/delete": "delete_users",
        "/api/users/create-user": "create_users",

        "/api/users/getUserAttente": "see_waiting_users",
        "/api/users/refuseUser": "refuse_waiting_users",
        "/api/users/acceptUser": "accept_waiting_users",

        "/api/stands/add": "create_stands",
        "/api/stands/description": "update_self_stands",
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

        "/api/prestations/addOwnPrestation": "create_self_prestations",
        "/api/prestations/updateOwnPrestation": "update_self_prestations",
        "/api/prestations/updateOwnPrestation/is-available": "update_self_prestations",
        "/api/prestations/deleteOwnPrestation": "delete_self_prestations",

        "/api/avis/add": "create_avis",
        "/api/avis/deleteAvisByIdStandUser": "delete_avis",

        "/api/homePage/description": "update_home_page",

        "/api/messagerie/get-all-conversations":"messages-admin",
        "/api/messagerie/toggle-resolved-converstation":"messages-admin",

        "/api/messagerie/get-conversations-for-user":"messages-user",

        "/api/panier/getOwnPanier": "see_self_panier",
        "/api/panier/addPrestationToOwnPanier": "add_self_panier",
        "/api/panier/updateOwnPanier": "update_self_panier",
        "/api/panier/deletePrestationFromPanierOwnUser": "delete_self_panier",

        "/api/statistiques/prestataire/count-rating":"statistiques-prestataire",
        "/api/statistiques/prestataire/average-rating":"statistiques-prestataire",
        "/api/statistiques/prestataire/nb-prestation-heure":"statistiques-prestataire",
        "/api/statistiques/prestataire/average-purchase":"statistiques-prestataire",
        "/api/statistiques/prestataire/best-client":"statistiques-prestataire",
        "/api/statistiques/prestataire/sales-revenue-by-type":"statistiques-prestataire",

        "/api/statistiques/best-seller-prestation":"statistiques-admin",
        "/api/statistiques/new-stand-by-month":"statistiques-admin",
        "/api/statistiques/nb-stands":"statistiques-admin",
        "/api/statistiques/nb-prestations-available":"statistiques-admin",
        "/api/statistiques/nb-users":"statistiques-admin",
        "/api/statistiques/average-purchase":"statistiques-admin",
        "/api/statistiques/top-seller-stand":"statistiques-admin",
        "/api/statistiques/top-avis-stand":"statistiques-admin",

        "/api/commande/getCommandeUserCourant": "see_self_commande",
        "/api/commande/getScheduleCurrentUser": "see_self_commande",
        "/api/commande/getLigneCommandeBycommandeId": "see_self_commande",
        "/api/commande/getCommandesCurrentPrestataires": "see_self_commande_received",
        "/api/commande/addCommandeFromPanierUserCourant": "add_self_commande",
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