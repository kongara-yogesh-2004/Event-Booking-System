# EventBooker - Modern Event Booking Platform

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

 On Windows (Command Prompt)
mongod

On Mac/Linux
brew services start mongodb-community

***********************************************************************************************

# 2. Backend Setup

The backend handles the API, database connections, and payments.

Open a terminal and navigate to the backend folder.

Install dependencies:

**cd backend**

**npm install**

 

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

OR

node server.js


**The server should be running at http://localhost:5000.**

***********************************************************************************************

# 3. Frontend Setup

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

# 💳** Testing Payments (Stripe)**

Since the app uses Stripe in Test Mode, do not use real card details.

Card Number: 4242 4242 4242 4242

Expiry: Any future date (e.g., 12/30)

CVC: Any 3 digits (e.g., 123)

ZIP: Any valid ZIP code (e.g., 10001)





*****************************************************************************************************************************************************************************
<h2>📸 Project Screenshots</h2>

<table>
  <tr>
    <td align="center">
      <img src="./screenshots/Login page.png" width="450"/>
      <br/><b>Figure 1:</b> Login Page
    </td>
    <td align="center">
      <img src="./screenshots/Home page for users.png" width="450"/>
      <br/><b>Figure 2:</b> Home Page for Users
    </td>
  </tr>

  <tr>
    <td align="center">
      <img src="./screenshots/Browse events.png" width="450"/>
      <br/><b>Figure 3:</b> Browse Events Page
    </td>
    <td align="center">
      <img src="./screenshots/Notifications page.png" width="450"/>
      <br/><b>Figure 4:</b> Notifications Page
    </td>
  </tr>

  <tr>
    <td align="center">
      <img src="./screenshots/Users Bookings.png" width="450"/>
      <br/><b>Figure 5:</b> User Bookings Page
    </td>
    <td align="center">
      <img src="./screenshots/Booking confirmation.png" width="450"/>
      <br/><b>Figure 6:</b> Booking Confirmation
    </td>
  </tr>

  <tr>
    <td align="center">
      <img src="./screenshots/Payment for booking.png" width="450"/>
      <br/><b>Figure 7:</b> Payment for Booking
    </td>
    <td align="center">
      <img src="./screenshots/Reminder setup.png" width="450"/>
      <br/><b>Figure 8:</b> Reminder Setup
    </td>
  </tr>

  <tr>
    <td align="center">
      <img src="./screenshots/calendar based event sorting.png" width="450"/>
      <br/><b>Figure 9:</b> Calendar-Based Event Sorting
    </td>
    <td align="center">
      <img src="./screenshots/Seat Allocation.png" width="450"/>
      <br/><b>Figure 10:</b> Seat Allocation
    </td>
  </tr>
</table>

<hr/>

<h3>👨‍💼 Admin Screens</h3>

<table>
  <tr>
    <td align="center">
      <img src="./screenshots/Admin dashboard.png" width="450"/>
      <br/><b>Figure 11:</b> Admin Dashboard
    </td>
    <td align="center">
      <img src="./screenshots/create event by admin.png" width="450"/>
      <br/><b>Figure 12:</b> Create Event (Admin)
    </td>
  </tr>
</table>



