const { App } = require('@slack/bolt');
require('dotenv').config()

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

/* Add functionality here */
app.event('message', (args) => {
  console.log('Event: Message: ', args);
});

app.event('im_created', (args, user) => {
  console.log('DM Event-Created: ', args, user)
})

app.event('im_updated', (args, user) => {
  console.log('DM Event-Updated: ', args, user)
})

// Reverse all messages the app can hear
// app.message(async ({ message, say }) => {
//   console.log("Message: ", message)
//   // Filter out message events with subtypes (see https://api.slack.com/events/message)
//   if (message.subtype === undefined || message.subtype === 'bot_message') {
//     const reversedText = [...message.text].reverse().join("");
//     await say(reversedText);
//   }
// });

// (async () => {
  // Start the app
  app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running! - ', process.env.PORT);
// })();