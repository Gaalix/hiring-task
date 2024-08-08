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
    "Welcome to the Gambling Bot, where dreams come true (and wallets cry)! 🎰💸\n\n" +
      "Commands:\n" +
      "/balance - Check how much imaginary money you have left\n" +
      "/bet <amount> - Try your luck (spoiler: you probably won't have any)\n" +
      "/roulette <red|black> <amount> - Spin the wheel of misfortune!\n\n" +
      "Remember, the house always wins... but hey, at least you're having fun, right? 😅"
  );
});

bot.onText(/\/balance/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (!users[userId]) {
    users[userId] = { balance: 1000 };
  }

  bot.sendMessage(
    chatId,
    `Your current balance is $${users[userId].balance}. Don't get too excited, it's not real money... yet! 💰🤑`
  );
});

bot.onText(/\/bet (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const betAmount = parseInt(match[1]);

  if (!users[userId]) {
    users[userId] = { balance: 1000 };
  }

  if (isNaN(betAmount) || betAmount <= 0) {
    bot.sendMessage(
      chatId,
      "Oops! That's not a valid bet amount. Did you try to bet your imaginary friend's money? 🤔"
    );
    return;
  }

  if (betAmount > users[userId].balance) {
    bot.sendMessage(
      chatId,
      "Whoa there, big spender! You're trying to bet more than you have. Maybe it's time to ask your virtual piggy bank for a loan? 🐷💰"
    );
    return;
  }

  // Simple 50/50 chance of winning
  const win = Math.random() < 0.5;

  if (win) {
    users[userId].balance += betAmount;
    bot.sendMessage(
      chatId,
      `🎉 Jackpot! 🎉 You won $${betAmount}! Your new balance is $${users[userId].balance}. ` +
        `Don't let it go to your head, though. Remember, pride comes before a fall... usually right into our casino! 😈`
    );
  } else {
    users[userId].balance -= betAmount;
    bot.sendMessage(
      chatId,
      `😭 Oh no! You lost $${betAmount}. Your new balance is $${users[userId].balance}. ` +
        `Don't worry, though! In the grand scheme of things, this loss is insignificant... unlike your addiction to gambling. 😅`
    );
  }
});

bot.onText(/\/roulette (red|black) (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const color = match[1];
  const betAmount = parseInt(match[2]);

  if (!users[userId]) {
    users[userId] = { balance: 1000 };
  }

  if (isNaN(betAmount) || betAmount <= 0) {
    bot.sendMessage(
      chatId,
      "Hey, that's not a valid bet! Are you trying to confuse the poor roulette wheel?"
    );
    return;
  }

  if (betAmount > users[userId].balance) {
    bot.sendMessage(
      chatId,
      "Whoa there, high roller! You can't bet what you don't have. Try selling a kidney first. (Just kidding, don't do that!)"
    );
    return;
  }

  const winningColor = Math.random() < 0.5 ? "red" : "black";
  const win = color === winningColor;

  if (win) {
    users[userId].balance += betAmount;
    bot.sendMessage(
      chatId,
      `🎉 Winner, winner, chicken dinner! 🍗 The ball landed on ${winningColor}. You won $${betAmount}. Your new balance is $${users[userId].balance}. Don't spend it all on virtual hats!`
    );
  } else {
    users[userId].balance -= betAmount;
    bot.sendMessage(
      chatId,
      `😭 Oh no! The ball landed on ${winningColor}. You lost $${betAmount}. Your new balance is $${users[userId].balance}. Maybe it's time to consider a career in virtual farming?`
    );
  }
});

console.log("Bot is running...");
