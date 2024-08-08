require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const users = {};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (!users[userId]) {
    users[userId] = { balance: 1000 };
  }

  bot.sendMessage(
    chatId,
    "Welcome to the Gambling Bot! Use /balance to check your balance and /bet to place a bet."
  );
});

bot.onText(/\/balance/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (!users[userId]) {
    users[userId] = { balance: 1000 };
  }

  bot.sendMessage(chatId, `Your current balance is $${users[userId].balance}.`);
});

bot.onText(/\/bet (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const betAmount = parseInt(match[1]);

  if (!users[userId]) {
    users[userId] = { balance: 1000 };
  }

  if (isNaN(betAmount) || betAmount <= 0) {
    bot.sendMessage(chatId, "Please enter a valid bet amount.");
    return;
  }

  if (betAmount > users[userId].balance) {
    bot.sendMessage(
      chatId,
      "Insufficient funds. Check your balance with /balance."
    );
    return;
  }

  // Simple 50/50 chance of winning
  const win = Math.random() < 0.5;

  if (win) {
    users[userId].balance += betAmount;
    bot.sendMessage(
      chatId,
      `Congratulations! You won $${betAmount}. Your new balance is $${users[userId].balance}.`
    );
  } else {
    users[userId].balance -= betAmount;
    bot.sendMessage(
      chatId,
      `Sorry, you lost $${betAmount}. Your new balance is $${users[userId].balance}.`
    );
  }
});

console.log("Bot is running...");
