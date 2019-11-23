const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
  telegramId: {
    type: Number,
    unique: true
  },
  username: {
    type: String,
    unique: true
  }
});

module.exports = user_schema;
