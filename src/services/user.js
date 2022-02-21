const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const userDao = require('../daos/user');
const { comparePassword, generatePassword } = require('../utils/auth');

const updateUser = async (userId, data) => {
  const userExist = await userDao.findUser(userId);
  if (!userExist) throw new CustomError(errorCodes.USER_NOT_FOUND);

  const user = await userDao.updateUser(userId, data);
  return user;
};

const verifyPassword = async (userId, password) => {
  const user = await userDao.findUser(userId);
  if (!user) throw new CustomError(errorCodes.USER_NOT_FOUND);
  if (user.password) {
    const isCorrectPassword = await comparePassword(password, user.password);
    if (!isCorrectPassword) throw new CustomError(errorCodes.WRONG_PASSWORD);
  }
};

const updatePassword = async (userId, data) => {
  const { currentPassword, newPassword } = data;
  await verifyPassword(userId, currentPassword);

  const newGeneratePassword = await generatePassword(newPassword);

  const user = await userDao.updateUser(userId, {
    password: newGeneratePassword,
  });
  return user;
};

module.exports = { updateUser, updatePassword, verifyPassword };
