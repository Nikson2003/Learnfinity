// backend/src/routes/instructor.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const { loginUser } = require('../controllers/userController');

const router = express.Router();

// Login for instructors
router.post('/login', 
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Since loginUser can handle both roles, we'll pass the role as 'Instructor'
        req.body.role = 'Instructor'; 
        await loginUser(req, res);
    }
);

module.exports = router;
