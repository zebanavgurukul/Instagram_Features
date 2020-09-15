const knex = require("./connection"); 

// 1 Sign_in
let sign_in = (data) => {
    return knex("user").insert(data)
}

// 2 login
let login_Email = (Email) => {
    return knex.select('*').from('user').havingIn('user.Email',Email)
};

let login_Password = (Password) => {
    return knex.select('*').from('user').havingIn('user.Password',Password)
};

// 3 list of all users
let dataAll_list = () => { 
    return knex.select('*').from('user')
};

// 4 Create a new place
let getuser = (ID) => {
    return knex.select('*').from('user').where('user.ID',ID)
};

let postdata = (placedata) => {
    return knex('place').insert(placedata)
};

// 5 update a place by ID
let putdata = (ID,updata) => {
    return knex('place').update(updata).where('ID',ID)
};

module.exports = {sign_in,login_Email,login_Password,dataAll_list,getuser,postdata,putdata}
