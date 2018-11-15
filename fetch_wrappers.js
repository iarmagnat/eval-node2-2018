const fetch = require('node-fetch')

function getData(url) {
    return fetch(url, {
        headers: {
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
}

function putData(url, data) {
    return fetch(url, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

module.exports = {
    getData: getData,
    putData: putData
}
