# Mini-App with Fiat Payment Using Stripe

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Create a `.env` file in the project root and add your Stripe API keys:

   ```
   STRIPE_PUBLIC_KEY=your_stripe_public_key_here
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   ```

3. Start the server:
   ```
   npm start
   ```

## Usage

1. Open a web browser and navigate to `http://localhost:3000` (or the port specified in your environment).

2. You'll see three buttons for different deposit amounts: 20€, 40€, and 100€.

3. Click on a deposit button to initiate a payment.

4. Enter your card details in the Stripe Elements form.

5. The payment process will begin, and you'll see status updates in the payment-result div.

6. If the payment is successful, you'll see a "Payment successful!" message. Otherwise, an error message will be displayed.

## Code Structure

- `server.js`: Contains the Express server setup and routes for handling payment intents.
- `views/index.ejs`: The main HTML file with the client-side JavaScript for handling payments.
- `public/styles.css`: Basic styling for the mini-app.
