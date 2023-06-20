const { WebClient, LogLevel } = require("@slack/web-api");
const { createEventAdapter } = require("@slack/events-api");
require('dotenv').config();

// Initialize a new WebClient instance with bot token
const slackBotClient = new WebClient(process.env.SLACK_BOT_TOKEN, {
  logLevel: LogLevel.DEBUG
});

// Initialize a new event adapter instance
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);

// Start the server listening for incoming events
slackEvents.start(process.env.PORT).then(() => {
  console.log(`Server started on port ${process.env.PORT}`);
});

// Define a function to handle DM events
slackEvents.on("message", async (event) => {
  console.log('Event: ', event)
  try {
    // Disable DMs by sending an error message back to the user
    await slackBotClient.chat.postMessage({
      channel: event.channel,
      text: "Hey, it is not allowed to send DM in this workspace."
    });
  } catch (error) {
    console.error(error);
  }
});