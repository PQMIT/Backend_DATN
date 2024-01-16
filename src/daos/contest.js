const Contest = require('../models/contest');
const { findAll, findByCondition } = require('../utils/db');

const findAllContest = async ({
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
    model: Contest,
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

const findContest = async (condition, fields, populate) => {
  const contest = await findByCondition(Contest, condition, fields, populate);
  return contest;
};

const createContest = async ({
  title,
  description,
  imageUrl,
  createdBy,
  startTime,
  endTime,
  examTime,
  amountQuestion = 0,
  groupQuestion,
  isActive = false,
  password,
}) => {
  const contest = await Contest.create({
    title,
    description,
    imageUrl,
    createdBy,
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
  const contest = await Contest.findByIdAndUpdate(id, data, {
    new: true,
  });
  return contest;
};

const deleteContest = async (id) => {
  await Contest.findByIdAndDelete(id);
};

module.exports = {
  findAllContest,
  findContest,
  createContest,
  updateContest,
  deleteContest,
};
