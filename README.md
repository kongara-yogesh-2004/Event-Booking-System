EventBooker - Modern Event Booking Platform

A sleek, full-stack event booking application built with the MERN stack (MongoDB, Express, React, Node.js). Features include role-based authentication (Admin/User), real-time seat booking, blocking of booked seats, event management, and secure payments via Stripe.

📋 Prerequisites**

Before running this project, ensure you have the following installed on your machine:

Node.js (v14.0.0 or higher) 

MongoDB (Community Edition) 

Make sure MongoDB is running locally on port 27017.

***********************************************************************************************
***********************************************************************************************

🛠️ Installation & Setup**

Follow these steps to get the application running on your local machine.

1. Database Setup

Ensure your local MongoDB instance is running.

# On Windows (Command Prompt)
mongod

# On Mac/Linux
brew services start mongodb-community

***********************************************************************************************

2. Backend Setup

The backend handles the API, database connections, and payments.

Open a terminal and navigate to the backend folder.

Install dependencies:

**cd backend
npm install**

 

Environment Variables: Create a file named .env inside the backend folder same as .env.example and paste the following:

PORT=5000
MONGO_URI=mongodb://localhost:27017/eventbooker
JWT_SECRET=mysecretkey123
STRIPE_SECRET_KEY=sk_test_... (Replace with your Stripe Secret Key)
CLIENT_URL=http://localhost:3000


**Note: You need a Stripe account to get a Test Secret Key.**

Seed the Database (Optional but recommended):
The app automatically seeds admin credentials and mock events on the first run.

Start the Server:

**npm run dev**
# OR
node server.js


**The server should be running at http://localhost:5000.**

***********************************************************************************************

3. Frontend Setup

The frontend is the React user interface.

Open a new terminal window and navigate to the project root (where package.json for React is located).

**cd frontend**
 

Install dependencies:

**npm install**


Images: Ensure you have an images folder inside public/ containing the category images (music.jpg, business.jpg, etc.) for the best visual experience.

Start the React App:

**npm run dev**
 

**The app should open automatically at http://localhost:3000.**

**********************************************************************************************
**********************************************************************************************

🔑 Login Credentials

Admin Account

Use this account to access the dashboard, create events, and view analytics.

Email: admin@event.com

Password: admin123

User Account

You can sign up as a new user via the "Sign Up" button on the login page, or use any created account.


*****************************************************************************************************************************************************************************

💳** Testing Payments (Stripe)**

Since the app uses Stripe in Test Mode, do not use real card details.

Card Number: 4242 4242 4242 4242

Expiry: Any future date (e.g., 12/30)

CVC: Any 3 digits (e.g., 123)

ZIP: Any valid ZIP code (e.g., 10001)

**********************************************************************************************************************************************************************************************

📂 Project Structure

/
├── backend/                # Node.js & Express Server
│   ├── config/             # DB Connection
│   ├── models/             # Mongoose Schemas (User, Event, Booking)
│   ├── routes/             # API Routes
│   ├── utils/              # Seeders
│   └── server.js           # Entry point
│
├── src/                    # React Frontend Source
│   ├── components/         # UI Components (EventCard, Navbar, etc.)
│   ├── EventBookingApp.jsx # Main Application Logic
│   └── index.css           # Tailwind Styles
│
├── public/
│   └── images/             # Local static assets for events
│
└── package.json            # Dependencies


🚀 Key Features to Test

Admin Dashboard: Log in as Admin to see the ring charts showing seat occupancy. Create a new event and see it appear in the list.

Date Filtering: Use the calendar widget on the User or Admin dashboard to filter events by specific dates.

Seat Blocking: Book a seat as a User. Log out and log back in (or try booking as a different user) to verify that the seat remains unavailable (greyed out).

Notifications: Check the bell icon for mock notifications about system updates and promos.

*****************************************************************************************************************************************************************************

⚠️ Troubleshooting

"MongoDB Connection Error": Ensure your MongoDB service is running locally (mongod).

"Stripe Invalid Request": Check your .env file in the backend folder. Ensure STRIPE_SECRET_KEY is valid and correct.

Images not loading: Verify that the image files exist in the public/images/ folder with the exact names (music.jpg, etc.).
