import express from 'express';
import {} from '../controllers/auth.js';

const router = express.Router();

// Create a user
router.post('/signup');
// Sign In
router.post('/signin');
// google auth
router.post('/google');
export default router;
