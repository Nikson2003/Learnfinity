// backend/src/controllers/userController.js
const User = require('../models/User');
const Instructor = require('../models/Instructor');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        let user;
        if (role === 'Instructor') {
            user = new Instructor({ name, email, password: password });
        } else {
            user = new User({ name, email, password: hashedPassword });
        }

        await user.save();
        res.status(201).json({ message: `${role} created successfully!` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        let user;
        if (role === 'Student') {
            user = await User.findOne({ email });
        } else if (role === 'Instructor') {
            user = await Instructor.findOne({ email });
        }

        if (!user) {
            return res.status(400).json({ message: 'User not found!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password!' });
        }

        res.status(200).json({ message: 'Login successful!', name: user.name });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createUser, loginUser };
