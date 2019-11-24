const express = require('express');
const request = require('request');
const fs = require('fs');
const bodyParser = require('body-parser');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const TelegramBot = require('node-telegram-bot-api');
const createUser = require('./mongo-database/create_user.js');
const findUser = require('./mongo-database/find_user.js');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);



app.post('/sendmail', (req, res) => {
  console.log(req.body);
  res.send(req.body)

  const msg = {
    to: 'pinkiepie.ny@gmail.com',
    from: 'test@example.com',
    subject: 'Отчет NotifyMe',
    text: 'Text',
    html: 'Html',
  };

  sgMail.send(msg);
});



//app.post('/sendtelegram', (req, res) => {
  bot.on('message', msg => {
    const { chat: { id } } = msg;
    const { chat: { username } } = msg;
    if (msg.text === 'start') {
      createUser(id, username);
      bot.sendMessage(id, `Hello, ${msg.chat.first_name}! You have successfuly signed up for NotifyMe`)
    }

    if (msg.text === 'stats') {
      findUser(username);
      bot.sendMessage(telega, 'Your daily stats');
    }
  });
/*
  bot.on('message', msg => {
    const {chat: { username } } = msg;
  });*/
//});

bot.onText(/\/call (.+)/, (msg, match) => {
  siteUrl = match[1];
  const { chat: { id } } = msg;
  bot.sendMessage(id, 'Called?')
});

app.listen((process.env.PORT || 3535), function(){
  console.log('3535');
});
