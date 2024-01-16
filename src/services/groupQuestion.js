const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const groupQuestionDao = require('../daos/groupQuestion');

const findAllGroupQuestionByUser = async ({ userId, key }) => {
  const { data, metadata } = await groupQuestionDao.findAllGroupQuestionByUser({
    key,
    searchFields: ['title'],
    query: { createdBy: userId },
  });

  return { data, metadata };
};

const findGroupQuestionById = async (id) => {
  const groupQuestion = await groupQuestionDao.findGroupQuestion(
    { _id: id },
    null,
    ['createdBy'],
  );
  if (!groupQuestion) {
    throw new CustomError(errorCodes.NOT_FOUND);
  }
  return groupQuestion;
};

const createGroupQuestion = async ({
  title,
  description,
  imageUrl,
  userId,
}) => {
  const groupQuestionExist = await groupQuestionDao.findGroupQuestion({
    title,
    createdBy: userId,
  });
  if (groupQuestionExist) {
    throw new CustomError(errorCodes.ITEM_EXIST);
  }

  const groupQuestion = await groupQuestionDao.createGroupQuestion({
    title,
    description,
    imageUrl,
    createdBy: userId,
  });
  return groupQuestion;
};

const updateGroupQuestion = async (id, data, userId) => {
  const { title } = data;

  const groupQuestionExist = await groupQuestionDao.findGroupQuestion({
    title,
    createdBy: userId,
    _id: { $ne: id },
  });

  if (groupQuestionExist) {
    throw new CustomError(errorCodes.ITEM_EXIST);
  }
  const groupQuestion = await groupQuestionDao.updateGroupQuestion(id, data);
  return groupQuestion;
};

const deleteGroupQuestion = async (id) => {
  await groupQuestionDao.deleteGroupQuestion(id);
};

module.exports = {
  findAllGroupQuestionByUser,
  findGroupQuestionById,
  createGroupQuestion,
  updateGroupQuestion,
  deleteGroupQuestion,
};
