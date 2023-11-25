const loginService = require("../services/authentication.service");

exports.getLoginToken = (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    loginService.getLoginToken(email,password,(error, data) => {
        if (error) {
            console.log("erreur")
            return res.status(500).send("Internal error");
        }
        else {
            console.log("pas d'erreur")
            return res.status(200).send(data);
        }
    })
} //POSTMAN: GET http://localhost:3000/users/