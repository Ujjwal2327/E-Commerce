import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
import { isAuthenticatedUser } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', isAuthenticatedUser, logoutUser);

export default router;