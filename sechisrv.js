const express = require('express')
const fetchWrapper = require('./fetch_wrappers')
const fsWrapper = require('./fs_wrapper')
const app = express()
const port = 4002

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/:amount", (req, res) => {
    const amount = parseInt(req.params.amount)

    if (amount >= 1 && amount <= 10) {
        fsWrapper.read("secret-history.json")
            .then(content => JSON.parse(content))
            .then(data => {
                res.send(JSON.stringify(data.secrets.slice(0, amount)))
            })
    } else {
        res.sendStatus(404)
    }
})

setInterval(function () {
    Promise.all([
        fetchWrapper.getData("http://localhost:4000"),
        fetchWrapper.getData("http://localhost:4001/secret")
    ])
        .then(data => {
            const time = data[0].time
            const secret = data[1].secret
            const newLine = {
                time: time,
                secret: secret
            }
            pushToPile(newLine)
        })
        .catch(e => {
            console.error(e)
            pushToPile("ERROR")
        })
}, 5000)


function pushToPile(newLine) {
    fsWrapper.read("secret-history.json")
        .then(content => JSON.parse(content))
        .then(data => {
            data.secrets.unshift(newLine)

            if (data.secrets.length > 10) {
                data.secrets.pop()
            }

            fsWrapper
                .write("secret-history.json", JSON.stringify(data))
                .catch(e => console.error(e))
        })
}


app.listen(port, () => console.log(`Secret server history listening on port ${port}!`))
