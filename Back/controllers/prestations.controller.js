const multer = require('multer');
const path = require('path');

const prestationsService = require("../services/prestations.service");

exports.getPrestations = (req, res) => {
    prestationsService.getAllPrestations((error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
}

exports.getPrestationByUserId = (req, res) => {
    const id = req.params.id;
    prestationsService.getPrestationByUserId(id, (error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            return res.status(200).send(data);
        }
    })
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

exports.uploadPicturePresatation = (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // Gérer l'erreur de Multer
            return res.status(500).json({ error: err.message });
        } else if (err) {
            // Gérer les autres erreurs
            return res.status(500).json({ error: err.message });
        }

        // Ici, vous pouvez accéder à req.file et req.body
        const fileDetails = req.file;

        // Continuer avec le traitement des données et du fichier
        res.status(200).json({
            message: "Image téléchargée avec succès",
            fileDetails: fileDetails
        });
    });
};