const express = require('express');
var bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json())

const Instagram = require("./controller/Instagram")
app.use("/",Instagram)

app.listen(8000, () => {
    console.log("server is listening 7000.........")
});


// function LetterCountI(str) { 

//     str.toLowerCase();
  
//     var arr = str.split(" ");
  
//     var count = 0;
//     var data = "-1";
  
//     for (var i = 0; i < arr.length; i++) {
//      for (var a = 0; a < arr[i].length; a++) {
//        var countNew = 0;
//        for (var b = a + 1; b < arr[i].length; b++) {
//          if(arr[i][a] === arr[i][b])
//             countNew += 1;
//        }
//        if (countNew > count) {
//          count = countNew;
//          data = arr[i];
//        }
//      }
//      return data;
//     }
//   }  
// console.log(LetterCountI("No words"))



// const https = require('https');
// https.get('https://coderbyte.com/api/challenges/json/age-counting', (resp) => {
// let data = '';
// resp.on('data', (chunk) => {
//     data += chunk;
//     });
//     resp.on('end', () => {
//         const dat = JSON.parse(data);
//     //   console.log(dat);
//         const store =  dat["data"]
//         const sp = store.split(" ");
//         var cont = 0
//         for (let i = 1; i < sp.length-1; i++ ){
//             let a = sp[i].split("=")
//             let b = a[1].split(",");
//             if(b[0] >= 50){
//                 cont = cont + 1
//                 console.log(sp[i-1])
//                 console.log(sp[i])
//                 console.log("===================")
//             }
//         }
//         console.log(cont)
//     });
// })