import express from 'express';
import { OrderController, VerifyController } from '../Controllers/payment.js';
const router=express.Router();
router.post('/orders',OrderController);
router.post('/verify',VerifyController);
export default router;