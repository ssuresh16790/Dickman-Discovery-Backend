const FyersAPI = require("fyers-api-v3");
const fyers = new FyersAPI.fyersModel();
const accessToken = require('../token/accessToken.json')
const fs = require('fs');

module.exports.generate_access_token = async (req, res) => {
    try {
      const { appId, auth_code, url, secret_key } = req.body
      fyers.setAppId(appId);
      fyers.setRedirectUrl(url);
      const response = await fyers.generate_access_token({
        secret_key: secret_key,
        auth_code: auth_code,
      });
      fs.writeFileSync('E:\\dickmandiscoverysite\\token\\accessToken.json', JSON.stringify({accesstoken:response.access_token,appId:appId,url:url}, null, 2));
      return res.send({
        status : true, 
        message : 'successfully access token'
      })
    } catch (error) { 
      console.log(error);
    }
    return res.status(401).send({
      status : false,
      message : "failed"
    })
  };


