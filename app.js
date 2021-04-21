const express = require("express");
const bodyParser = require("body-parser");
const app = express();
/*router des requette users*/
const routerusers = require('./routes/users.js');
const routercouse = require('./routes/course.js');

const knex = require("./log-db.js");


/*headers de la requette */
app.use((req, res, next) => {
    /* acceder a l api depuis n importe quelle origine*/
    res.setHeader('Access-Control-Allow-Origin', ['*']);
    /* ajouter les headers mentionnés aux requêtes envoyées vers notre API */
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    /* envoyer des requette avec get post put delete patch options */
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    //res.setHeader('Access-Control-Expose-Headers', 'typeusers');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(bodyParser.urlencoded({ extended: false }));

/** 2 type de users prof , users */

/**Router qui regroupe toute les route des users /test, /login, /getusers, /insert/user */
app.use('/auth', routerusers);

/**Router qui regroupe toute les route des course /test, /insert/course, /insert/question, /delete/course/:id ,/courses ,/coursesprof/:id*/
app.use('/course', routercouse);

app.get('/',(req, res, next)=>{
    return res.status(200).json({
        statusCode: 200,
        message:"Bonjour bienvenue l'API WeLearn du groupe 10"
    })
})

app.post('/insert/stat', async (req, res, next)=>{
    try {
        course = await knex('stat').insert({
            id_users: req.body.id_users,
            id_course: req.body.id_course,
            resultat: req.body.resultat,
            nb_test: req.body.nb_test,
        });
    } catch (error) {
        console.log(req.body);
        return res.status(400).json({
            statusCode: 400,
            message:error,
        });
    }
    console.log(req.body);

    return res.status(201).json({
        statusCode: 201,
        message:"Stat du cour 1 crée !!!!"
    })
});

module.exports = app;