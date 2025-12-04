const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/:userId', authenticateToken, (req, res) => {
  const notifications = [
    { id: 1, title: 'Welcome to EventBooker', message: 'Thanks for joining! Explore our upcoming events.', date: new Date().toISOString().split('T')[0], type: 'info' },
    { id: 2, title: 'Winter Sale!', message: 'Get 10% off on all Music events this December.', date: '2025-12-01', type: 'promo' },
    { id: 3, title: 'Maintenance Update', message: 'We improved the seat selection map for better experience.', date: '2025-11-28', type: 'system' },
    { id: 4, title: 'New Events Added', message: 'Check out the new Workshops scheduled for January.', date: '2025-11-25', type: 'info' },
  ];
  res.json(notifications);
});

module.exports = router;