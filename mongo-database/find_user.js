module.exports = function findUser(username) {
  const mongoose = require('mongoose');
  const user_schema = require('./user_schema.js');

  const User = mongoose.model('User', user_schema, 'Users');

  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

  User.findOne({ username: username }, (err, res) => {
    if (err) {throw err}
    if (res) {let telega = res.telegramId; return telega}
    console.log(telega);
  //  else {let TId = res.telegramId; return TId}
  });
};
