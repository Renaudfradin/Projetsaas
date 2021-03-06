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
app.use(bodyParser.urlencoded({ extended: false }));

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
            email: "jacky@gamil",
            password: "0000",
            firstname: "jacky",
            lastname: "jack",
            cour_suivi: null,
            cour_enseigné: null, 
            type: "users"
        });
    } catch (error) {
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


module.exports = app;