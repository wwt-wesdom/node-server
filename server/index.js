
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const api = require('./api');
// const redisServer = require('./redisServer/index');
const app = express();

/*const redis = require('redis');
let client = redis.createClient();
// console.log(client);
client.on('ready',function () {
  console.log('ready');
});*/

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));


// app.use(api);


app.use((req, res, next) => {
  console.log(req.originalUrl);
  const url = req.originalUrl;
  if (url.indexOf('.json') < 0){
    res.status(401).end();
  }else {
    next()
  }
});
app.use(api);

// 监听服务端口
app.listen(8086);

console.log('success');