var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  name: String,
  friends: [{
    id: String,
    name: String
  }],
  address: {
    streetAddress: String,
    city: String,
    state: String,
    zip: Number
  },
  description: String,
  startTime: String,
  endTime: String,
  date : String,
  createdBy: String
});

module.exports = mongoose.model('events', eventSchema);
