const pool = require("../database/db");
const {as} = require("pg-promise");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(__dirname, '../assets/stand/Avis');
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

async function uploadingPictureAvisAsync(req) {
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
        return { location :`${process.env.BASE_URL}/avis/picture-avis/${req.file.filename}`}
    } catch (error) {
        console.error('Error in uploadingPictureDescriptionAsync:', error);
        throw error;
    }
}

const uploadingPictureAvis = (req, callback) => {
    uploadingPictureAvisAsync(req)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

const getAvisByIdStand = (id, callback) => {
    getAvisByIdStandAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getAvisByIdStandAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("select prenom, nom, note, commentaire, avis_stand_utilisateur.id_stand as id_stand, avis_stand_utilisateur.id_user as id_user, avis_stand_utilisateur.id_avis_stand_utilisateur as id_avis_stand_utilisateur\n" +
            "    from avis_stand_utilisateur\n" +
            "    JOIN utilisateur u on u.id_user = avis_stand_utilisateur.id_user\n" +
            "    where avis_stand_utilisateur.id_stand = $1;", [id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getCommandesPrestatairesAsync:', error);
        throw error;
    }
}

const addAvis = (avis, callback) => {
    addAvisAsync(avis)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function addAvisAsync(avis) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("insert into avis_stand_utilisateur (id_stand, id_user, note, commentaire) values ($1, $2, $3, $4) RETURNING *;", [avis.id_stand, avis.id_user, avis.note, avis.commentaire]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in addAvisAsync:', error);
        throw error;
    }
}

const deleteAvis = (id, callback) => {
    deleteAvisAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function deleteAvisAsync(id) {
    try {
        const conn = await pool.connect();
        const result = await conn.query("delete from avis_stand_utilisateur where id_avis_stand_utilisateur = $1;", [id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in deleteAvisAsync:', error);
        throw error;
    }
}

module.exports = {
    getAvisByIdStand : getAvisByIdStand
    ,addAvis : addAvis
    ,deleteAvis : deleteAvis
    ,uploadingPictureAvis : uploadingPictureAvis
}