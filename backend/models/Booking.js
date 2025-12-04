const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  status: { type: String, default: 'Pending' },
  seats: Number,
  seatIds: { type: [String], default: [] },
  totalAmount: Number,
  dateBooked: { type: Date, default: Date.now },
  bookingRef: String,
  stripeSessionId: String,
});

module.exports = mongoose.model('Booking', bookingSchema);