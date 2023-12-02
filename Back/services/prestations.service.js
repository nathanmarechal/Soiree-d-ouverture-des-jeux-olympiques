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

async function getPrestationByUserIdAsync(id) {
    try {
        const conn = await pool.connect();
        console.log("id depuis getPrestationasync" + id)
        const result = await conn.query("SELECT p.id_prestation, p.libelle, p.prix, p.image, p.id_type_prestation, tp.libelle as \"type_prestation_libelle\", COUNT(lc.id_prestation) as \"nb_ventes\", s.id_stand, s.nom_stand\n" +
            "FROM utilisateur u\n" +
            "JOIN stand s on u.id_stand = s.id_stand\n" +
            "JOIN prestation p on s.id_stand = p.id_stand\n" +
            "JOIN type_prestation tp on tp.id_type_prestation = p.id_type_prestation\n" +
            "LEFT JOIN ligne_commande lc on p.id_prestation = lc.id_prestation\n" +
            "WHERE u.id_user = $1\n" +
            "GROUP BY p.id_prestation, p.libelle, p.prix, p.image, p.id_type_prestation, p.id_stand, tp.libelle , s.id_stand, s.nom_stand\n" +
            "ORDER BY p.id_type_prestation;", [id]);
        conn.release();
        return result.rows;
    } catch (error) {
        console.error('Error in getPrestationByUserIdAsync:', error);
        throw error;
    }
}

const getPrestationByUserId = (id, callback) => {
    getPrestationByUserIdAsync(id)
        .then(res => {
            callback(null, res);
        })
        .catch(error => {
            console.log(error);
            callback(error, null);
        });
}

// Fonction pour nettoyer le nom de fichier et éviter les injections de chemin de fichier
function sanitizeFileName(fileName) {
    // Utiliser path.basename pour s'assurer que seul le nom de fichier est pris, sans chemin
    const baseName = path.basename(fileName);
    // Remplacer les caractères non autorisés par des underscores
    return baseName.replace(/[^a-zA-Z0-9_.-]/g, "_");
}

// Configuration de Multer pour le stockage des fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(__dirname, '../assets/prestation');

        cb(null, destinationPath); // Assurez-vous que ce chemin existe et est accessible en écriture
    },
    filename: function (req, file, cb) {
        // Utiliser le nom de fichier original, nettoyé pour éviter les problèmes de sécurité
        const safeName = sanitizeFileName(file.originalname);
        cb(null, safeName);
    }
});

// Initialisation de l'upload Multer pour traiter un seul fichier avec le nom de champ 'photo'
const upload = multer({ storage: storage }).single('photo');



async function uploadPicturePresatationAsync(req) {
    try {
        // Uploading the picture using Multer
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

module.exports = {
    getAllPrestations: getAllPrestations,
    getPrestationByUserId: getPrestationByUserId,
    uploadPicturePresatation:uploadPicturePresatation
}