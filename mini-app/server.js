require("dotenv").config();
const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const localtunnel = require("localtunnel");

const app = express();
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

app.use(express.json());
app.use(express.static("public"));

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

(async () => {
  const tunnel = await localtunnel({ port: PORT });
  console.log(`Tunnel URL: ${tunnel.url}`);

  bot.onText(/\/deposit/, (msg) => {
    const chatId = msg.chat.id;
    const webAppUrl = `${tunnel.url}/index.html`;
    bot.sendMessage(chatId, "Click the button below to make a deposit:", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Open Deposit App", web_app: { url: webAppUrl } }],
        ],
      },
    });
  });

  tunnel.on("close", () => {
    console.log("Tunnel closed");
  });

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();

bot.on("web_app_data", (msg) => {
  const data = JSON.parse(msg.web_app_data.data);
  if (data.action === "payment_success") {
    bot.sendMessage(
      msg.chat.id,
      `Great! Your deposit of ${data.amount / 100}€ was successful.`
    );
  }
});
