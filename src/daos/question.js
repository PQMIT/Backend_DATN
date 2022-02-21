const Question = require('../models/question');
const { findAll, findByCondition } = require('../utils/db');

const findAllQuestion = async ({
  key,
  searchFields,
  query,
  offset,
  limit,
  fields,
  sort,
  populate,
  exclude,
}) => {
  const { data, metadata } = await findAll({
    model: Question,
    key,
    searchFields,
    query,
    offset,
    limit,
    fields,
    sort,
    populate,
    exclude,
  });
  return {
    data,
    metadata,
  };
};

const findQuestion = async (condition, fields, populate) => {
  const question = await findByCondition(Question, condition, fields, populate);
  return question;
};

const createQuestion = async ({
  title,
  description,
  explain,
  answers = [],
  level,
  groupQuestion,
}) => {
  const question = await Question.create({
    title,
    description,
    explain,
    answers,
    level,
    groupQuestion,
  });

  return question;
};

const updateQuestion = async (id, data) => {
  const question = await Question.findByIdAndUpdate(id, data, {
    new: true,
  });
  return question;
};

const deleteQuestion = async (id) => {
  await Question.findByIdAndDelete(id);
};

module.exports = {
  findAllQuestion,
  findQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
