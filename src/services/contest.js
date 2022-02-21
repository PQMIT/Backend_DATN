const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const contestDao = require('../daos/contest');
const resultDao = require('../daos/result');
const questionDao = require('../daos/question');
const { checkDate } = require('../utils/date');
const constants = require('../constants');
const { generateAccessToken } = require('../utils/auth');

const findAllContest = async ({ sort, fields }) => {
  const { data, metadata } = await contestDao.findAllContest({
    fields,
    sort,
    query: { isActive: true },
    populate: ['createdBy'],
    exclude: { password: 0 },
  });
  return { data, metadata };
};

const findAllContestJoined = async ({ userId, sort, fields }) => {
  const { data } = await resultDao.findAllResult({
    query: {
      participant: userId,
    },
    sort,
    fields,
    populate: {
      path: 'contest',
      populate: { path: 'createdBy' },
    },
  });
  const listContestId = {};
  const contests = [];
  data.forEach((el) => {
    if (!listContestId[el.contest._id]) {
      listContestId[el.contest._id] = 1;
      contests.push(el.contest);
    }
  });
  return contests;
};

const findAllContestByUser = async ({ userId, sort, fields }) => {
  const { data, metadata } = await contestDao.findAllContest({
    fields,
    sort,
    query: { createdBy: userId },
  });
  return { data, metadata };
};

const checkPasswordInContest = async (id) => {
  const contest = await contestDao.findContest({ _id: id });
  if (!contest) {
    throw new CustomError(errorCodes.NOT_FOUND);
  }
  return contest;
};

const findContestById = async ({ id }) => {
  const contest = await contestDao.findContest({ _id: id }, null, [
    'createdBy',
  ]);
  if (!contest) {
    throw new CustomError(errorCodes.NOT_FOUND);
  }
  if (!contest.isActive) {
    throw new CustomError(errorCodes.CONTEST_IS_PRIVATE);
  }

  if (contest.password) {
    delete contest.password;
    contest.isLock = true;
  }

  const status = checkDate(contest);
  contest.status = status;

  if (status === constants.ENDED) {
    const results = await resultDao.findAllResult({
      query: {
        contest: contest._id,
      },
      populate: ['participant'],
    });
    contest.results = results;
  }
  return contest;
};

const createContest = async ({
  title,
  description,
  imageUrl,
  userId,
  startTime,
  endTime,
  examTime,
  amountQuestion,
  groupQuestion,
  isActive,
  password,
}) => {
  const contest = await contestDao.createContest({
    title,
    description,
    imageUrl,
    createdBy: userId,
    startTime,
    endTime,
    examTime,
    amountQuestion,
    groupQuestion,
    isActive,
    password,
  });
  return contest;
};

const updateContest = async (id, data) => {
  const contest = await contestDao.updateContest(id, data);
  return contest;
};

const deleteContest = async (id) => {
  await contestDao.deleteContest(id);
};

const verifyPassword = async ({ id, password }) => {
  const contest = await contestDao.findContest({
    _id: id,
    password,
  });
  if (!contest) {
    throw new CustomError(errorCodes.NOT_FOUND);
  }
  const contestToken = await generateAccessToken(password);
  return contestToken;
};

const getAllQuestion = async (id) => {
  const contest = await contestDao.findContest({
    _id: id,
  });
  if (!contest) {
    throw new CustomError(errorCodes.NOT_FOUND);
  }

  let listQuestion = [];
  if (contest.groupQuestion) {
    const { data } = await questionDao.findAllQuestion({
      query: {
        groupQuestion: contest.groupQuestion,
      },
      exclude: {
        'answers.isCorrect': 0,
      },
    });
    listQuestion = [...data];
  }
  contest.questions = [...listQuestion];
  return contest;
};

const checkAccountRole = async ({ contestId, userId }) => {
  const contest = await contestDao.findContest({
    _id: contestId,
    createdBy: userId,
  });
  if (!contest) {
    throw new CustomError(errorCodes.NOT_FOUND);
  }
  return constants.ACCOUNT_ROLE_OWNER;
};

module.exports = {
  findAllContest,
  findAllContestJoined,
  findAllContestByUser,
  findContestById,
  createContest,
  updateContest,
  deleteContest,
  verifyPassword,
  getAllQuestion,
  checkAccountRole,
  checkPasswordInContest,
};
