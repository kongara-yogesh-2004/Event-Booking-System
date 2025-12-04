const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Event = require('../models/Event');
const Booking = require('../models/Booking');
const { authenticateToken } = require('../middlewares/authMiddleware');

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Create Checkout Session
router.post('/create-checkout-session', authenticateToken, async (req, res) => {
  const { eventId, seats, seatIds } = req.body;
  
  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    // Create Pending Booking
    const bookingRef = 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const newBooking = new Booking({
      userId: req.user.id,
      eventId: eventId,
      status: 'Pending',
      seats: seats,
      seatIds: seatIds,
      totalAmount: Math.round(event.price * seats * 1.05 * 100) / 100,
      bookingRef: bookingRef
    });
    await newBooking.save();

    // --- FIX FOR STRIPE IMAGE ERROR ---
    // Stripe needs a public HTTP/HTTPS URL. Local paths like '/images/x.jpg' will fail.
    // Logic: If the DB image is a URL, use it. If it's a local path, use a placeholder.
    let stripeImage = 'https://placehold.co/400?text=Event+Ticket'; 
    if (event.image && event.image.startsWith('http')) {
      stripeImage = event.image;
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: event.title,
              description: `${seats} seats (${seatIds.join(', ')}) at ${event.venue}`,
              images: [stripeImage], // Use the validated image
            },
            unit_amount: Math.round(event.price * 100 * 1.05),
          },
          quantity: seats,
        },
      ],
      mode: 'payment',
      success_url: `${CLIENT_URL}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_URL}?canceled=true`,
      metadata: {
        bookingId: newBooking._id.toString()
      },
    });

    res.json({ url: session.url });
  } catch (e) {
    console.error("Stripe Error:", e);
    res.status(500).json({ message: e.message });
  }
});

// Verify Payment
router.post('/verify-payment', authenticateToken, async (req, res) => {
  const { sessionId } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      const { bookingId } = session.metadata;

      const booking = await Booking.findById(bookingId);
      if (!booking) return res.status(404).json({ message: 'Booking not found' });

      if (booking.status === 'Confirmed') {
        return res.json({ message: 'Booking already confirmed', booking });
      }

      booking.status = 'Confirmed';
      booking.stripeSessionId = sessionId;
      await booking.save();

      // Permanently block seats
      await Event.findByIdAndUpdate(booking.eventId, {
        $inc: { bookedSeats: booking.seats },
        $addToSet: { bookedSeatIds: { $each: booking.seatIds } }
      });
      
      res.json({ message: 'Booking confirmed', booking });
    } else {
      res.status(400).json({ message: 'Payment not successful' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Verification failed' });
  }
});

// Get User Bookings
router.get('/:userId', authenticateToken, async (req, res) => {
  if (req.user.id !== req.params.userId && req.user.role !== 'admin') {
     return res.sendStatus(403);
  }
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
                                  .populate('eventId')
                                  .sort({ dateBooked: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

module.exports = router;