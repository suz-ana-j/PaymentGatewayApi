// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import stripe from 'stripe';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());

const allowedOrigins = [process.env.CLIENT_URL];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error(`Blocked by CORS: ${origin}`);
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ['GET', 'POST'],
    credentials: true
}));

// Dynamically load the Stripe Key based on environment
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
app.set('stripe', stripeInstance);

app.use('/api/payments', paymentRoutes);

// Root route for quick testing
app.get('/', (req, res) => {
    res.send('✅ Payment Gateway API is running!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));