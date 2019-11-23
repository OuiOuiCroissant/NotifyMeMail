module.exports = function createUser(id, username) {
  const mongoose = require('mongoose');
  const user_schema = require('./user_schema.js');

  const User = mongoose.model('User', user_schema, 'Users');

  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).catch((err) => console.log(err));


  User.findOne({ telegramId: id }, (err, res) => {
    if (err) throw err;
    if (res === null) {
      User.create({ telegramId: id, username: username }, (err, res) => {
        if (err) throw err;
      });
    }
  });
}
