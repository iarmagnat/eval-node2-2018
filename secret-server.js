const express = require('express')
const fs = require("fs-extra")
const bodyParser = require("body-parser")
const crypt = require("./crypt")
const fsWrapper = require("./fs_wrapper")
const app = express()
const port = 4001

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())

app.get('/secret', function (req, res) {
    fsWrapper.read("secret.txt")
        .then(content => crypt.decrypt(content))
        .then(function (value) {

            if (req.accepts("html")) {
                res.send(value)
            } else if (req.accepts("json")) {
                res.send(JSON.stringify({
                    secret: value
                }))
            }

        })
})

app.put('/secret', function (req, res) {
    console.log(req.body.secret)
    if (req.body.secret) {
        const secret = req.body.secret
        fsWrapper.write("secret.txt", crypt.encrypt(secret))
            .then(status => {
                res.send(JSON.stringify(status))
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    } else {
        res.sendStatus(400)
    }
})

app.listen(port, function () {
    console.log(`Secret server listening on port ${port}!`)
})
