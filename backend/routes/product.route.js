import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductDetails, updateProduct } from '../controllers/product.controller.js';
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';
const router = express.Router();

router.get('/products', getAllProducts);

router.post('admin//product/new', isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router.route('admin/product/:id')
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)

router.get('product/:id', getProductDetails);

export default router;