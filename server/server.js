// prep-time/server/server.js

//Initializing dotenv 
const dotenv = require('dotenv');
dotenv.config();

// Initializing dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const supabase = require('@supabase/supabase-js').createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const allowedOrigins = [
  'http://localhost:5173',
  'https://gregory-dort.github.io/forkkast-foods'
];

// Express app creation and port configuration
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(bodyParser.json());

//Mounting API Routes
const mealRouter = require('./routes/meal-routes.js');
app.use('/api/meals', mealRouter(supabase));

const userRouter = require('./routes/user-routes.js');
app.use("/api/users", userRouter(supabase));

app.listen(PORT, () => {
  console.log(`Forkast is running on ${PORT}`);
});
