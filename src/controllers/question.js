const questionService = require('../services/question');

const getAllQuestionByGroupQuestion = async (req, res) => {
  const { key, limit, offset, sort, fields, groupQuestionId } = req.body;
  const { user } = req;
  const { data, metadata } =
    await questionService.findAllQuestionByGroupQuestion({
      userId: user._id,
      limit,
      offset,
      key,
      sort,
      fields,
      groupQuestionId,
    });
  return res.send({
    status: 1,
    result: {
      data,
      metadata,
    },
  });
};

const getQuestion = async (req, res) => {
  const { id } = req.params;
  const question = await questionService.findQuestionById(id);
  return res.send({ status: 1, result: { question } });
};

const createQuestion = async (req, res) => {
  const data = req.body;
  const { user } = req;
  const question = await questionService.createQuestion({
    ...data,
    userId: user._id,
  });
  return res.send({ status: 1, result: { question } });
};

const updateQuestion = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const { user } = req;
  const question = await questionService.updateQuestion(id, data, user._id);
  return res.send({ status: 1, result: { question } });
};

const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  await questionService.deleteQuestion(id);
  return res.send({ status: 1 });
};

module.exports = {
  getAllQuestionByGroupQuestion,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
