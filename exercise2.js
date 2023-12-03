const crypto = require("crypto");

const id = crypto.randomBytes(64).toString("hex");
console.log(id);