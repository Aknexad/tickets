const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  passowrd: { type: String, required: true },

  tickets: [],

  isAdmin: Boolean,

  token: { type: String },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
