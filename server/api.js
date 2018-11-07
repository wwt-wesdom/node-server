const express = require('express');
const router = express.Router();
const utils = require('./utils');
router.get('/api/wwt.json', (req,res) => {
  res.send({
    data:[
      {
        one:'data1'
      },
      {
        two:'data2'
      }
    ],
    status:true,
    msg:'成功！'
  });
});

router.post('/api/login.json',(req,res) => {
  console.log('query' + req.query.phoneNumber);
  console.log('body' + req.body.phoneNumber);
  if (!req.body.phoneNumber || !req.body.password){
    res.send({
      status: false,
      msg: '用户名或密码缺失'
    })
  }else {
    res.send({
      status: true,
      msg: '登录成功'
    })
  }
});

router.get('/api/ali-token.json', async (req, res) => {
  try {
    const tokenFromAli = await utils.getTokenFromAliSts();
    res.send(tokenFromAli.Credentials);
    /*
    // const isExists = await utils.isExistsFromRedis('aliToken');
    if (isExists) {
      // const tokenFromRedis = await utils.getDataFromRedis('aliToken');
      // res.send(tokenFromRedis.Credentials);
    } else {
      const tokenFromAli = await utils.getTokenFromAliSts();
      // await utils.setDataToRedis('aliToken', tokenFromAli);
      // await utils.setExpireToRedis('aliToken', 1000 * 60 * 60);
      res.send(tokenFromAli.Credentials);
    }*/
  } catch (e) {
    // const config = sendMailer.config(`用户:${req.session.userData.phone},请求阿里云上传服务临时token异常：`, JSON.stringify(e));
    // sendMailer.send(config);
    res.send({
      status: false,
      msg: '请求阿里云上传服务临时token异常'
    })
  }
});

module.exports = router;
