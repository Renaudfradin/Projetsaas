/*librairies qui sert a cripter je l'utiliser pour cripter le mdp*/
const bcrypt = require("bcrypt");
/*librairies qui sert a generer des token */
const jsonwebtoken = require("jsonwebtoken");
/*/** connexion DB */
const knex = require('../log-db.js');

/* Requete d'insertion d'un nouveau utilisateur avec un mail unique est envoie dd'un mail lors de l inscription*/
exports.insertuser = async (req, res, next)=>{
    let usermail = [];
    try {
      usermail = await knex('users').where({
            email: req.body.email
      });  
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: 'Internal Server Error',
            errors:[{
              message:'Erreur interne du serveur.1ccc',
            }],
        });
    }
    if (usermail.length == 0) {
        try {
            users = await knex('users').insert({
                id_users: req.body.id_users,
                email: req.body.email,
                passwords: bcrypt.hashSync(req.body.passwords, bcrypt.genSaltSync(10)),
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

        const mailjet = require ('node-mailjet')
        .connect('bec04d2c048053d48f6a7cd19a218daf', '83b5722c1d9f9f56cc8e21539901dbed')
        const request = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
          "Messages":[
            {
              "From": {
                "Email": "renaud.fradin@hetic.net",
                "Name": "RenaudF"
              },
              "To": [
                {
                  "Email": req.body.email,
                  "Name": req.body.firstname
                }
              ],
              "Subject": "Inscription",
              "TextPart": "Bienvenue",
              "HTMLPart": "<h3>Bienvenue"+ req.body.firstname + " " + req.body.lastname + "</h3><br><p>Votre email : "+ req.body.email +"<p/>",
              "CustomID": "AppGettingStartedTest"
            }
          ]
        })
        request
          .then((result) => {
            console.log(result.body)
          })
          .catch((err) => {
            console.log(err.statusCode)
          })

        return res.status(201).json({
            statusCode: 201,
            message:"Compte crée !!!!!!!!!!!"
        })
        
    } else {
        return res.status(400).json({
            statusCode: 400,
            message:"Email deja pris mettre un autre email !!!!!!!!!!!"
        })
    } 
};

/*Requete d'affichage de tous les utilisateurs*/
exports.getusers = async (req, res, next)=>{
  let users = [];
  try {
  users = await knex.select(['id_users','email','passwords','firstname','lastname','cour_suivi','cour_enseigne','type_user']).from('users');
  } catch (error) {
      console.log('An error occured: ', error);
      return res.status(400).json({
          statusCode: 400,
          message: 'Bad Request',
          errors:[{
              message:'failed to query database',
          }],
      });
  }
  return res.status(200).json({
      statusCode: 200,
      message: 'succcesful / OK',
      User: users,
  });
};

/*Requete de login revoit un token de type bearer token */
exports.login =  async (req, res, next)=>{
    let userlog = [];
    try {
      userlog = await knex('users').where({
            email: req.body.email
      });  
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: 'Internal Server Error',
            errors:[{
              message:'Erreur interne du serveur.1',
            }],
        });
    }

    if (userlog == 0) {
        return res.status(401).json({
            statusCode: 401,
            message: 'Unauthorized',
            errors:[{
              message:'Une authentification est nécessaire pour accéder à la ressource. compte non trtouver',
            }],
          });
    } else {
      const match = await bcrypt.compare(req.body.passwords, userlog[0].passwords);
      console.log(match);
      if (match) {
        return res.status(200).set("typeusers",'test').json({
          statusCode: 200,
          message: 'succcesful / OK',
          userId: userlog[0].id,
          "typeusers": userlog[0].type_user,
          token: jsonwebtoken.sign(
            { userId: userlog[0].id }, //truc a encoder
            'RANDOM_TOKEN_SECRETRANDOM_TOKEN_SECRETRANDOM_TOKEN_SECRETRANDOM_TOKEN_SECRET',  //cle d'encodage
            { expiresIn: '1h' } //dure du token
          )
        });
      }else{
        return res.status(401).json({
          statusCode: 401,
          message: 'Unauthorized',
          errors:[{
              message:'Une authentification est nécessaire pour accéder à la ressource. npm faux',
          }]
       })
      };
    }
};


exports.test = (req, res, next)=>{
  res.status(200).json({ 
      statusCode: 200,
      message: "requette evonyer users!!/OK",
  })
}