const pool = require("../database/db");


async function getCommandeByUserIdAsync(id_user) {
    try {
        const conn = await pool.connect();
        console.log("dans le service" + id_user)
        const result = await conn.query("SELECT c.id_commande, date_commande, c.id_etat_commande, sum( ligne_commande.prix * quantite) as prix_total, sum(quantite) as nbr_presta, e.libelle FROM commande c LEFT JOIN ligne_commande on c.id_commande = ligne_commande.id_commande JOIN etat_commande e on e.id_etat=c.id_etat_commande WHERE c.id_user=$1 GROUP BY c.date_commande, c.id_commande, c.id_user, e.libelle ORDER BY date_commande desc;", [id_user]);
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

const addCommande = (id_user, callback) => {
    console.log("dans le service" + id_user)
    addCommandeAsync(id_user)
        .then(res => {
            callback(null, "success");
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function addCommandeAsync(id_user) {
    try {
        const conn = await pool.connect();
        await conn.query("SELECT * FROM ligne_panier LEFT JOIN prestation p on ligne_panier.id_prestation = p.id_prestation WHERE id_user=$1;", [id_user] , (err, items_ligne_panier) => {
            if (err) {
                console.log(err)
            } else {
                console.log(items_ligne_panier.rows)
                conn.query("INSERT INTO commande (date_commande, id_user, id_etat_commande) VALUES (timeofday(), $1, 1) RETURNING id_commande;", [id_user], (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(result)
                            let last_insert_id = result.rows[0].id_commande;
                        console.log("last_insert_id : " + last_insert_id)
                        items_ligne_panier.rows.forEach(item => {
                            conn.query('DELETE FROM ligne_panier WHERE id_user=$1 AND id_prestation=$2 AND id_creneau=$3;', [id_user, item.id_prestation, item.id_creneau], (err, result) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    conn.query('INSERT INTO ligne_commande (id_commande,  id_user, id_prestation, quantite, prix, id_creneau) VALUES ($1, $6 ,$2, $3, $4, $5);', [last_insert_id, item.id_prestation, item.quantite, item.prix, item.id_creneau, id_user], (err, result) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            console.log("success")
                                        }
                                    });
                                }
                            });
                        });
                    }
                });

            }
        });
        conn.release();
    } catch (error) {
        console.error('Error in addCommandeAsync:', error);
        throw error;
    }
}

module.exports = {
    getCommandeByUserId: getCommandeByUserId,
    addCommande: addCommande
}