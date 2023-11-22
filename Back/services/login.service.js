const pool = require("../database/db");
const { v4: uuidv4 } = require('uuid');
const {callback} = require("pg/lib/native/query");
const getLoginToken = (email,password,callback) =>
{
    getSessionTokenAsync(email,password)
        .then(res=>{
            callback(null,res);
        })
        .catch(error=>{
            callback(error,null);
        })
}
async function updateSession(userId)
{

}
async function getSessionAsync(userId)
{
    const conn = await pool.connect();
    console.log("before ");
    const res = await conn.query('SELECT * FROM session WHERE id_user='+userId+';');
    //console.log("after"+res[0]);
    conn.release()
    console.log("res = "+res)
    if(res==null)
        return null;
    return res[0];
}
async function createSessionAsync(userId)
{
    const conn = await pool.connect();
    const uuid = uuidv4();

    const res = await conn.query('INSERT INTO session(session_id, id_user, timeLimit) ' +
        'VALUES($1,$2,CURRENT_TIMESTAMP+INTERVAL \'1 hour\');', [uuid,userId]);
    conn.release();
    return uuid;
}
async function deleteSessionAsync(userId)
{
    const conn = await pool.connect();
    const res = await conn.query('DELETE FROM session WHERE id_user = $1;',[userId]);
    conn.release();
}
async function getUserIdAsync(email,password)
{
    const conn = await pool.connect();
    //console.log("email:"+email+", password:"+password);
    const res = await conn.query('SELECT id_user FROM utilisateur WHERE email=$1 AND password=$2', [email,password]);
    conn.release();
    //console.log("res.rows.length:"+res.rows.length);
    if(res.rows.length!==1)
        return null;
    //console.log("id_user = "+id_user)
    return res.rows[0].id_user;
}
/*const getUserId =(email,password,callback)=>
{
    getUserIdAsync(email,password).then(res=>
    {
        callback(null,res)
    }).catch(error=>{
        console.log(error);
        callback(error,null);
    })
}*/
async function getSessionTokenAsync(email, password) {
    try {
        userId = await getUserIdAsync(email,password)
        console.log("id_user:"+userId);
        if(userId==null)
        {
            console.log("id_user is null");
            return null;
        }

        /*session = await getSessionAsync(userId);
        if(session!=null)
        {
            console.log("deleting session")
            //await deleteSessionAsync(userId);
        }*/
        await deleteSessionAsync(userId);
        uuid = await createSessionAsync(userId);
        console.log("uuid = "+uuid)
        return uuid;
    } catch (error) {
        console.error('Error in getLoginToken:', error);
        throw error;
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
    if(res.rows.length!=1)
    {
        console.log("different than 1 row :: "+right_name)
        return false;
    }
    console.log("rows:"+res.rows)
    console.log("id : "+res.rows[0].id)
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
    const timeOK = timeQuerry.rows[0].ok;
    console.log("timeOk :"+timeOK)
    if(!timeOK)
        return false;

    console.log()
    const res = await conn.query(
        "SELECT $1 IN (\n" +
        "SELECT role_droits.id_droit FROM session\n" +
        "LEFT JOIN utilisateur ON utilisateur.id_user = session.id_user\n" +
        "LEFT JOIN role_droits ON role_droits.id_role = utilisateur.id_role\n" +
        "WHERE session_id = $2)\n" +
        ";",[right_id,session_id])
    conn.release()
    return res.rows[0];
}

module.exports = {
    getLoginToken:getLoginToken,
    checkRight_by_id:checkRight_by_id,
    checkRight_by_name:checkRight_by_name
}