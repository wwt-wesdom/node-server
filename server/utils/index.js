const sts = require('../aliServer');
/**
 * 获取阿里云上传临时token
 */
const getTokenFromAliSts = () => {
  return new Promise((resolve, reject) => {
    sts.assumeRole({
      Action: 'AssumeRole',
      RoleArn: 'acs:ram::1787158783531067:role/aliyunosstokengeneratorrole',
      //设置Token的附加Policy，可以在获取Token时，通过额外设置一个Policy进一步减小Token的权限；
      //Policy: '{"Version":"1","Statement":[{"Effect":"Allow", "Action":"*", "Resource":"*"}]}',
      //设置Token有效期，可选参数，默认3600秒；
      DurationSeconds: 3600,
      RoleSessionName: 'RoleSessionName'
    }, (err, parsedBody) => {
      if (err) {
        reject(err)
      } else {
        resolve(parsedBody)
      }
    })
  })
};

module.exports = {getTokenFromAliSts};