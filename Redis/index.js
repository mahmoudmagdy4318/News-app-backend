const redis = require("redis");
const client = redis.createClient(19080, process.env.REDIS_URL);
client.auth(process.env.REDIS_PASSWORD);
module.exports = client;
