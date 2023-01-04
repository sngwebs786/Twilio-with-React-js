const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors()); // Use this after the variable declaration

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
  client.messages
    .create({
      body: `Your OTP is ehTeuE:`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.PHONE_NUMBER,
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.error(err));
});

app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
