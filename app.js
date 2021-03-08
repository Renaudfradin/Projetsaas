const express = require("express");
const bodyParser = require("body-parser");
const app = express();

/** connexion DB */
const knex = require("knex")({
    client :"pg",
    connection:{
        connectionString: 'postgres://ycpjfrsckfldpd:90fc378b2b129d9a3ff59cde6192b89ab247904463de7e4268fd5aa4c8d33805@ec2-54-78-127-245.eu-west-1.compute.amazonaws.com:5432/d1r87ic6jllnsv',
        ssl:{
            rejectUnauthorized: false,
        }
    },
});

/*headers de la requette */
app.use((req, res, next) => {
    /* acceder a l api depuis n importe quelle origine*/
    res.setHeader('Access-Control-Allow-Origin', '*');
    /* ajouter les headers mentionnés aux requêtes envoyées vers notre API */
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    /* envoyer des requette avec get post put delete patch options */
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(bodyParser.urlencoded({ extended: true }));

/* requette de test get qui retourne un status 200 OK */
app.get('/test',(req, res, next)=>{
    res.status(200).json({ 
        statusCode: 200,
        message: "requette evonyer !!/OK",
    })
})

app.post('/insert/user', async (req, res, next)=>{
    try {
        users = await knex('users').insert({
            id_users: req.body.id_users,
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            cour_suivi: null,
            cour_enseigne: null, 
            type_user: req.body.type_user
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
        message:"Compte crée !!!!!!!!!!!"
    })
});

/* Requete d'insertion d'un nouveau cours */
app.post('/insert/course', async (req, res, next)=>{
    try {
        course = await knex('course').insert({
            id_course: req.body.id_course,
            id_users: req.body.id_users,
            course_name: req.body.course_name,
            category: req.body.category,
            description: req.body.description
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
        message:"Cour crée !!!!!!!!!!!"
    })
});

/* Requete d'insertion d'une nouvelle question */
app.post('/insert/question', async (req, res, next)=>{
    try {
        course = await knex('question').insert({
            id_question: req.body.id_question,
            id_course: req.body.id_course,
            question: req.body.question,
            answer: req.body.answer,
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
        message:"Question crée !!!!!!!!!!!"
    })
});

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