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
          // explain: String,
        },
        choice: String,
        isCorrect: Boolean,
        // content: String,
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
