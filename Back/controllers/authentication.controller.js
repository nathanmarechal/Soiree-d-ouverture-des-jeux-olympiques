const loginService = require("../services/authentication.service");
const {sha256} = require("pg/lib/crypto/utils-webcrypto");

exports.getLoginToken = (req, res) => {
    const email = req.query.email;
    const passwordHash = req.query.password;
    console.log("in the back : "+passwordHash)
    loginService.getLoginToken(email,passwordHash,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            if (data==null)
                return res.status(404).send("Échec de l'authentification");
            return res.status(200).send(data);
        }
    })
}
// Fonction pour convertir ArrayBuffer en chaîne hexadécimale
function bufferToHex(buffer) {
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

exports.getWithoutHash = async (req, res) => {
    const email = req.query.email;
    const password = req.query.password;

    try {
        // Supposons que sha256 retourne une promesse qui se résout en ArrayBuffer
        const buffer = await sha256(password);
        // Convertir l'ArrayBuffer en chaîne hexadécimale
        const passwordHash = bufferToHex(buffer);
        console.log("in the back method not hashed : " + passwordHash);

        loginService.getLoginToken(email, passwordHash, (error, data) => {
            if (error) {
                return res.status(500).send("Internal error");
            } else {
                if (data == null)
                    return res.status(404).send("Échec de l'authentification");
                return res.status(200).send(data);
            }
        });
    } catch (error) {
        console.error("Hashing error:", error);
        return res.status(500).send("Internal error during hashing");
    }
}