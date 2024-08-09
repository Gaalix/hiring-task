let tg = window.Telegram.WebApp;
tg.expand();

const stripe = Stripe(
  "pk_test_51PlnbSJomFC47CLrJALlXWjkk9ehqHVohy6VTjVntqhW0xCyLnSJP3z369OmBhLodxU51Ana85XRJiNWYPhzUoFL00mN7Sx4Ms"
);
const elements = stripe.elements();
const cardElement = elements.create("card");
cardElement.mount("#card-element");

async function handlePayment(amount) {
  const paymentResult = document.getElementById("payment-result");
  paymentResult.textContent = "Processing payment...";

  try {
    const response = await fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const { clientSecret } = await response.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    if (result.error) {
      paymentResult.textContent = `Payment failed: ${result.error.message}`;
    } else {
      paymentResult.textContent = "Payment successful!";
      tg.sendData(
        JSON.stringify({ action: "payment_success", amount: amount })
      );
    }
  } catch (error) {
    paymentResult.textContent = `Error: ${error.message}`;
  }
}

tg.MainButton.setText("Close")
  .show()
  .onClick(() => {
    tg.close();
  });
