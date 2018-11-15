const express = require('express')
const wrappers = require('./fetch_wrappers')
const app = express()
const port = 4002

app.get("/", (req, res) => {
    wrappers.getData("http://localhost:4000")
        .then(data => {
            res.send(data)
        })
})

app.listen(port, () => console.log(`Secret server history listening on port ${port}!`))
