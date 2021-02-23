const express = require("express");
const bodyParser = require("body-parser");
const app = express();

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

/* requette de test get qui retourne un status 200 OK */
app.get('/test',(req, res, next)=>{
    res.status(200).json({ 
        statusCode: 200,
        message: "requette evonyer !!/OK",
    })
})


module.exports = app;