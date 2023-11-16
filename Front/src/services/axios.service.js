import axios from 'axios'

/* Explications :

Un agent axios permet de faire des requête asynchrones à un serveur.

Si l'appel réussi, l'agent axios renvoie un objet représentant la réponse (NB: dans les fonction ci-dessous, on
met cet objet dans une variable nommée response). Cet objet contient un champ data, qui contient les données renvoyées
par l'API. Comme l'API renvoie toujours des données au format : {error: err_number, stats: http_status, data: ... }
on a donc :
   - response.data.error : permet de savoir s'il y a une erreur dans la requête
   - response.data.data : contient soit un message d'erreur, soit les données demandées.

En revanche, si l'appel à axios échoue, cela provoque la levée d'une exception avec un objet la
représentant (NB : variable nommée err dans le catch). Il y a 3 cas d'erreurs :
   - le serveur http renvoie un status != 2XX (par ex 404, 500). C'est par exemple le cas en cas de route invalide,
   quand les données demandées n'existent pas, ...
   - le serveur ne répond pas, malgré le fait que la requête soit partie,
   - impossible d'envoyer la requête
Ces trois cas sont traités par une unique fonction handleError().

 */


// creation d'un agent axios, avec une config. pour atteindre l'API
const axiosAgent = axios.create({
  baseURL: 'http://localhost:3000/api'
});

function handleError(serviceName, err) {
  if (err.response) {
    // la requête a été reçue par le serveur mais celui-ci renvoie un status != 2XX, ce qui signifie
    // une erreur. Par exemple, il peut renovyer un status 404 pour dire que la ressource demandée n'existe pas.
    console.log("ERROR while calling SERVICE " + serviceName + ": " + JSON.stringify(err.response));
    // on retourne un objet qui a la même structure qu'une réponse normale sans erreur.
    // mais avec un champ data contenant le message d'erreur renvoyé par l'API
    return {
      data: {
        error: 1,
        data: err.response.data
      }
    };
  }
  else if (err.request) {
    // la requete a été envoyée mais aucune réponse reçue.
    console.log("NETWORK ERROR while calling SERVICE "+serviceName+ ": " + JSON.stringify(err.request));
    // on retourne un objet qui a la même structure qu'une réponse normale sans erreur.
    // mais avec un champ data contenant un message
    return {
      data: {
        error: 1,
        data: 'Le serveur est injoignable ou l\'URL demandée n\'existe pas'
      }
    };
  }
  else {
    // tout autre cas
    console.log("UNKNOWN ERROR while calling SERVICE "+serviceName);
    // on retourne un objet qui a la même structure qu'une réponse normale sans erreur.
    // mais avec un champ data contenant un message
    return {
      data: {
        error: 1,
        data: 'Erreur inconnue'
      }
    };
  }
}

/* Fonctions génériques pour envoyer des requêtes http

NB: ces fonctions n'échouent jamais et renvoient forcément un objet ayant la même structure que les données
renvoyées par l'API, même en cas d'erreur.
*/

/*
- uri est l'URI qui complète l'URL de base. Si on interroge une API  REST,
  cela correspond donc à route demandée, par ex /rpg/items/get
- name est un "surnom" de l'uri, pour les message de debug
 */
async function getRequest(uri, name) {
  let response = null
  try {
    response = await axiosAgent.get(uri)
  } catch (err) {
    // le catch se fait si le serveur répond avec une erreur type 4XX, 5XX, ou bien si le serveur est off
    // dans ce cas, on appelle la méthode pour traiter ces types d'erreurs et on met le résutlat dans response.
    response = handleError(name, err);
  }
  // on retourne les données dans response, qu'il y ait eu une erreur ou pas.
  return response.data;
}

// NB: pour une requête post/patch, les données associées à la requête sont transmises
// par axios sous la forme d'un objet JSON contenant ces données, et axios les transmet
// de façon compactée dans le "corps" de la requête (c.a.d. la partie body). Du côté serveur, il faut "analyser"
// le corps (donc utiliser le module body-parser) afin d'avoir le contenu de l'objet dans req.body.
// Dans la méthode ci-dessous, le paramètre data correspond à l'objet JSON
async function postRequest(uri, data, name) {
  let response = null
  try {
    response = await axiosAgent.post(uri, data)
  } catch (err) {
    // le catch se fait si le serveur répond avec une erreur type 4XX, 5XX, ou bien si le serveur est off
    // dans ce cas, on appelle la méthode pour traiter ces types d'erreurs
    response = handleError(name, err);
  }
  // on retourne les données dans response, qu'il y ait eu une erreur ou pas.
  return response.data;
}

async function patchRequest(uri, data, name) {
  let response = null
  try {
    response = await axiosAgent.patch(uri, data)
  } catch (err) {
    // le catch se fait si le serveur répond avec une erreur type 4XX, 5XX, ou bien si le serveur est off
    // dans ce cas, on appelle la méthode pour traiter ces types d'erreurs
    response = handleError(name, err);
  }
  // on retourne les données dans response, qu'il y ait eu une erreur ou pas.
  return response.data;
}

async function deleteRequest(uri, name) {
    let response = null
    try {
        response = await axiosAgent.delete(uri)
    } catch (err) {
        // le catch se fait si le serveur répond avec une erreur type 4XX, 5XX, ou bien si le serveur est off
        // dans ce cas, on appelle la méthode pour traiter ces types d'erreurs
        response = handleError(name, err);
    }
    // on retourne les données dans response, qu'il y ait eu une erreur ou pas.
    return response.data;
}

export {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
}

