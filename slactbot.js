const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const port = 3000; // Customize the port as needed

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Slack verification endpoint
app.post("/events", (req, res) => {
  if (req.body.challenge) {
    res.send(req.body.challenge);
  }
});

// Event subscription endpoint
app.post("/events", async (req, res) => {
  const { event } = req.body;

  if (event.type === "message" && event.channel_type === "im") {
    // User sent a direct message (IM)

    // Post the automated response
    const message = {
      token: "xoxb-4726784900181-5436141729799-XDbCse00F1skJVqnOo8RhLAb",
      channel: event.channel,
      text: "Direct messages are disabled, please communicate in your dedicated support channel.",
    };

    try {
      await axios.post("https://slack.com/api/chat.postMessage", message);
    } catch (error) {
      console.error("Failed to post message:", error);
    }
  }

  res.sendStatus(200);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});