const express = require("express");
const router = express.Router();
const controlleur = require('../controllers/users.js');

/*fichier qui sert pour l'authentification */
const auth = require('../auth.js');

router.get('/test', controlleur.test);

/* Requete d'insertion d'un nouveau utilisateur avec un mail unique*/
router.post('/insert/user',auth, controlleur.insertuser);

/*Requete de login revoit un token de type bearer token */
router.post('/login',  controlleur.login);

/*Requete d'affichage de tous les utilisateurs*/
router.get('/getusers', controlleur.getusers);

module.exports = router;