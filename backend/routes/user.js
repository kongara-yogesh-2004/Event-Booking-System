const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const userCtrl = require('../controllers/userController');

router.use(auth);

// get current user's bookings (optionally filter upcoming/past)
router.get('/bookings', userCtrl.listMyBookings);

// get a calendar view of user's bookings aggregated by day/week/month
router.get('/bookings/calendar', userCtrl.bookingsCalendar);

// get single booking detail
router.get('/bookings/:id', userCtrl.getBooking);

module.exports = router;
