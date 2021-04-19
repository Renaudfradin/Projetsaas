/** connexion DB */
const knex = require('../log-db.js');

/* Requete d'insertion d'un nouveau cours , il faut etre connecter et il faut avoir le type_users prof*/
exports.insertcourse = async (req, res, next)=>{
    let typeuser = [];
    try {
        typeuser = await knex('users').where({
            type_user: "prof"
        })
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: 'Internal server errors',
            errors:[{
                message:'Erreur interne du serveur.cour'
            }]
        })
    }

    if (typeuser.length != 0) {
        let usersid = [];
        try {
            usersid = await knex('users').where({
                id_users: req.body.id_users
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: 'Internal server errors',
                errors:[{
                    message:'Erreur interne du serveur.cour'
                }]
            })
        }

        if (usersid != 0) {
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
        }else{
            return res.status(400).json({
                statusCode: 400,
                message:"L'utilisateur n'existe pas !!!!!!!!!!!"
            })
        }
    } else {
        return res.status(400).json({
            statusCode: 400,
            message:"Tu n'est pa un professeur !!!!!!!!!!!"
        })
    }  
};

/* Requete de supression d'un cours , il faut etre connecter et  il faut avoir le type_users prof*/
exports.deletecourse = async (req, res, next)=>{
    let typeuser = [];
    try {
        typeuser = await knex('users').where({
            type_user: "prof"
        })
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: 'Internal server errors',
            errors:[{
                message:'Erreur interne du serveur.cour'
            }]
        })
    }

    if (typeuser.length != 0){
        let coursid = [];
        try {
            coursid = await knex('course').where({
                id_course: req.params.id
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: 'Internal server errors',
                errors:[{
                    message:'Erreur interne du serveur.cour'
                }]
            })
        }
        
        if (coursid != 0) {
            try {
                perso = await knex('course').where('id_course',req.params.id).del();
            } catch (error) {
                return res.status(404).json({
                    statusCode: 400,
                    message: 'Bad Request',
                    errors:[{
                        message:'failed to query database',
                    }],
                });
            }
                return res.status(200).json({
                statusCode: 200,
                message: 'succcesful / OK'
            });
        } else {
            return res.status(400).json({
                statusCode: 400,
                message:"Le cour n'existe pas !!!!!!!!!!!"
            })
        }
    }else{
        return res.status(400).json({
            statusCode: 400,
            message:"Tu n'est pa un professeur !!!!!!!!!!!"
        })
    }
};

/* Requete d'insertion d'une nouvelle question , il faut etre connecter et il faut avoir le type_users prof*/
exports.insertquestion = async (req, res, next)=>{
    let typeuser = [];
    try {
        typeuser = await knex('users').where({
            type_user: "prof"
        })
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: 'Internal server errors',
            errors:[{
                message:'Erreur interne du serveur.cour'
            }]
        })
    }

    if (typeuser.length != 0){
        let coursid = [];
    try {
        coursid = await knex('course').where({
            id_course: req.body.id_course
        })
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: 'Internal server errors',
            errors:[{
                message:'Erreur interne du serveur.ques'
            }]
        })
    }
    
    if (coursid.length != 0) {
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
        } else {
            return res.status(400).json({
                statusCode: 400,
                message:"Le cour n'existe pas !!!!!!!!!!!"
            })
        }
    }else{
        return res.status(400).json({
            statusCode: 400,
            message:"Tu n'est pa un professeur !!!!!!!!!!!"
        })
    }
};

/* Requete d'affichage des cours , il faut etre connecter*/
exports.courses = async (req, res, next)=>{
    let course = [];
    try {
        course = await knex.select(['course_name','category','description']).from('course');
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
        Cours: course,
    });

}


/* Requete d'affichage des cours celon le prof connecter, il faut etre connecter*/
exports.coursesprof = async (req, res, next)=>{
    let idusers = [];
    try {
        idusers = await knex('users').where({
            id_users: req.params.id
        })
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: 'Internal server errors',
            errors:[{
                message:'Erreur interne du serveur.cour'
            }]
        })
    }

    if (idusers.length != 0) {
        let course = [];
        try {
            course = await knex('course').where({
                id_users: req.params.id
            })
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: 'Internal server errors',
                errors:[{
                    message:'Erreur interne du serveur.cour'
                }]
            })
        }

        if (course.length == 0) {
            return res.status(400).json({
                statusCode: 400,
                message: "Tu na pa de cour ",
            });
        } else {
            return res.status(200).json({
                statusCode: 200,
                message: 'succcesful / OK',
                Cours: course,
            });
        }
    } else {
        return res.status(400).json({
            statusCode: 400,
            message: "Le professeur n'existe pas",
        });
    }


    
}

/* Requette de test get qui retourne un status 200 OK */
exports.test = (req, res, next)=>{
    res.status(200).json({ 
        statusCode: 200,
        message: "requette evonyer course !!/OK",
    })
};
