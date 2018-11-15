const express = require('express')
const fs = require("fs-extra")
const bodyParser = require("body-parser");
const app = express()
const port = 4001

app.use(bodyParser.json());

const moment = require('moment')

const tpl = "./public/templates/"
app.get('/secret', function (req, res) {
  readSecretPromise().then( function(value) {
    console.log(value)
    res.send(value)
  })
})

app.put('/secret', function (req, res) {
  let secret = req.body.secret
  console.log(String(secret))
  writeSecretPromise(String(secret))
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})


function writeSecretPromise(secret){
  return new Promise(function(resolve, reject) {
    fs.writeFile("secret.txt", secret.split("").reverse().join(""), "utf8", function(err){
      if( err ){
        reject( new Error( "error in fs.writeFile") )
      }
    })
  })
}

function readSecretPromise(){
  return new Promise(function(resolve, reject) {
    fs.readFile("secret.txt", "utf8", function(err, contents){
      if( err && err.code !== "ENOENT" && err.code  ){
        reject( new Error( "error in fs.readFile" ) )
      } else {
        let resp = contents.split("").reverse().join("")
        resolve(resp)
      }
    })
  })
}
