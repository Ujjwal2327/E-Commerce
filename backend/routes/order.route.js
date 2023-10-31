import express from 'express';
import { createOrder, deleteOrder, getAllOrders, getMyOrders, getSingleOrder, updateOrderStatus } from '../controllers/order.controller.js';
import { authorizeRoles, isAuthenticatedUser } from './../middlewares/auth.js';

const router = express.Router();

router.post('/order/new', isAuthenticatedUser, createOrder);

router.get('/order/:id', isAuthenticatedUser, getSingleOrder);

router.get('/orders/me', isAuthenticatedUser, getMyOrders);

router.get('/admin/orders', isAuthenticatedUser, authorizeRoles('admin'), getAllOrders);

router.route('/admin/order/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrderStatus)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);

export default router;