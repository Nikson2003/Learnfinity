// backend/src/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const path = require('path');
const instructorRoutes = require('./routes/instructor');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '../../frontend')));

// Routes
app.use('/api/users', userRoutes);

app.use('/api/instructors', instructorRoutes);


app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend', 'index.html')); // Corrected path
});

app.get('/instructordash', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend', 'instructor_dash.html')); // Corrected path
});

app.get('/stduentdash', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend', 'Home.html')); // Corrected path
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend', 'signup.html')); // Corrected path
});

// Serve the signup HTML page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend', 'signup.html')); // Corrected path
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));