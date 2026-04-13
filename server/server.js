// prep-time/server/server.js

//Initializing dotenv 
const dotenv = require('dotenv');
dotenv.config();

// Initializing dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Express app creation and port configuration
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(bodyParser.json());

//Mounting API Routes
const mealRouter = require('./routes/meal-routes.js');
app.use('/api/meals', mealRouter(supabase));

const userRouter = require('./routes/user-routes.js');
app.use("/api/users", userRouter(supabase));

// Test to see if server is running
app.get("/", (req, res) => {
  res.status(200).json({ message: "Forkast is running!" });
});

app.listen(PORT, () => {
  console.log(`Forkast is running on ${PORT}`);
});
