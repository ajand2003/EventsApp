const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  time: { type: String, required: true },
  desc: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  host: {type: String, required: true},
  title: {type: String, required: true},
}, {
  timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;