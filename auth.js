const jsonwebtoken = require("jsonwebtoken");

module.exports = (req, res, next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodetoken = jsonwebtoken.verify(token, 'RANDOM_TOKEN_SECRETRANDOM_TOKEN_SECRETRANDOM_TOKEN_SECRETRANDOM_TOKEN_SECRET');
        const userID = decodetoken.userID;
        if (req.body.userID && req.body.userID == userID) {
            throw 'utilisateur non valide';
        }else{
            next();
        }
    } catch (error) {
        res.status(401).json({
            statusCode: 401,
            errors:[{
                message:'utilisateur non valide ou token expirer',
            }],
        })
    }
}