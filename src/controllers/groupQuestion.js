const groupQuestionService = require('../services/groupQuestion');

const getAllGroupQuestionByUser = async (req, res) => {
  const { key } = req.query;
  const { user } = req;
  const { data, metadata } =
    await groupQuestionService.findAllGroupQuestionByUser({
      userId: user._id,
      key,
    });
  return res.send({
    status: 1,
    result: {
      data,
      metadata,
    },
  });
};

const getGroupQuestion = async (req, res) => {
  const { id } = req.params;
  const groupQuestion = await groupQuestionService.findGroupQuestionById(id);
  return res.send({ status: 1, result: { groupQuestion } });
};

const createGroupQuestion = async (req, res) => {
  const data = req.body;
  const { user } = req;
  const groupQuestion = await groupQuestionService.createGroupQuestion({
    ...data,
    userId: user._id,
  });
  return res.send({ status: 1, result: { groupQuestion } });
};

const updateGroupQuestion = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const { user } = req;
  const groupQuestion = await groupQuestionService.updateGroupQuestion(
    id,
    data,
    user._id,
  );
  return res.send({ status: 1, result: { groupQuestion } });
};

const deleteGroupQuestion = async (req, res) => {
  const { id } = req.params;
  await groupQuestionService.deleteGroupQuestion(id);
  return res.send({ status: 1 });
};

module.exports = {
  getAllGroupQuestionByUser,
  getGroupQuestion,
  createGroupQuestion,
  updateGroupQuestion,
  deleteGroupQuestion,
};
