const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const questionSchema = new mongoose.Schema(
  {
    level: String, // EASY, MEDIUM, HARD
    title: String,
    description: String,
    explain: String,
    answers: [
      {
        answerId: String,
        position: Number,
        content: String,
        isCorrect: Boolean,
      },
    ],
    groupQuestion: {
      type: ObjectId,
      ref: 'Group Question',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Question', questionSchema);
