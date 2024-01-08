const pool = require("../database/db");

exports.checkRight = (req, res, next) => {

    console.log("checking right at url : "+req.originalUrl)
    const session_id = req.query.session_id ? req.query.session_id : req.body.session_id;


    const right_name = getRightName(req.originalUrl)

    console.log("session_id=",session_id,"right name=",right_name)
    checkRight_by_name(session_id,right_name)
        .then((success)=>
        {
            if(success)
            {
//                console.log("l'utilisateur courant dispose de ce droit");
                next();
            }
            else
            {
                //console.log("l'utilisateur courant ne dispose pas de ce droit");
                return res.status(400).send("l'utilisateur courant ne dispose pas de ce droit");
            }
        })
        .catch(error=>
        {
            return res.status(400).send("erreur:"+error);
        })
}
function getRightName(path)
{
    const questionMarkIndex = path.indexOf('?');
    // Check if the "?" character is present in the string
    if (questionMarkIndex !== -1) {
        // Return the substring before the "?"
        path = path.substring(0, questionMarkIndex);
    }


    console.log("getting the right at:"+path);

    if(path.startsWith("/api/users/get"))
    {
        return "see_users";
    }
    else if(path.startsWith("/api/users/update"))
    {
        return "update_users";
    }
    else if(path.startsWith("/api/users/delete"))
    {
        return "delete_users";
    }
    else
    {
        console.log("no right assigned to path:"+path);
        return "";
    }
}


async function checkRight_by_name(session_id,right_name)
{
    const conn = await pool.connect();
    const res = await conn.query(
        "SELECT id FROM droits\n" +
        "WHERE libelle = $1\n" +
        ";",[right_name])
    conn.release()
    if(res.rows.length!==1)
    {
        //console.log("different than 1 row :: "+right_name)
        return false;
    }
//    console.log("rows:"+res.rows)
//    console.log("id : "+res.rows[0].id)
    return checkRight_by_id(session_id,res.rows[0].id)
}

async function checkRight_by_id(session_id,right_id)
{

    const conn = await pool.connect();

    const timeQuerry = await conn.query(
        "SELECT now()<=session.timeLimit AS ok FROM session\n" +
        "WHERE session_id = $1\n" +
        ";",[session_id]
    )
    if(timeQuerry.rows.length!=1 || !timeQuerry.rows[0].ok)
        return false;

    const res = await conn.query(
        "SELECT $1 IN (\n" +
        "SELECT role_droits.id_droit FROM session\n" +
        "LEFT JOIN utilisateur ON utilisateur.id_user = session.id_user\n" +
        "LEFT JOIN role_droits ON role_droits.id_role = utilisateur.id_role\n" +
        "WHERE session_id = $2) AS ok\n" +
        ";",[right_id,session_id])
    conn.release()
    return res.rows.length==1 && res.rows[0].ok;
}
