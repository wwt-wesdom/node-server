const redis = require('redis');
const client = redis.createClient();
client.on('ready',function () {
  console.log('ready');
});
module.exports = client;