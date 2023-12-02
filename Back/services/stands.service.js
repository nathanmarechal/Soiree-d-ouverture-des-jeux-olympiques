const pool = require("../database/db");
const multer = require("multer");
const path = require("path");


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


// Multer Disk Storage Configuration
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


async function uploadingPictureDescriptionAsync(req) {
    try {
        // Note: 'upload.single('file')' returns a middleware function that needs to be called with req, res, and next
        await new Promise((resolve, reject) => {
            upload.single('photo')(req, {}, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        if (!req.file) {
            throw new Error('File upload failed');
        }
        return { location :`${process.env.BASE_URL}/stands/picture-description/${req.file.filename}`}
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

module.exports = {
    getAllStands: getAllStands,
    uploadingPictureDescription:uploadingPictureDescription,
    getStandById:getStandById
}