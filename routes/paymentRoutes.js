import express from 'express';
import { createCheckoutSession } from '../controllers/paymentController.js';

const router = express.Router();

// Define the POST route
router.post('/create-checkout-session', createCheckoutSession);

export default router;
