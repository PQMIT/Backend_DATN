const contestService = require('../services/contest');
const resultService = require('../services/result');

const getAllContest = async (req, res) => {
  const { sort, fields } = req.query;
  const { data, metadata } = await contestService.findAllContest({
    sort,
    fields,
  });
  return res.send({
    status: 1,
    result: {
      data,
      metadata,
    },
  });
};

const getAllContestJoined = async (req, res) => {
  const { sort, fields } = req.query;
  const { user } = req;
  const contests = await contestService.findAllContestJoined({
    userId: user._id,
    sort,
    fields,
  });
  return res.send({
    status: 1,
    result: {
      contests,
    },
  });
};

const getAllContestByUser = async (req, res) => {
  const { sort, fields } = req.query;
  const { user } = req;
  const { data, metadata } = await contestService.findAllContestByUser({
    userId: user._id,
    sort,
    fields,
  });
  return res.send({
    status: 1,
    result: {
      data,
      metadata,
    },
  });
};

const getContest = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const contest = await contestService.findContestById({
    id,
    userId: user._id,
  });
  return res.send({ status: 1, result: { contest } });
};

const createContest = async (req, res) => {
  const data = req.body;
  const { user } = req;
  const contest = await contestService.createContest({
    ...data,
    userId: user._id,
  });
  return res.send({ status: 1, result: { contest } });
};

const updateContest = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const { user } = req;
  const contest = await contestService.updateContest(id, data, user._id);
  return res.send({ status: 1, result: { contest } });
};

const deleteContest = async (req, res) => {
  const { id } = req.params;
  await contestService.deleteContest(id);
  return res.send({ status: 1 });
};

const verifyPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const contestToken = await contestService.verifyPassword({ id, password });
  return res.send({ status: 1, result: { contestToken } });
};

const getAllQuestion = async (req, res) => {
  const { id } = req.params;
  const contest = await contestService.getAllQuestion(id);
  return res.send({ status: 1, result: { contest } });
};

const mark = async (req, res) => {
  const data = req.body;
  const { id: contestId } = req.params;
  const { user } = req;
  const result = await resultService.createResult({
    userId: user._id,
    contestId,
    ...data,
  });

  return res.send({ status: 1, result: { result } });
};

const getAllResultByContest = async (req, res) => {
  const { id: contestId } = req.params;
  const { data, metadata } = await resultService.findAllResultByContest({
    contestId,
  });

  return res.send({ status: 1, result: { data, metadata } });
};

const getAllResultByUserInContest = async (req, res) => {
  const { id: contestId } = req.params;
  const { user } = req;
  const { data, metadata } = await resultService.findResultByUserInContest({
    contestId,
    userId: user._id,
  });

  return res.send({ status: 1, result: { data, metadata } });
};

const checkAccountRole = async (req, res) => {
  const { contestId, userId } = req.params;
  const role = await contestService.checkAccountRole({ contestId, userId });
  return res.send({ status: 1, result: { role } });
};

module.exports = {
  getAllContest,
  getAllContestJoined,
  getAllContestByUser,
  getContest,
  createContest,
  updateContest,
  deleteContest,
  verifyPassword,
  getAllQuestion,
  mark,
  getAllResultByContest,
  getAllResultByUserInContest,
  checkAccountRole,
};
