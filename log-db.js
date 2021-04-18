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

module.exports = knex;