const redis = require('redis');

const  redisClient = redis.createClient(1721,'127.0.0.1',{db:1},{no_ready_check: true});

module.exports = {redisClient};
