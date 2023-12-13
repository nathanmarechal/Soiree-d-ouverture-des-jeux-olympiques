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

module.exports = {
    getBestSellerPrestation : getBestSellerPrestation,
    getNewStandByMonth : getNewStandByMonth,
    getNbPrestationHeure:getNbPrestationHeure
}