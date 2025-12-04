const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Event = require('../models/Event');

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@event.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Super Admin',
        email: 'admin@event.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin seeded: admin@event.com / admin123');
    }
  } catch (err) {
    console.error('Seeding admin error:', err);
  }
};

const getCategoryImage = (category) => {
  // Local file paths - Ensure you download images and place them in your project's public/images folder
  // Example: backend/public/images/music.jpg
  const images = {
    'Music': '/images/music.jpg',
    'Business': '/images/business.jpg',
    'Arts': '/images/arts.jpg',
    'Sports': '/images/sports.jpg',
    'Workshops': '/images/workshops.jpg',
    'Food & Drink': '/images/food.jpg',
    'Default': '/images/default.jpg'
  };
  return images[category] || images['Default'];
};

const seedEvents = async () => {
  try {
    // Force clear old events to show new images immediately
    console.log("Clearing old events and seeding fresh data with local images...");
    await Event.deleteMany({}); 

    const events = [
      // --- December 2025 ---
      { title: "Winter Wonderland Gala", date: "2025-12-05", time: "18:00", venue: "Grand Ballroom", price: 150, category: "Arts", totalSeats: 100, description: "A magical evening of art and performance." },
      { title: "Tech Innovators 2025", date: "2025-12-10", time: "09:00", venue: "Convention Center", price: 299, category: "Business", totalSeats: 50, description: "Year-end review of breakthrough technologies." },
      { title: "Holiday Jazz Night", date: "2025-12-15", time: "20:00", venue: "Blue Note Club", price: 60, category: "Music", totalSeats: 40, description: "Classic holiday tunes with a jazz twist." },
      { title: "Gourmet Food Festival", date: "2025-12-20", time: "11:00", venue: "City Park", price: 25, category: "Food & Drink", totalSeats: 200, description: "Taste dishes from top local chefs." },
      { title: "New Year's Eve Bash", date: "2025-12-31", time: "21:00", venue: "Skyline Rooftop", price: 200, category: "Music", totalSeats: 80, description: "Countdown party with live DJ." },
      
      // --- January 2026 ---
      { title: "New Year Wellness Yoga", date: "2026-01-05", time: "08:00", venue: "Zen Garden", price: 30, category: "Workshops", totalSeats: 25, description: "Start the year with mindfulness." },
      { title: "Global Finance Summit", date: "2026-01-12", time: "09:00", venue: "Financial District", price: 400, category: "Business", totalSeats: 100, description: "Economic forecast for the new year." },
      { title: "Winter Basketball Finals", date: "2026-01-18", time: "18:00", venue: "City Arena", price: 45, category: "Sports", totalSeats: 300, description: "Championship game of the season." },
      { title: "Classical Symphony", date: "2026-01-24", time: "19:30", venue: "Opera House", price: 90, category: "Music", totalSeats: 150, description: "Mozart and Beethoven masterpieces." },
      { title: "Indie Game Dev Meetup", date: "2026-01-30", time: "17:00", venue: "Tech Hub", price: 0, category: "Workshops", totalSeats: 50, description: "Networking for game developers." },

      // --- February 2026 ---
      { title: "AI Ethics Conference", date: "2026-02-04", time: "10:00", venue: "University Hall", price: 50, category: "Business", totalSeats: 200, description: "Discussing the future of AI safety." },
      { title: "Valentine's Cooking Class", date: "2026-02-14", time: "18:00", venue: "Culinary School", price: 120, category: "Food & Drink", totalSeats: 20, description: "Couples cooking workshop." },
      { title: "Modern Art Exhibition", date: "2026-02-20", time: "10:00", venue: "Design Museum", price: 20, category: "Arts", totalSeats: 60, description: "Contemporary works from rising stars." },
      { title: "Full Stack Bootcamp", date: "2026-02-25", time: "09:00", venue: "Code Academy", price: 500, category: "Workshops", totalSeats: 30, description: "Intensive coding workshop for beginners." },
      { title: "City Marathon", date: "2026-02-28", time: "06:00", venue: "Downtown", price: 40, category: "Sports", totalSeats: 500, description: "Annual 42km run through the city." },

      // --- March 2026 ---
      { title: "Spring Music Fest", date: "2026-03-10", time: "12:00", venue: "Open Air Park", price: 80, category: "Music", totalSeats: 250, description: "Outdoor music festival." },
      { title: "Startup Pitch Night", date: "2026-03-15", time: "18:00", venue: "Innovation Lab", price: 10, category: "Business", totalSeats: 40, description: "Investors meet entrepreneurs." },
    ];

    const eventsWithData = events.map(e => ({
      ...e,
      image: getCategoryImage(e.category),
      bookedSeats: 0,
      bookedSeatIds: []
    }));

    await Event.insertMany(eventsWithData);
    console.log('Successfully seeded 17 mock events with local images.');
    
  } catch (err) {
    console.error('Seeding events error:', err);
  }
};

module.exports = { seedAdmin, seedEvents };