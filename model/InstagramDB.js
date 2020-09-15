const knex = require("./connection"); 

// 1
let sign_in = (data) => {
    return knex("user").insert(data)
}

// 2
let login_Email = (Email) => {
    return knex.select('user.Email').from('user').havingIn('user.Email',Email)
};

let login_Password = (Password) => {
    return knex.select('user.Password').from('user').havingIn('user.Password',Password)
};

// 3
let dataAll_list = () => { 
    return knex.select('*').from('user')
}

module.exports = {sign_in,login_Email,login_Password,dataAll_list}
