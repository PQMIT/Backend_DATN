const GroupQuestion = require('../models/groupQuestion');
const { findAll, findByCondition } = require('../utils/db');

const findAllGroupQuestionByUser = async ({
  key,
  searchFields,
  query,
  offset,
  limit,
  fields,
  sort,
  populate,
}) => {
  const { data, metadata } = await findAll({
    model: GroupQuestion,
    key,
    searchFields,
    query,
    offset,
    limit,
    fields,
    sort,
    populate,
  });
  return {
    data,
    metadata,
  };
};

const findGroupQuestion = async (condition, fields, populate) => {
  const question = await findByCondition(
    GroupQuestion,
    condition,
    fields,
    populate,
  );
  return question;
};

const createGroupQuestion = async ({
  title,
  description,
  imageUrl,
  createdBy,
}) => {
  const groupQuestion = await GroupQuestion.create({
    title,
    description,
    imageUrl,
    createdBy,
  });
  return groupQuestion;
};

const updateGroupQuestion = async (id, data) => {
  const groupQuestion = await GroupQuestion.findByIdAndUpdate(id, data, {
    new: true,
  });
  return groupQuestion;
};

const deleteGroupQuestion = async (id) => {
  await GroupQuestion.findByIdAndDelete(id);
};

module.exports = {
  findAllGroupQuestionByUser,
  findGroupQuestion,
  createGroupQuestion,
  updateGroupQuestion,
  deleteGroupQuestion,
};
