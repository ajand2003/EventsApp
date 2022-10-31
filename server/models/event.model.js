const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  timeCreated: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  user: {type: String, required: true},
  title: {type: String, required: true},
}, {
  timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;