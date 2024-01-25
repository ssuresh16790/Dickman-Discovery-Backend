const today = new Date();
const dayOfWeek = today.getDay();
const indexAlgorithm = require('../algorithm/indexAlgorithm');

module.exports.serverStart = async (req, res) => {
  const server = req.body.server
  while (server == "start") {

    // check the weekday or holiday
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // Market is open, run the algorithm
      await indexAlgorithm.indexAlgorithm();
    } else {
      console.log('Server Failed');
    }
  }
  console.log('Server Stopped');
};

