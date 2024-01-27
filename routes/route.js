const router =  require('express').Router();
const authCode = require('../fyers_token/authgen');
const accesstoken =  require('../fyers_token/generate_access_token');
const indexAlgorithm = require('../algorithm/indexAlgorithm')
const runAlgorithm =  require('../server/serverStart');

router.get('/', (req, res) => {
     console.log("server listening 9000");
     return res.send("server listening 9000")
});

router.post('/authcode', authCode.authCodeGeneration);

router.post('/accesstoken', accesstoken.generate_access_token);

router.post('/algorithm', indexAlgorithm.indexAlgorithm);

router.post('/serverstart', runAlgorithm.serverStart)

module.exports = router