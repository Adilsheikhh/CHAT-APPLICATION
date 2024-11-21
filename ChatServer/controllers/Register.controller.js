import Register from '../../ChatFront/src/components/pages/Register';

const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Save images in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set file name to current timestamp
  }
});

const upload = multer({ storage: storage });

// Middleware to parse JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register route that handles file upload
app.post('/chat/register/user', upload.single('image'), (req, res) => {
    console.log('Inside Register Controller');
    
    // Accessing form fields
    const { username, email, password } = req.body;
    const profilePhoto = req.file; // Multer automatically stores file data in req.file
    
    // Check if the required fields are provided
    if (!username || !email || !password) {
        return res.status(400).send('Username, email, and password are required');
    }

    // Optionally: You can store the image info in a DB or the file path
    console.log('User Data:', { username, email, password });
    console.log('Uploaded Image:', profilePhoto);

    // Here you would add your logic to store the user in MongoDB

    // Example response
    res.status(201).send('User registered successfully');
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
export default Register