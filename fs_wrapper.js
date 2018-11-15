const fs = require('fs-extra')

function write(file, content){
    return new Promise(function (resolve, reject) {
        fs.writeFile(file, content, "utf8", function (err) {
            if (err) {
                reject(new Error("error in fs.writeFile"))
            } else {
                resolve(content)
            }
        })
    })
}

function read(file) {
    return new Promise(function (resolve, reject) {
        fs.readFile(file, "utf8", function (err, content) {
            if (err && err.code !== "ENOENT" && err.code) {
                reject(new Error("error in fs.readFile"))
            } else {
                resolve(content)
            }
        })
    })
}

module.exports = {
    write: write,
    read: read
}
