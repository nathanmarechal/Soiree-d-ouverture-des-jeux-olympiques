const pool = require("../database/db");

async function getBestSellerPrestationAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT SUM(p.prix*lc.quantite) AS \"prix_total\", p.libelle FROM ligne_commande lc\n" +
            "JOIN prestation p on p.id_prestation = lc.id_prestation\n" +
            "GROUP BY p.id_prestation\n" +
            "ORDER BY SUM(p.prix*lc.quantite) DESC;");
        conn.release();
        console.log("result : " + result.rows)
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

async function getNewStandByMounthAsync() {
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
        console.log("result : " + result.rows)
        return result.rows;
    } catch (error) {
        console.error('Error in getNewStandByMounthAsync:', error);
        throw error;
    }
}

const getNewStandByMounth = (callback) => {
    getNewStandByMounthAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

module.exports = {
    getBestSellerPrestation: getBestSellerPrestation,
    getNewStandByMounth:getNewStandByMounth
}