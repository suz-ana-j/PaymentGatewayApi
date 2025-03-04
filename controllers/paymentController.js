export const createCheckoutSession = async (req, res) => {
    try {
        const stripe = req.app.get('stripe');

        if (!req.body.product || !req.body.price) {
            return res.status(400).json({ error: "Missing required fields: product and price." });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: req.body.product,
                        },
                        unit_amount: req.body.price, // Price in cents
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.CLIENT_URL}/success?session_id={{CHECKOUT_SESSION_ID}}`, // Fix here
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });

        res.json({ id: session.id, url: session.url });
    } catch (error) {
        console.error('Stripe Checkout Error:', error);
        res.status(500).json({ error: 'Failed to create checkout session', details: error.message });
    }
};



