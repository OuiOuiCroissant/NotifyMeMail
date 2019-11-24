const express = require('express');
const request = require('request');
const fs = require('fs');
const bodyParser = require('body-parser');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const TelegramBot = require('node-telegram-bot-api');
const createUser = require('./mongo-database/create_user.js');
const findUser = require('./mongo-database/find_user.js');
const buildHtml = require('./build_html.js');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


app.post('/sendmail', (req, res) => {
  let products_for_email = [];

  let report = req.body;

  let date = report.date;
  let spot_name = report.spot_name;
  let amount_sell_cash = report.amount_sell_cash;
  let amount_sell_card = report.amount_sell_card;
  let user_email = report.products[0].user_email || 'pinkiepie.ny@gmail.com';

  date = date[0]+date[1]+date[2]+date[3]+'.'+date[4]+date[5]+'.'+date[6]+date[7]
  amount_sell_cash = amount_sell_cash.slice(0, -2);
  amount_sell_card = amount_sell_card.slice(0, -2);
  report.products.forEach((item) => {
    products_for_email.push({"product_name": item.product_name, "count": item.count.slice(0, -8), "payed_sum": item.payed_sum.slice(0, -2)});
  });

//  console.log(date, spot_name, amount_sell_cash, amount_sell_card, product_name, count, sum);
  res.send(date);

  const msg = {
    to: user_email,
    from: 'notifyme@example.com',
    subject: 'Отчет NotifyMe',
    text: 'Text',
    html: buildHtml(date, spot_name, amount_sell_cash, amount_sell_card, products_for_email)
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

bot.onText(/\/call (.+)/, (msg, match) => {
  siteUrl = match[1];
  const { chat: { id } } = msg;
  bot.sendMessage(id, 'Called?')
});

app.listen((process.env.PORT || 3535), function(){
  console.log('3535');
});
