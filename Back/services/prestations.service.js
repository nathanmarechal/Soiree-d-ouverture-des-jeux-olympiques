const pool = require("../database/db");
const multer = require("multer");
const path = require("path");


async function getAllPrestationsAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT * FROM prestation");
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllPrestationsAsync:', error);
        throw error;
    }
}

const getAllPrestations = (callback) => {
    getAllPrestationsAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

function sanitizeFileName(fileName) {
    const baseName = path.basename(fileName);
    return baseName.replace(/[^a-zA-Z0-9_.-]/g, "_");
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(__dirname, '../assets/prestation');
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const safeName = sanitizeFileName(file.originalname);
        cb(null, safeName);
    }
});
const upload = multer({ storage: storage }).single('photo');



async function uploadPicturePresatationAsync(req) {
    try {
        await new Promise((resolve, reject) => {
            upload(req, null, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        if (!req.file) {
            throw new Error('File upload failed');
        }
    } catch (error) {
        console.error('Error in uploadPicturePresatationAsync:', error);
        throw error;
    }
}
const uploadPicturePresatation = (req, callback) => {
    uploadPicturePresatationAsync(req)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}


const addPrestation = (libelle, prix, image, id_type_prestation, id_stand,is_available, callback) => {
        addPrestationAsync(libelle, prix, image, id_type_prestation, id_stand,is_available)
            .then(res => {
                callback(null, res);
            })
            .catch(error => {
                console.log(error);
                callback(error, null);
            });
}


async function addPrestationAsync(libelle, prix, image, id_type_prestation, id_stand, is_available) {
    try {
        const conn = await pool.connect();
        const date = new Date().toISOString();

        const query = `
            INSERT INTO prestation (libelle, prix, date, image, id_type_prestation, id_stand, is_available)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
        const result = await conn.query(query, [libelle, prix, date, image, id_type_prestation, id_stand, is_available]);
        conn.release();

        return result.rows;
    } catch (error) {
        console.error('Error in addPrestationAsync:', error);
        throw error;
    }
}


const updateIsAvailablePrestation = (id, callback) => {
    updateIsAvailablePrestationAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function updateIsAvailablePrestationAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("UPDATE prestation SET is_available = NOT is_available WHERE id_prestation = $1 RETURNING is_available;", [id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in updateIsAvailablePrestationAsync:', error);
        throw error;
    }
}


const updatePrestation = (id, body, callback) => {
    updatePrestationAsync(id, body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function updatePrestationAsync(id, body) {
    try {
        const conn = await pool.connect();
        const updateQuery = `UPDATE prestation SET libelle = $1, prix = $2, date = $3, image = $4,
            id_type_prestation = $5, id_stand = $6, is_available = $7 WHERE id_prestation = $8 RETURNING *;`;
        const values = [body.libelle, body.prix, body.date, body.image, body.id_type_prestation, body.id_stand, body.is_available, id];
        const result = await conn.query(updateQuery, values);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in updatePrestationAsync:', error);
        throw error;
    }
}
const deletePrestation = (id, callback) => {
    deletePrestationAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function deletePrestationAsync(id) {
    try {
        const conn = await pool.connect();
        const deleteQuery = `
            DELETE FROM prestation
            WHERE id_prestation = $1;
        `;
        const values = [id];

        const result = await conn.query(deleteQuery, values);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in deletePrestationAsync:', error);
        throw error;
    }
}

module.exports = {
    getAllPrestations: getAllPrestations,
    uploadPicturePresatation:uploadPicturePresatation,
    addPrestation:addPrestation,
    updateIsAvailablePrestation:updateIsAvailablePrestation,
    updatePrestation:updatePrestation,
    deletePrestation:deletePrestation
}