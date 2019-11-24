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

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


app.post('/sendmail', (req, res) => {
  console.log(req.body);

//  let html = buildHtml("2019.23.23", "Test Place");
  //let report = JSON.parse(req.body);
  //console.log(report);

//  let date = report.date;
/*  let spotname = report.spotname;
  let cash = report.amount_sell_cash;
  let card = report.amount_sell_card;
  let product_name = report.product[0].product_name;
  let count = report.product[0].count;
  let sum = report.product[0].payed_sum;*/
//  console.log(date);
//  res.send(date/*, spotname, cash, card, product_name, count, sum*/);

  res.send(req.body);

  const msg = {
    to: 'pinkiepie.ny@gmail.com',
    from: 'test@example.com',
    subject: 'Отчет NotifyMe',
    text: 'Text',
    html: buildHtml("2019.23.23", "Test Place"),
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
