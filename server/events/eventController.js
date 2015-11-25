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
    console.log(request.body.startTime)
    var name = request.body.name;
    var friends = request.body.friends;
    var address = request.body.address;
    var description = request.body.description;
    var startTimeString = request.body.startTimeString;
    var endTimeString = request.body.endTimeString;
    var date = request.body.date;
    var createdBy = request.body.createdBy;
    console.log('address', address)
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
      name: name,
      friends: friends,
      address: address,
      description: description,
      startTime: startTimeString,
      endTime: endTimeString,
      date: date,
      createdBy: createdBy
    });

    newEvent.save(function (err, event) {
      if (err) {
        console.error(err);
      }
      response.status(201).send(event);
    });
  },
  getEventInfo: function (request, response, next) {
    var findEvent = Q.nbind(Event.findOne, Event)
    findEvent({name: request.body.event})
    .then(function (event) {
      response.json(event);
    })
    .fail(function (error) {
      next(error);
    });
  }

};
