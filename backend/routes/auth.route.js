import express from 'express';
import { register, login, logout ,refreshToken, profile } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token',refreshToken);
router.get('/profile', protectRoute ,profile)

export default router;
