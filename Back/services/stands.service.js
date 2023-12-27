const pool = require("../database/db");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(__dirname, '../assets/stand/description');
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

async function getAllStandsAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT * FROM stand");
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllStandsAsync:', error);
        throw error;
    }
}

const getAllStands = (callback) => {
    getAllStandsAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getStandByIdAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT s.id_stand, s.nom_stand, s.image_stand, s.description_stand, s.date_achat, s.prix, e.coordonnes FROM stand s\n" +
            "JOIN utilisateur u on s.id_stand = u.id_stand\n" +
            "JOIN emplacement e on s.id_emplacement = e.id_emplacement\n" +
            "WHERE u.id_user = $1;",[id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getStandByIdAsync:', error);
        throw error;
    }
}

const deleteStand = (id, callback) => {
    deleteStandAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function deleteStandAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("DELETE FROM stand WHERE id_stand = $1;", [id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in deleteStandAsync:', error);
        throw error;
    }
}

const createStand = (body, callback) => {
    createStandAsync(body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function createStandAsync(body) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("INSERT INTO stand (nom_stand, image_stand, description_stand, date_achat, prix, id_emplacement) VALUES ($1, $2, $3, $4, $5, $6);", [body.nom_stand, body.image_stand, body.description_stand, body.date_achat, body.prix, body.id_emplacement]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in createStandAsync:', error);
        throw error;
    }
}

const updateStand = (id, body, callback) => {
    updateStandAsync(id, body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function updateStandAsync(id, body) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("UPDATE stand SET nom_stand = $1, image_stand = $2, description_stand = $3, date_achat = $4, prix = $5, id_emplacement = $6 WHERE id_stand = $7;", [body.nom_stand, body.image_stand, body.description_stand, body.date_achat, body.prix, body.id_emplacement, id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in updateStandAsync:', error);
        throw error;
    }
}


const getStandById = (id, callback) => {
    getStandByIdAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function uploadingPictureDescriptionAsync(req) {
    try {
        await new Promise((resolve, reject) => {
            upload.single('photo')(req, {}, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        if (!req.file) {
            throw new Error('File upload failed');
        }
        return { location :`${process.env.BASE_URL}/homePage/picture-description/${req.file.filename}`}
    } catch (error) {
        console.error('Error in uploadingPictureDescriptionAsync:', error);
        throw error;
    }
}

const uploadingPictureDescription = (req, callback) => {
    uploadingPictureDescriptionAsync(req)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function updateStandDescriptionAsync(id, body) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("UPDATE stand SET description_stand = $1 WHERE id_stand = $2;", [body.description_stand, id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in updateStandDescriptionAsync:', error);
        throw error;
    }
}

const updateStandDescription = (id, body, callback) => {
    updateStandDescriptionAsync(id, body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}


module.exports = {
    getAllStands: getAllStands,
    uploadingPictureDescription:uploadingPictureDescription,
    getStandById:getStandById,
    updateStandDescription:updateStandDescription,
    createStand: createStand,
    updateStand: updateStand,
    deleteStand: deleteStand
}