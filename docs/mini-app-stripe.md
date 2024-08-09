# Mini-App with Fiat Payment Using Stripe

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Create a `.env` file in the project root and add your Telegram Bot token and Stripe API keys:

   ```
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
   STRIPE_PUBLIC_KEY=your_stripe_public_key_here
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   ```

3. Start the server:
   ```
   npm start
   ```

## Usage

1. The server will start and create a secure tunnel using localtunnel. The tunnel URL will be logged in the console.

2. In Telegram, start a chat with your bot and use the `/deposit` command.

3. The bot will send a message with a button to open the Deposit App.

4. Click the button to open the Mini-App within Telegram.

5. In the Mini-App, you'll see three buttons for different deposit amounts: 20€, 40€, and 100€.

6. Click on a deposit button to initiate a payment.

7. Enter your card details in the Stripe Elements form.

8. The payment process will begin, and you'll see status updates in the payment-result div.

## Code Structure

- `server.js`: Contains the Express server setup, Telegram bot configuration, and routes for handling payment intents.
- `public/index.html`: The main HTML file for the Mini-App.
- `public/app.js`: Client-side JavaScript for handling payments and Telegram Web App integration.

## Key Features

- Integration with Telegram Bot API for launching the Mini-App
- Secure HTTPS tunnel using localtunnel for local development
- Stripe payment integration with client-side confirmation
- Real-time communication between the Mini-App and the Telegram bot
