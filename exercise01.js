const crypto = require("crypto");

const generateRandomId = () => {
  const id = crypto.randomBytes(32).toString("hex");
  console.log(`Generated ID: ${id}`);
};

module.exports = generateRandomId;