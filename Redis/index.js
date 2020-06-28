const redis = require("redis");
const util = require("util");

const client = redis.createClient(19080, process.env.REDIS_URL);
client.auth(process.env.REDIS_PASSWORD);
const get = util.promisify(client.get).bind(client);
const set = util.promisify(client.set).bind(client);
const expire = util.promisify(client.expire).bind(client);
const hmset = util.promisify(client.hmset).bind(client);
const hmget = util.promisify(client.hmget).bind(client);

module.exports = { client, get, set, hmset, hmget, expire };
