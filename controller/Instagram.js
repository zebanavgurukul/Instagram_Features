const express = require("express");
const Instagram = express();
const InstagramDB   = require("../model/InstagramDB")
var jwt = require('jsonwebtoken');

// 1
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
        res.send("inserted data ")
    }).catch((err)=>{
        res.send(err)
        console.log(err);
    })
});

// 2
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
                    res.send('loing successful')
                }
            })
        }
    }).catch((err)=>{
        console.log(err);
    })
});

// 3
Instagram.get('/getalldata',(req,res) => {
    InstagramDB.dataAll_list()
    .then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })
});

module.exports = Instagram
