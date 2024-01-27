const FyersAPI = require("fyers-api-v3");
const fyers = new FyersAPI.fyersModel();
const fs = require('fs');
const token = require('./keys.json')

module.exports.generate_access_token = async (req, res) => {
    try {
      const { auth_code,  secret_key } = req.body
      const appId = token.appId;
      const url = token.url;
      fyers.setAppId(appId);
      fyers.setRedirectUrl(url);
      const response = await fyers.generate_access_token({
        secret_key: secret_key,
        auth_code: auth_code,
      });
      fs.writeFileSync('fyers_token/token_saved.json', JSON.stringify({accesstoken:response.access_token,appId:appId,url:url}, null, 2));
      return res.send({
        status : true, 
        message : 'successfully access token generated'
      })
    } catch (error) { 
      console.log(error);
    }
    return res.status(401).send({
      status : false,
      message : "failed"
    })
  };