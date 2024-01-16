const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const groupQuestionSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    imageUrl: String,
    createdBy: {
      type: ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Group Question', groupQuestionSchema);
