const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const resultSchema = new mongoose.Schema(
  {
    participant: {
      type: ObjectId,
      ref: 'User',
    },
    amountCorrectQuestion: Number,
    amountQuestion: Number,
    history: [
      {
        question: {
          type: ObjectId,
          ref: 'Question',
        },
        choice: String,
        isCorrect: Boolean,
      },
    ],
    comment: String,
    doTime: Number,
    contest: {
      type: ObjectId,
      ref: 'Contest',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Result', resultSchema);
