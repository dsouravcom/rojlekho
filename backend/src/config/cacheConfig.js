const NodeCache = require("node-cache");

const tokenCache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache

module.exports = tokenCache;