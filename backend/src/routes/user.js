// backend/src/routes/user.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const { createUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// Signup route
router.post('/signup', 
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        await createUser(req, res);
    }
);

// Login route
router.post('/login', 
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        await loginUser(req, res);
    }
);

module.exports = router;
