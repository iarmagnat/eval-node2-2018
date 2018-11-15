function encrypt(str) {
    return str.split("").reverse().join("")
}

function decrypt(str) {
    return encrypt(str)
}

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt,
}