const express = require('express')
const fs = require("fs-extra")
const bodyParser = require("body-parser");
const moment = require('moment')
const app = express()
const port = 8000

const tplpath = __dirname + "/public/templates/"

app.use(bodyParser.json());
app.use(
  '/client',
  express.static(__dirname + '/public')
)

app.get("/", function(req, res){
    res.sendFile(tplpath+"index.html")
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
