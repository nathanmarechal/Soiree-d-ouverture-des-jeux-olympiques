const pool = require("../database/db");

async function getBestSellerPrestationAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query(
            "SELECT SUM(p.prix * lc.quantite) AS \"prix_total\", p.libelle " +
            "FROM ligne_commande lc " +
            "JOIN prestation p ON p.id_prestation = lc.id_prestation " +
            "GROUP BY p.id_prestation, p.libelle " +
            "ORDER BY SUM(p.prix * lc.quantite) DESC " + // Added space before 'LIMIT'
            "LIMIT 5;"
        );
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


async function getNbStandsAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query(`SELECT COUNT(*) as nb_prestataires FROM stand;`);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getNbStandsAsync:', error);
        throw error;
    }
}

const getNbStands = (callback) => {
    getNbStandsAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getNbPrestationsAvailableAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query(`SELECT COUNT(*) as nb_prestations_available FROM prestation where is_available=true;`);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getNbPrestationsAvailableAsync:', error);
        throw error;
    }
}

const getNbPrestationsAvailable = (callback) => {
    getNbPrestationsAvailableAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getNbUsersAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query(`SELECT COUNT(*) as nb_users FROM utilisateur;`);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getNbUsersAsync:', error);
        throw error;
    }
}

const getNbUsers = (callback) => {
    getNbUsersAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getAveragePurchaseAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query(`SELECT AVG(total_commande) AS average_purchase_global
                                         FROM (
                                                  SELECT c.id_commande, c.id_user, SUM(lc.prix * lc.quantite) AS total_commande
                                                  FROM commande c
                                                           JOIN ligne_commande lc ON c.id_commande = lc.id_commande
                                                           JOIN prestation p ON lc.id_prestation = p.id_prestation
                                                  GROUP BY c.id_commande, c.id_user
                                              ) AS sous_requete;
        `);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAveragePurchaseAsync:', error);
        throw error;
    }
}

const getAveragePurchase = (callback) => {
    getAveragePurchaseAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getTopSellerStandAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query(`SELECT
                                             s.nom_stand,
                                             s.image_stand,
                                             SUM(lc.prix * lc.quantite) AS sales_revenue
                                         FROM
                                             ligne_commande lc
                                                 JOIN
                                             prestation p ON lc.id_prestation = p.id_prestation
                                                 JOIN
                                             stand s ON p.id_stand = s.id_stand
                                         GROUP BY
                                             s.id_stand
                                         ORDER BY
                                             sales_revenue DESC
                                             LIMIT 1;`);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getNbUsersAsync:', error);
        throw error;
    }
}

const getTopSellerStand = (callback) => {
    getTopSellerStandAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getTopAvisStandAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query(`SELECT ROUND(AVG(note),2) as top_avg_rating, s.nom_stand, s.image_stand  FROM avis_stand_utilisateur
                                                                                                              JOIN public.stand s on avis_stand_utilisateur.id_stand = s.id_stand
                                         GROUP BY avis_stand_utilisateur.id_stand,s.nom_stand, s.image_stand
                                         ORDER BY AVG(note) DESC
                                             LIMIT 1;`);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getNbUsersAsync:', error);
        throw error;
    }
}

const getTopAvisStand = (callback) => {
    getTopAvisStandAsync()
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

async function getAvgRatingByStandAsync(idStand) {
    try {
        const conn = await pool.connect();
        const query = `SELECT ROUND(AVG(note),2) as avg_rating FROM avis_stand_utilisateur WHERE id_stand = $1;`;

        const result = await conn.query(query, [idStand]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAvgRatingByStandAsync:', error);
        throw error;
    }
}

const getAvgRatingByStand = (id, callback) => {
    getAvgRatingByStandAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getCountRatingByStandAsync(idStand) {
    try {
        const conn = await pool.connect();
        const query = `SELECT COUNT(note) as nb_rating FROM avis_stand_utilisateur WHERE id_stand = $1;`;

        const result = await conn.query(query, [idStand]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAvgRatingByStandAsync:', error);
        throw error;
    }
}

const getCountRatingByStand = (id, callback) => {
    getCountRatingByStandAsync(id)
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
    getSalesRevnueByTypeByStand:getSalesRevnueByTypeByStand,
    getAvgRatingByStand:getAvgRatingByStand,
    getCountRatingByStand:getCountRatingByStand,
    getNbStands,
    getNbPrestationsAvailable,
    getNbUsers,
    getAveragePurchase,
    getTopSellerStand,
    getTopAvisStand
}