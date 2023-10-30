import express from 'express';
import { forgotPassword, getUserDetails, loginUser, logoutUser, registerUser, resetPassword, updatePassword, updateProfile } from '../controllers/user.controller.js';
import { isAuthenticatedUser } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/password/forgot', forgotPassword);
router.get('/logout', isAuthenticatedUser, logoutUser);
router.put('/password/reset/:token', resetPassword);
router.get('/me', isAuthenticatedUser, getUserDetails);
router.put('/password/update', isAuthenticatedUser, updatePassword);
router.put('/me/update', isAuthenticatedUser, updateProfile);

export default router;