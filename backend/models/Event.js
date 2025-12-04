const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  date: String, // Format: YYYY-MM-DD
  time: String,
  venue: String,
  price: Number,
  image: String,
  category: String,
  status: { type: String, default: 'Published' },
  totalSeats: Number,
  bookedSeats: { type: Number, default: 0 },
  bookedSeatIds: { type: [String], default: [] }, // Persistent Blocked Seats
  description: String,
});

module.exports = mongoose.model('Event', eventSchema);