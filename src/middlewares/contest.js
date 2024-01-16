const jwt = require('jsonwebtoken');
const asyncMiddleware = require('./async');
const CustomError = require('../errors/CustomError');
const codes = require('../errors/code');
const contestService = require('../services/contest');
const { JWT_SECRET_KEY } = require('../configs');

const checkPassword = async (req, res, next) => {
  const { id } = req.params;
  const contestToken = req.headers['contest-token'];
  const contest = await contestService.checkPasswordInContest(id);
  if (contest && contest.password) {
    if (!contestToken || contestToken === 'null')
      throw new CustomError(codes.UNAUTHORIZED);
    const data = await jwt.verify(contestToken, JWT_SECRET_KEY);
    const password = data.userId;

    if (password !== contest.password) {
      throw new CustomError(codes.UNAUTHORIZED);
    }
  }
  return next();
};

module.exports = {
  checkPassword: asyncMiddleware(checkPassword),
};
