const express = require('express');
const router = express.Router();
const utils = require('./utils');
const {redisClient} = require('./redisServer');
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

router.get('/api/grid-list.json', (req,res) => {
  res.send({
    data:[
      {title: "现代简约多功能功夫茶几客厅创意折叠智能伸缩电动升降火烧石茶桌",zkFinalPrice: 2890.00,  picUrl: "https://img.alicdn.com/tfscom/i4/386614415/O1CN01MzpGBc1iU76fxwhJn_!!386614415.jpg", couponRemainCount: 7296},
      {title: "北欧ins简约铁艺圆形一字隔板墙上置物架墙面壁挂装饰创意小架子", zkFinalPrice: 79.00,  picUrl: "https://img.alicdn.com/tfscom/i4/694703068/TB1kuXeeXkoBKNjSZFEXXbrEVXa_!!0-item_pic.jpg", couponRemainCount: 58010, },
      {title: "小户型家用饭桌餐桌椅组合正方形实木八仙桌仿古中式红木四方桌子",zkFinalPrice: 3580.00, picUrl: "https://img.alicdn.com/tfscom/i4/1995762266/O1CN01FKqeDl1Sbryc5gmyP_!!1995762266.jpg", couponRemainCount: 993, },
      {title: "实木茶桌原木茶台免漆老榆木餐桌茶室新中式简约明式禅意茶几", zkFinalPrice: 4990.00,  picUrl: "https://img.alicdn.com/tfscom/i4/253874894/O1CN01LbErsn1m1Uq5NfuOU_!!0-item_pic.jpg", couponRemainCount: 937, },
      {title: "卧室全实木家具 正品特价田园榉木二门平开衣柜 推门/拉门衣柜918", zkFinalPrice: 3300.00, picUrl: "https://img.alicdn.com/tfscom/i2/268419262/O1CN012II2pik7s82bCix_!!0-item_pic.jpg", couponRemainCount: 90, },
      {title: "欧式酒柜现代简约客厅柜立式展示柜餐厅柜餐边柜收藏柜玄关柜定制", zkFinalPrice: 1399.00,  picUrl: "https://img.alicdn.com/tfscom/i2/33600537/O1CN01rY5IOm1FpzB54rOUA_!!33600537.jpg", couponRemainCount: 474,},
      {title: "黑白几何北欧简约现代宜家客厅沙发茶几地毯 卧室床边满铺长方形",zkFinalPrice: 99.00,  picUrl: "https://img.alicdn.com/tfscom/i2/2690524739/TB2b3axg8NkpuFjy0FaXXbRCVXa_!!2690524739.jpg", couponRemainCount: 95611, },
      {title: "豪华新中式乌金木床软靠真皮婚床全实木1.8原木主卧大床别墅家具", zkFinalPrice: 8160.00,picUrl: "https://img.alicdn.com/tfscom/i2/801206278/O1CN01p02gkF1wFMzCc7lwW_!!801206278.jpg", couponRemainCount: null, },
      {title: "可定制 北欧木质洞洞板厨房置物架 墙上壁挂实木家用烘焙收纳神器", zkFinalPrice: 199.00,picUrl: "https://img.alicdn.com/tfscom/i3/60419589/O1CN01Vp2JBT2KhoN1gJF6m_!!0-item_pic.jpg", couponRemainCount: 88690, },
      {title: "穗欣纯3D床垫可水洗透气4D床垫1.5m1.8米1.2定做全纤维席梦思床垫",zkFinalPrice: 4880.00,  picUrl: "https://img.alicdn.com/tfscom/i4/1084139577/O1CN01hJDcxX2KcJcDMO3aJ_!!1084139577.jpg", couponRemainCount: 4844, },
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
    const token = utils.createToken({
      id : 1,
      phone: req.query.phoneNumber
    });
    res.send({
      status: true,
      token: token,
      msg: '登录成功'
    })
  }
});

router.post('/api/set-redis-first.json',(req,res)=>{
  redisClient.set('node:wwt:'+req.user.id,JSON.stringify({id:1,phone:15737962939}),(error, response)=>{
    if (!error){
      res.send({status: true,msg:'OK'})
    }else {
      console.log(error);
      res.send({status:false,msg:'存储到redis失败'})
    }
  });
});

router.get('/api/get-redis-first.json',(req,res)=>{
  redisClient.get('node:wwt:'+ req.user.id,(error, response)=>{
    if (!error){
      res.send({status: true,data:JSON.parse(response),msg:'OK'})
    }else {
      console.log(error);
      res.send({status:false,msg:'获取redis失败'})
    }
  });
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
