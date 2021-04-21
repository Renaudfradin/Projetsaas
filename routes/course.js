const express = require("express");
const router = express.Router();
const controlleur = require('../controllers/course.js');

/*fichier qui sert pour l'authentification */
const auth = require('../auth.js');

/* Requette de test get qui retourne un status 200 OK */
router.get('/test', controlleur.test);

/* Requete d'insertion d'un nouveau cours , il faut etre connecter et il faut avoir le type_users prof*/
router.post('/insert/course', auth, controlleur.insertcourse);

/* Requete d'insertion d'une nouvelle question , il faut etre connecter et il faut avoir le type_users prof*/
router.post('/insert/question', auth, controlleur.insertquestion);

/* Requete de supression d'un cours , il faut etre connecter et il faut avoir le type_users prof*/
router.delete('/delete/course/:id', auth, controlleur.deletecourse);

/* Requete d'affichage des cours , il faut etre connecter*/
router.get('/courses', auth, controlleur.courses);

/* Requete d'affichage des cours celon le prof connecter, il faut etre connecter*/
router.get('/coursesprof', auth, controlleur.coursesprof);

/* Requete de modifications d'un cours celon le cour selectionner et il faut etre connecter*/
router.put('/updatecourse/:id', auth, controlleur.updatecourse);

module.exports = router;