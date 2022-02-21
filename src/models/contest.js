const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const contestSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    imageUrl: String,
    createdBy: {
      type: ObjectId,
      ref: 'User',
    },
    startTime: Date,
    endTime: Date,
    examTime: Number, // Unit: Min
    amountQuestion: Number,
    groupQuestion: {
      type: ObjectId,
      ref: 'Group Question',
    },
    isActive: Boolean,
    password: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Contest', contestSchema);
