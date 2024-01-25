const router =  require('express').Router();
const authCode = require('../token/authCode');
const accesstoken =  require('../token/accessToken');
const indexAlgorithm = require('../algorithm/indexAlgorithm')
const runAlgorithm =  require('../server/serverStart');

router.get('/', (req, res) => {
    return console.log("Sever Listening 9000");
});

router.post('/authcode', authCode.authCodeGeneration);

router.post('/accesstoken', accesstoken.generate_access_token);

router.post('/algorithm', indexAlgorithm.indexAlgorithm);

router.post('/serverstart', runAlgorithm.serverStart)

module.exports = router