const today = new Date();
const dayOfWeek = today.getDay();
const indexAlgorithm = require('../algorithm/indexAlgorithm');
const serverstart = require('../server/server.json') 
const server = serverstart.server;

module.exports.serverStart = async () => {
  while (server == "start") {

    // check the weekday or holiday
    if (dayOfWeek !== 0 && dayOfWeek !== 5) {
      // Market is open, run the algorithm
      await indexAlgorithm.indexAlgorithm();
    } else {
      console.log('Server Failed');
    }
  }
  console.log('Server Stopped');
};
