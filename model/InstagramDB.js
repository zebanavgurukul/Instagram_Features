const knex = require("../connection"); 

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

// 4 Delete a user by user id
let deleteuser_data = (ID) => {
    return knex('user').where("user.ID",ID).del()
};

// 5 Create a new place
let postdata = (placedata) => {
    return knex('place').insert(placedata)
};

// 6 update a place by ID
let putdata = (ID,updata) => {
    return knex('place').update(updata).where('ID',ID)
};

// 7 Retrieve list of all places for a given user id
let getuserID = (user_ID) => {
    return knex('user')
    .select('place.Title', 'Description','Address','Location','user.Image')
    .join('place','user.ID','=','place.ID')
    .where('place.user_ID',user_ID)
};

// 8 Get a specific place by place id
let getplaceID = (ID) => {
    return knex.select('place.Title', 'Description','Address','Location').from('place').where('place.ID',ID)
};

// 9 Delete a place by place id
let delete_data = (ID) => {
    return knex('place').where("place.ID",ID).del()
};

// Get a specific user by search
let get_search = (search) => {
    return knex("user")
    .join("place","user.ID","=","place.ID")
    .select("*")
    .where('First_Name','like',  '%' +search+ '%')
}

module.exports = {sign_in,login_Email,login_Password,dataAll_list,deleteuser_data,postdata,putdata,getuserID,getplaceID,delete_data,get_search}
