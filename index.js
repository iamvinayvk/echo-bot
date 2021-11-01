//requiring all the modules

require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

//configuring

const { TOKEN, SERVER_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL + URI;

//intializing express app
const app = express();
app.use(express.json());
const init = async () => {
  const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
  console.log(res.data);
};
app.post(URI, async (req, res) => {
  console.log(req.body);
  const chat_id = req.body.message.chat.id;
  const text = req.body.message.text;
  axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chat_id,
    text: text,
  });
  return res.send();
});
app.listen(process.env.PORT || 8443, async () => {
  console.log("🚀 App is running on port :", process.env.PORT || 8443);
  await init();
});
