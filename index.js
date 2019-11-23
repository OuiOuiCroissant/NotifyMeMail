const express = require('express');
const request = require('request');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const TelegramBot = require('node-telegram-bot-api');
const createUser = require('./mongo-database/create_user.js');
const findUser = require('./mongo-database/find_user.js');

const app = express();

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/sendmail', (req, res) => {
  res.send('Mail works')

  const msg = {
    to: 'pinkiepie.ny@gmail.com',
    from: 'test@example.com',
    subject: 'test',
    text: 'Text',
    html: 'Html',
  };

  sgMail.send(msg);
});



app.post('/sendtelegram', (req, res) => {
  bot.on('message', msg => {
    const { chat: { id } } = msg;
    const { chat: { username } } = msg;
    console.log(id, username);
    if (msg.text === 'start') {
      createUser(id, username);
      bot.sendMessage(id, `Hello, ${msg.chat.first_name}! You have successfuly signed up for NotifyMe`)
    }
  });

  bot.on('message', msg => {
    const {chat: { username } } = msg;
    if (msg.text === 'stats') {
      findUser(username);
      console.log(telegramId);
      bot.sendMessage(telegramId, 'Your daily stats');
    }
  });
});

app.listen(3535, () => {console.log('3535')})
