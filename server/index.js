
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const api = require('./api');
// const redisServer = require('./redisServer/index');
const expressJWT = require('express-jwt');
const app = express();
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
/*const redis = require('redis');
let client = redis.createClient();
// console.log(client);
client.on('ready',function () {
  console.log('ready');
});*/

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

const redisOptions = {
  host: '127.0.0.1',
  port: 1721,
  profix: 'node:wwt:session',
  db: 1,
  ttl: 3600,
  logErrors: true,
};

app.use(session({
  store: new RedisStore(redisOptions),
  name: 'sid',
  secret: 'wwt',
  resave: false,
  saveUninitialized: false,
}));

app.use(expressJWT({
  secret: 'wwt'
}));

app.use((err,req, res, next) => {
  console.log(req.originalUrl);
  const url = req.originalUrl;
  if (url.indexOf('.json') < 0){
    res.status(401).end();
  }else if (err){
    res.status(401).send(err.message);
  }else {
    next()
  }
});
app.use(api);

// 监听服务端口
app.listen(8086);

console.log('success');