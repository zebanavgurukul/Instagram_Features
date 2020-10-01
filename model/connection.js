// const dotenv = require('dotenv');
// dotenv.config();
const knex = require ("knex");

const connection = {
    client : "mysql",
    connection : {
        host: "127.0.0.1",
        user: "root",
        password: "*****************",
        database: "Instagram_Features"
    }
};
// console.log(connection)

module.exports = knex(connection);

