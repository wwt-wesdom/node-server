const sts = require('../aliServer');
const jwt = require('jsonwebtoken');
/**
 * 获取阿里云上传临时token
 */


const createToken = (tokenInfo) => {
  if (Object.keys(tokenInfo).length === 0){
    throw Error('生成token信息参数缺省！')
  }
  return jwt.sign(tokenInfo,'wwt',{
    expiresIn: 3600*24*7
  })
};

module.exports = {getTokenFromAliSts, createToken};