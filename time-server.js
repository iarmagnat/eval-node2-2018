const express = require('express')
const moment = require('moment')
const app = express()
const port = 4000

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req, res) => {
    const time = moment().format("HH-mm-ss")

    if (req.accepts("html")) {
        res.send(`
<div style="display: flex; height: 100vh; width: 100vw; color: blue; align-items: center; justify-content: center;">
    <p>${time}</p>
</div>
        `)
    } else if (req.accepts("json")) {
        res.send(JSON.stringify({
            time: time,
        }))
    }
})


app.listen(port, () => console.log(`Time server listening on port ${port}!`))
