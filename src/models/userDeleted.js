const mongoose = require('mongoose');

const userDeletedSchema = new mongoose.Schema(
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
    deletedAt: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('userDeleted', userDeletedSchema);
