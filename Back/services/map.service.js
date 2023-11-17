//const {v4:uuid4} = require("uuid");
const pool = require("../database/db");


const getAllAreas = (callback) => {
    getAllAreasAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getAllAreasAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT\n" +
            "    e.id_emplacement AS \"id_emplacement\",\n" +
            "    CONCAT(s.nom_stand, ' ', e.id_emplacement) AS \"nom_emplacement\",\n" +
            "    s.nom_stand AS \"nom_stand\",\n" +
            "    s.description_stand AS \"description_stand\",\n" +
            "    z.libelle AS \"zone\",\n" +
            "    CASE WHEN s.id_emplacement IS NULL THEN true ELSE false END AS isFree,\n" +
            "    z.id_zone AS \"id_zone\",\n" +
            "    z.id_type_zone AS \"id_type_zone\",\n" +
            "    (\n" +
            "        SELECT JSON_AGG(DISTINCT tp.id_type_prestation)\n" +
            "        FROM prestation p\n" +
            "        JOIN type_prestation tp ON p.id_type_prestation = tp.id_type_prestation\n" +
            "        WHERE p.id_stand = s.id_stand\n" +
            "    ) AS \"id_type_prestation\",\n" +
            "    e.coordonnes AS \"coordinates\",\n" +
            "    e.surface AS \"surface_area\"\n" +
            "FROM\n" +
            "    emplacement e\n" +
            "LEFT JOIN\n" +
            "    stand s ON e.id_emplacement = s.id_emplacement\n" +
            "LEFT JOIN\n" +
            "    zone z ON e.id_zone = z.id_zone\n" +
            "ORDER BY\n" +
            "    e.id_emplacement;"
        );
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllAreasAsync:', error);
        throw error;
    }
}

const getAllZones = (callback) => {
    getAllZonesAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getAllZonesAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT * FROM zone");
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllZonesAsync:', error);
        throw error;
    }

}


module.exports = {
    getAllAreas: getAllAreas,
    getAllZones: getAllZones
}