var FyersAPI = require("fyers-api-v3");
var fyers = new FyersAPI.fyersModel();

module.exports.authCodeGeneration = async (req, res) => {
    try {
      const { appId, url } = req.body
      
      fyers.setAppId(appId);
      fyers.setRedirectUrl(url);
      var generateUrl = fyers.generateAuthCode();
      return res.send({
        status : true,
        url : generateUrl
      })
    } catch (error) {
      console.log(error);
    }
    return res.status(401).send({
      status : false,
      message : "failed"
    })
  };

