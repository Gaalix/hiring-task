require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
// Middleware to parse the request body
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index", { stripePublicKey: process.env.STRIPE_PUBLIC_KEY });
});

// Route to create a payment intent
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;
    // Create a payment intent using the Stripe API
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
    });
    // client secret is the secret key to confirm the payment
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
