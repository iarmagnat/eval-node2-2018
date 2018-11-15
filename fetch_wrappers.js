const fetch = require('node-fetch')

function getData(url) {
    return fetch(url, {
        headers: {
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
}

module.exports = {
    getData: getData,
}
