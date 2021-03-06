const express = require("express");
const Instagram = express();
const InstagramDB = require("../model/InstagramDB")
var jwt = require('jsonwebtoken');

// API user
// 1 Create now user + log user in
Instagram.post("/sing",(req,res)=>{
    var data = {
        First_Name : req.body.First_Name,
        Last_Name : req.body.Last_Name,
        Email : req.body.Email,
        Password : req.body.Password,
        Image : req.body.Image
    }
    InstagramDB.sign_in(data)
    .then(()=>{
        res.send("inserted data................")
    }).catch((err)=>{
        res.send(err)
        console.log(err);
    })
});

// 2 log user in
Instagram.post("/login",(req,res)=>{
    let Email = req.body.Email;
    let Password = req.body.Password;
    InstagramDB.login_Email(Email)
    .then((data)=>{
        // console.log(data)
        if(data.length==0){
            res.send('worng Email')
        }else{InstagramDB.login_Password(Password).then((data)=>{
            // console.log(data)
            if(data.length==0){
                res.send('wrong Password ')
            }else{
                let token = jwt.sign({"costomer":data},"zeba")
                    // console.log(token)
                    res.cookie(token)
                    res.send('..........login successful..........')
                }
            })
        }
    }).catch((err)=>{
        console.log(err);
    })
});

// 3 Retrieve list of all users
Instagram.get('/getalldata',(req,res) => {
    InstagramDB.dataAll_list()
    .then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })
});

// 4 Delete a user by user id
Instagram.delete('/deleteuser/:ID',(req,res) => {
    var ID = req.params.ID
    let alltoken = req.headers.cookie
    var token = alltoken.split('=')
    token = (token[token.length-2]).slice(11,500)
    jwt.verify(token,"zeba",(err,result)=>{
        var userID = result["costomer"][0]['ID']
        if (userID == ID){
            InstagramDB.deleteuser_data(ID)
            .then(() => {
                res.send('#....delete....#')
            }).catch((err) => {
                res.send(err)
            })
        }
        res.send("you can't access delete the data")
    })
});

// API Place
// 5 Create a new place
Instagram.post('/Createplace',(req,res) => {
    let alltoken = req.headers.cookie
    var token = alltoken.split('=')
    token = (token[token.length-2]).slice(11,500)
    jwt.verify(token,"zeba",(err,result)=>{
        var userID = result["costomer"][0]["ID"]
        var placedata = {
            user_ID : userID,
            Title : req.body.Title,
            Description : req.body.Description,
            Address : req.body.Address,
            Location : req.body.Location
        }
        InstagramDB.postdata(placedata)
        .then(() => {
            res.send("@.....insert.....@")
        }).catch((err) => {
            res.send(err)
        })
    })
});

// 6 update a place by ID
Instagram.put('/put/:ID',(req,res) => {
    var ID = req.params.ID
    let alltoken = req.headers.cookie
    var token = alltoken.split('=')
    token = (token[token.length-2]).slice(11,500)
    jwt.verify(token,"zeba",(err,result) => {
        var placeID = result["costomer"][0]['ID']
        if (placeID == ID){
            var updata = {
                Title : req.body.Title,
                Description : req.body.Description,
                Address : req.body.Address,
                Location : req.body.Location
            }
            InstagramDB.putdata(ID,updata)
            .then(() => {
                res.send('$.....update.....$')
            }).catch((err) => {
                res.send(err)
            })
        }
        res.send("you can't access update ID data")
    })
});

// 7 Retrieve list of all places for a given user id
Instagram.get('/user/:ID',(req,res) => {
    var ID = req.params.ID
    let alltoken = req.headers.cookie
    var token = alltoken.split('=')
    token = (token[token.length-2]).slice(11,500)
    jwt.verify(token,"zeba",(err,result)=>{
        var userID = result["costomer"][0]['ID']
        if (userID == ID){
            InstagramDB.getuserID(ID)
            .then((Response) => {
                res.send(Response)
            }).catch((err) => {
                res.send(err)
            })
        }
        res.send("you can't access get (user id) ID data")
    })
});

// 8 Get a specific place by place id
Instagram.get('/place/:ID',(req,res) => {
    var ID = req.params.ID
    let alltoken = req.headers.cookie
    var token = alltoken.split('=')
    token = (token[token.length-2]).slice(11,500)
    jwt.verify(token,"zeba",(err,result)=>{
        var placeID = result["costomer"][0]['ID']
        if (placeID == ID){
            InstagramDB.getplaceID(ID)
            .then((Response) => {
                res.send(Response)
            }).catch((err) => {
                res.send(err)
            })
        }
        res.send("you can't access get (place id) ID data")
    })
});

// 9 Delete a place by place id
Instagram.delete('/deleteplace/:ID',(req,res) => {
    var placeID = req.params.ID
    let alltoken = req.headers.cookie
    var token = alltoken.split('=')
    token = (token[token.length-2]).slice(11,500)
    jwt.verify(token,"zeba",(err,result)=>{
        var userID = result["costomer"][0]['ID']
        if (userID == placeID){
            InstagramDB.delete_data(placeID)
            .then(() => {
                res.send('!.....delete......!')
            }).catch((err) => {
                res.send(err)
            })
        }
        res.send("you can't access delete the data")
    })
});

// Get a specific user by search
Instagram.get('/getsearch/:search', (req,res) => {
    var search = req.params.search
    InstagramDB.get_search(search)
    .then((Response) => {
        let allsearch = {
            First_Name : Response[0]["First_Name"],
            Last_Name : Response[0]["Last_Name"],
            Email : Response[0]["Email"],
            Image : Response[0]["Image"],
            Title : Response[0]["Title"],
            Description : Response[0]["Description"],
            Address : Response[0]["Address"],
            Location : Response[0]["Location"]
        }
        res.send(allsearch)
    }).catch((err) => {
        res.send(err)
    })
});

module.exports = Instagram