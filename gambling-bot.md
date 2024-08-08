# Telegram Gambling Bot

A simple Telegram bot for simulating gambling activities.

## Setup and Execution

1. Install dependencies:

   ```
   npm install
   ```

2. Create a `.env` file in the project root and add your Telegram bot token:

   ```
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   ```

3. Run the bot locally:
   ```
   npm start
   ```

## Deployment to Heroku

1. Create a Heroku account and install the Heroku CLI.

2. Login to Heroku CLI:

   ```
   heroku login
   ```

3. Create a new Heroku app:

   ```
   heroku create your-app-name
   ```

4. Set the Telegram bot token as a config var:

   ```
   heroku config:set TELEGRAM_BOT_TOKEN=your_bot_token_here
   ```

5. Deploy the app:

   ```
   git push heroku main
   ```

6. Scale the worker dyno:

   ```
   heroku ps:scale worker=1
   ```

7. Check the logs to ensure the bot is running:
   ```
   heroku logs --tail
   ```

## Bot Commands

- `/start`: Initialize the bot and get a welcome message
- `/balance`: Check your current balance
- `/bet <amount>`: Place a bet with the specified amount

## Live Bot

[Telegram Gambling Bot](https://t.me/GalGambleBot)

## Code Overview

The main bot logic is implemented in `bot.js`. It uses the `node-telegram-bot-api` library to interact with the Telegram Bot API. The bot supports three commands: `/start`, `/balance`, and `/bet`.

Key features:

- User balances are stored in memory (resets on bot restart)
- Simple 50/50 chance gambling mechanism
- Basic error handling for invalid bets and insufficient funds

For more details, refer to the comments in the `bot.js` file.
