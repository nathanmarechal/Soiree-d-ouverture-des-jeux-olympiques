const pool = require("../database/db");


async function getCommandeByUserIdAsync(id_user) {
    try {
        const conn = await pool.connect();
        console.log("dans le service" + id_user)
        const result = await conn.query("SELECT c.id_commande, date_commande, c.id_etat_commande, id_prestation, sum( ligne_commande.prix * quantite) as prix_total, sum(quantite) as nbr_presta,e.libelle, prix FROM ligne_commande JOIN commande c on c.id_commande=ligne_commande.id_commande JOIN etat_commande e on e.id_etat=c.id_etat_commande WHERE c.id_user=$1 GROUP BY  c.date_commande, c.id_commande, c.id_user, e.id_etat, id_prestation, libelle, prix ORDER BY id_etat, date_commande desc;", [id_user]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getCommandeByUserIdAsync:', error);
        throw error;
    }
}

const getCommandeByUserId = (id, callback) => {
    getCommandeByUserIdAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

module.exports = {
    getCommandeByUserId: getCommandeByUserId,
}