const knex = require("./connection"); 

module.exports = knex;

knex.schema.hasTable('user').then((exists) => {
    if (!exists) {
        return knex.schema.createTable('user', (table) => {
            table.increments('ID')
            table.string('First_Name')
            table.string('Last_Name')
            table.string('Email')
            table.string('Password')
            table.string('Image')
        })
        .catch((err) => {
            console.log(err,"There is some err while writing the quety")
        })
    }
    return console.log('table is created!')
});

knex.schema.hasTable('place').then((exists) => {
    if (!exists) {
        return knex.schema.createTable('place', (table) => {
            table.increments('ID')
            table.integer("user_ID").unsigned()
            table.foreign("user_ID").references("user.ID")
            table.string('Title')
            table.string('Description')
            table.string('Address')
            table.string('Location')
        })
        .catch((err) => {
            console.log(err,"There is some err while writing the quety")
        })
    }
    return console.log('table is created!')
});