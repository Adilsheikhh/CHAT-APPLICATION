import express from 'express';
import { Register } from '../controllers/Register.controller.js';

const router = express.Router();

router.post('/register', (req, res, next) => {
    console.log('Route /register hit');
    next(); // Proceed to the actual handler
}, Register);

export default router;
