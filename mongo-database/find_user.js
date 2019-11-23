module.exports = function findUser(username) {
  const mongoose = require('mongoose');
  const user_schema = require('./user_schema.js');

  const Client = mongoose.model('Client', user_schema, 'Client');

  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

  Client.findOne({ username: username }, (err, res) => {
    if (err) throw err;
    if (res) return telegramId;
  });
};
