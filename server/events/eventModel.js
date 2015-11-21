var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  friends: [{
    id: String,
    name: String
  }],
  address: {
    street: String,
    city: String,
    state: String,
    zip: Number
  },
  description: String,
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  time : { type : Date, default: Date.now }
});

module.exports = mongoose.model('events', eventSchema);
