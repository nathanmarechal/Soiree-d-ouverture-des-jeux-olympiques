const pool = require("../database/db");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(__dirname, '../assets/homePage/description');
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

async function uploadingPictureHomePageDescriptionAsync(req) {
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
        return { location :`${process.env.BASE_URL}/stands/picture-description/${req.file.filename}`}
    } catch (error) {
        console.error('Error in uploadingPictureDescriptionAsync:', error);
        throw error;
    }
}

const uploadingPictureHomePageDescription = (req, callback) => {
    uploadingPictureHomePageDescriptionAsync(req)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function updateHomePageDescriptionAsync(id, body) {
    try {
        const conn = await pool.connect();
        console.log(body.description)
        const result = await conn.query("UPDATE text_accueil SET description = $1 WHERE id_text_accueil = $2;", [body.description, id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in updateStandDescriptionAsync:', error);
        throw error;
    }
}

const updateHomePageDescription = (id, body, callback) => {
    updateHomePageDescriptionAsync(id, body)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

const getAllDescription = (callback) => {
    getAllDescriptionAsync()
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

async function getAllDescriptionAsync() {
    try {
        const conn = await pool.connect();
        const result = await conn.query("SELECT * FROM text_accueil;");
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getAllDescriptionAsync:', error);
        throw error;
    }
}

module.exports = {
    updateHomePageDescription: updateHomePageDescription,
    uploadingPictureHomePageDescription: uploadingPictureHomePageDescription,
    getAllDescription: getAllDescription
}