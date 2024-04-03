const loginService = require("../services/authentication.service");

exports.getLoginToken = (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    loginService.getLoginToken(email,password,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        else {
            if (data==null)
                return res.status(404).send("Échec de l'authentification");
            //add a cookie that has the session id
            res.cookie('session', data, { maxAge: 360000, httpOnly: true });
            return res.status(200).send(data);
        }
    })
} 

exports.getLoginCookiesToken = (req, res) => {
    const session_id = req.cookies.session;
    if (session_id==null)
        return res.status(404).send("Pas de session trouvée");
    return res.status(200).send(session_id);
} 

exports.logout = (req, res) => {
    console.log("logout");
    console.log(req.cookies.session)
    res.clearCookie('session', { httpOnly: true });
    console.log(req.cookies.session)
    return res.status(200).send("Déconnexion réussie");
}