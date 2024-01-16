const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    avatar: String,
    dob: Date,
    phoneNumber: String,
    urlFacebook: String,
    urlYoutube: String,
    urlWebsite: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('User', userSchema);
