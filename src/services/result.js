/* eslint-disable no-plusplus */
const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const resultDao = require('../daos/result');
const questionDao = require('../daos/question');

const findAllResultByContest = async ({ contestId }) => {
  const { data, metadata } = await resultDao.findAllResult({
    query: { contest: contestId },
    sort: ['amountCorrectQuestion_desc'],
    populate: ['participant'],
  });
  return { data, metadata };
};

const findResultById = async (id) => {
  const result = await resultDao.findResult({ _id: id }, null, [
    'participant',
    'history.question',
  ]);
  if (!result) {
    throw new CustomError(errorCodes.NOT_FOUND);
  }
  return result;
};

const findResultByUserInContest = async ({ userId, contestId }) => {
  const { data, metadata } = await resultDao.findAllResult({
    query: { participant: userId, contest: contestId },
    sort: ['createdAt_asc'],
    populate: ['history.question'],
    exclude: {
      participant: 0,
      contest: 0,
    },
  });

  return { data, metadata };
};

const createResult = async ({
  userId,
  doTime,
  contestId,
  groupQuestionId,
  answers,
}) => {
  const { data: listQuestion } = await questionDao.findAllQuestion({
    query: {
      groupQuestion: groupQuestionId,
    },
  });

  const newAnswers = {};
  Object.keys(answers).forEach((el) => {
    const value = answers[el];
    newAnswers[el.toLowerCase()] = value;
  });

  let numQuestionCorrect = 0;
  const history = listQuestion.map((question) => {
    const correctAnswer = question.answers.find((answer) => answer.isCorrect);
    let isCorrect = false;
    if (newAnswers[question._id] === correctAnswer.answerId) {
      isCorrect = true;
      numQuestionCorrect++;
    }
    return {
      question: question._id,
      choice: newAnswers[question._id],
      isCorrect,
    };
  });

  const result = await resultDao.createResult({
    participant: userId,
    amountCorrectQuestion: numQuestionCorrect,
    amountQuestion: listQuestion.length,
    history,
    doTime,
    contest: contestId,
  });

  return result;
};

const updateComment = async ({ resultId, comment }) => {
  const result = resultDao.updateResult(resultId, {
    comment,
  });

  return result;
};

const deleteResult = async (id) => {
  await resultDao.deleteResult(id);
};

module.exports = {
  findAllResultByContest,
  findResultById,
  findResultByUserInContest,
  createResult,
  updateComment,
  deleteResult,
};
