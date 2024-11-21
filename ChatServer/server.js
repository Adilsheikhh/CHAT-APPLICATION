import 'dotenv/config'; // Ensure dotenv is loading the .env file
import express from 'express';
import connect from './db/connection.js';  // Importing the connection logic
import Auth from './routes/Auth.js';  // Importing the Auth routes
const app = express();
app.use(express.json());  // Middleware to parse JSON data
app.use('/auth', Auth);  // Using the Auth routes
  // Middleware to allow cross-origin requests

app.use('/chat/user',Auth)

connect();  // Connect to MongoDB

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
