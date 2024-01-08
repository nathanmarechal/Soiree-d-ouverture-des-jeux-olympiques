const pool = require("../database/db");

async function getBestSellerPrestationAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT SUM(p.prix*lc.quantite) AS \"prix_total\", p.libelle FROM ligne_commande lc\n" +
            "JOIN prestation p on p.id_prestation = lc.id_prestation\n" +
            "GROUP BY p.id_prestation\n" +
            "ORDER BY SUM(p.prix*lc.quantite) DESC;");
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getBestSellerPrestationAsync:', error);
        throw error;
    }
}

const getBestSellerPrestation = (callback) => {
    getBestSellerPrestationAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getNewStandByMonthAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT\n" +
            "  TO_CHAR(DATE_TRUNC('month', date_achat), 'YYYY-MM') AS mois,\n" +
            "  COUNT(id_stand) AS nombre_stands\n" +
            "FROM\n" +
            "  stand\n" +
            "GROUP BY\n" +
            "  DATE_TRUNC('month', date_achat)\n" +
            "ORDER BY\n" +
            "  DATE_TRUNC('month', date_achat);");
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getNewStandByMounthAsync:', error);
        throw error;
    }
}

const getNewStandByMonth = (callback) => {
    getNewStandByMonthAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getNbPrestationHeureAsync(idStand) {
    try {
        const conn = await pool.connect();
        const query = `
            SELECT SUM(lc.quantite) AS "nb_prestation_par_heure",
                   c.heure_creneau
            FROM ligne_commande lc
                     JOIN prestation p ON lc.id_prestation = p.id_prestation
                     JOIN creneau c ON c.id_creneau = lc.id_creneau
                     JOIN stand s ON p.id_stand = s.id_stand
            WHERE s.id_stand = $1   
            GROUP BY c.id_creneau, c.heure_creneau
            ORDER BY c.id_creneau, c.heure_creneau;`;

        const result = await conn.query(query, [idStand]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getNbPrestationHeureAsync:', error);
        throw error;
    }
}

const getNbPrestationHeure = (id, callback) => {
    getNbPrestationHeureAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}


async function getAveragePurchaseByStandAsync(idStand) {
    try {
        const conn = await pool.connect();
        const query = `
            SELECT AVG(total_commande) AS average_purchase
            FROM (
                     SELECT c.id_commande, c.id_user, SUM(lc.prix * lc.quantite) AS total_commande
                     FROM commande c
                              JOIN ligne_commande lc ON c.id_commande = lc.id_commande
                              JOIN prestation p ON lc.id_prestation = p.id_prestation
                     WHERE p.id_stand = $1
                     GROUP BY c.id_commande, c.id_user
                 ) AS sous_requete;`;

        const result = await conn.query(query, [idStand]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAveragePurchaseByStandAsync:', error);
        throw error;
    }
}

const getAveragePurchaseByStand = (id, callback) => {
    getAveragePurchaseByStandAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}


async function getBestClientByStandAsync(idStand) {
    try {
        const conn = await pool.connect();
        const query = `SELECT concat(u.prenom, ' ',u.nom) as name, SUM(lc.prix * lc.quantite) AS best_client
                       FROM ligne_commande lc
                                JOIN prestation p ON lc.id_prestation = p.id_prestation
                                JOIN utilisateur u on lc.id_user = u.id_user
                       WHERE p.id_stand = $1
                       GROUP BY  u.prenom, u.nom
                       ORDER BY best_client DESC
                           LIMIT 1;`;

        const result = await conn.query(query, [idStand]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getBestClientByStandAsync:', error);
        throw error;
    }
}

const getBestClientByStand = (id, callback) => {
    getBestClientByStandAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getSalesRevnueByTypeByStandAsync(idStand) {
    try {
        const conn = await pool.connect();
        const query = `SELECT tp.libelle, SUM(lc.prix * lc.quantite) AS sales_revenue_by_type
                       FROM ligne_commande lc
                                JOIN prestation p ON lc.id_prestation = p.id_prestation
                                JOIN type_prestation tp ON p.id_type_prestation = tp.id_type_prestation
                       WHERE p.id_stand = $1
                       GROUP BY tp.libelle;`;

        const result = await conn.query(query, [idStand]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getSalesRevnueByTypeByStandAsync:', error);
        throw error;
    }
}

const getSalesRevnueByTypeByStand = (id, callback) => {
    getSalesRevnueByTypeByStandAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

module.exports = {
    getBestSellerPrestation : getBestSellerPrestation,
    getNewStandByMonth : getNewStandByMonth,
    getNbPrestationHeure:getNbPrestationHeure,
    getAveragePurchaseByStand:getAveragePurchaseByStand,
    getBestClientByStand:getBestClientByStand,
    getSalesRevnueByTypeByStand:getSalesRevnueByTypeByStand
}