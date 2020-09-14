const knex = require("./connection"); 

module.exports = knex;

knex.schema.hasTable('user').then((exists) => {
    if (!exists) {
        return knex.schema.createTable('user', (table) => {
            table.increments('ID')
            table.string('Name')
            table.string('Email').unique();
            table.string('Password').unique();
            table.string('SuperAdmin')
            table.string('Accessible_by_SuperAdmin')
            table.string('Admin')
        })
        .catch((err) => {
            console.log(err,"There is some err while writing the quety")
        })
    }
    return console.log('table is created!')
});