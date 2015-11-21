var Event = require('./eventModel.js');
var Q = require('q');

module.exports = {

  getEventList: function (request, response, next) {
    var findAll = Q.nbind(Event.find, Event);

    findAll({})
    .then(function (event) {
      response.json(event);
    })
    .fail(function (error) {
      next(error);
    });
  },

  postEvent: function (request, response, next) {
    // to do for friends invited
    console.log(request.body)
    var friends = request.body.friends;
    var address = request.body.address;
    var description = request.body.description;
    var startDate = request.body.startDate;
    var endDate = request.body.endDate;
    var time = request.body.time;

    console.log("data....", address, description, startDate, time);
    var create;
    var newEvent;

    // create = Q.nbind(Event.create, Event);
    // newEvent = {
    //   friends: friends,
    //   address: address,
    //   description: description,
    //   startDate: startDate,
    //   endDate: endDate,
    //   time: time
    // };
    //  return create(newEvent);
    var newEvent = new Event({
      friends: friends,
      address: address,
      description: description,
      startDate: startDate,
      endDate: endDate,
      time: time
    });

    newEvent.save(function (err, event) {
      if (err) {
        console.error(err);
      }
      response.status(201).send(event);
    });
  }

};
