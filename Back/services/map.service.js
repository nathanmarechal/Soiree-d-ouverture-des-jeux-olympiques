const pool = require("../database/db");
const {as} = require("pg-promise");

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
            "    s.image_stand AS \"image_stand\"," +
            "    s.nom_stand AS \"nom_stand\",\n" +
            "s.id_stand,"+
            "    s.description_stand AS \"description_stand\",\n" +
            "    z.libelle AS \"zone\",\n" +
            "    CASE WHEN s.id_emplacement IS NULL THEN true ELSE false END AS isFree,\n" +
            "    z.id_zone AS \"id_zone\",\n" +
            "    z.id_type_zone AS \"id_type_zone\",\n" +
            "    z.couleur_hexa, "+
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

const updateArea = (id, body, callback) => {
    updateAreaAsync(id, body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function updateAreaAsync(id, body) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("UPDATE emplacement SET id_zone = $1 WHERE id_emplacement = $2;", [body.id_zone, id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in updateAreaAsync:', error);
        throw error;
    }
}

const createArea = (body, callback) => {
    createAreaAsync(body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function createAreaAsync(body) {
    try {
        const conn = await pool.connect();
        console.log("body.coordonnes: ", body.coordonnes)
        console.log("body.surface: ", body.surface)
        console.log("body.id_zone: ", body.id_zone)
        const result = await conn.query("INSERT INTO emplacement (coordonnes, surface, id_zone) VALUES ($1, $2, $3);", [JSON.stringify(body.coordonnes), body.surface, body.id_zone]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in createAreaAsync:', error);
        throw error;
    }
}

const deleteArea = (id, callback) => {
    deleteAreaAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function deleteAreaAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("DELETE FROM emplacement WHERE id_emplacement = $1;", [id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in deleteAreaAsync:', error);
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
        const result = await conn.query("SELECT z.id_zone, z.libelle, z.couleur_hexa, z.id_type_zone , tz.libelle as \"type_zone_libelle\" FROM zone z JOIN type_zone tz on tz.id_type_zone = z.id_type_zone;");
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllZonesAsync:', error);
        throw error;
    }
}

const getZoneById = (id, callback) => {
    getZoneByIdAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getZoneByIdAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT z.id_zone, z.libelle, z.couleur_hexa, z.id_type_zone , tz.libelle as \"type_zone_libelle\" FROM zone z JOIN type_zone tz on tz.id_type_zone = z.id_type_zone WHERE z.id_zone = $1;", [id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getZoneByIdAsync:', error);
        throw error;
    }
}

const updateZone = (id, body, callback) => {
    updateZoneAsync(id, body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function updateZoneAsync(id, body) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("UPDATE zone SET id_type_zone = $1, libelle = $2, couleur_hexa = $3 WHERE id_zone = $4;", [body.id_type_zone, body.libelle, body.couleur_hexa, id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in updateZoneAsync:', error);
        throw error;
    }
}

const createZone = (body, callback) => {
    createZoneAsync(body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function createZoneAsync(body) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("INSERT INTO zone (id_type_zone, libelle, couleur_hexa) VALUES ($1, $2, $3);", [body.id_type_zone, body.libelle, body.couleur_hexa]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in createZoneAsync:', error);
        throw error;
    }
}

const deleteZone = (id, callback) => {
    deleteZoneAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function deleteZoneAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("DELETE FROM zone WHERE id_zone = $1;", [id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in deleteZoneAsync:', error);
        throw error;
    }
}

const getAllTypeZones = (callback) => {
    getAllTypeZoneAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getAllTypeZoneAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT * FROM type_zone");
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllTypeZoneAsync:', error);
        throw error;
    }
}

module.exports = {
    getAllAreas: getAllAreas,
    getAllZones: getAllZones,
    getAllTypeZones: getAllTypeZones,
    getZoneById: getZoneById,
    updateArea: updateArea,
    createArea: createArea,
    deleteArea: deleteArea,
    updateZone: updateZone,
    createZone: createZone,
    deleteZone: deleteZone
}