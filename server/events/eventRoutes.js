var eventController = require('./eventController.js');

module.exports = function (app) {

  app.post('/eventMap', eventController.getEventInfo)
  app.get('/', eventController.getEventList);
  app.post('/', eventController.postEvent);
};
