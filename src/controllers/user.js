const userService = require('../services/user');

const updateUser = async (req, res) => {
  const data = req.body;
  const { user } = req;
  console.log(data);
  try {
    const userInfo = await userService.updateUser(user._id, data);
    return res.send({ status: 1, result: { user: userInfo } });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: 0, error });
  }
};

const changePassword = async (req, res) => {
  const data = req.body;
  const { user } = req;
  await userService.updatePassword(user._id, data);
  return res.send({ status: 1 });
};

module.exports = { updateUser, changePassword };
