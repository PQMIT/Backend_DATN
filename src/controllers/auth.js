const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');
const authService = require('../services/auth');
const Users = require('../models/user');
const UserDeleted = require('../models/userDeleted');

const CLIENT_ID_GOOGLE =
  '802105279409-3f4hr8psra01jd28d9rhuupgp64658k4.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID_GOOGLE);

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const user = await authService.register({ email, name, password });
  return res.send({ status: 1, result: user });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const { accessToken, user } = await authService.login(email, password);
  return res.send({ status: 1, result: { accessToken, user } });
};

const loginByGoogle = async (req, res) => {
  const { tokenId } = req.body;
  const data = await client.verifyIdToken({
    idToken: tokenId,
    audience: CLIENT_ID_GOOGLE,
  });
  // eslint-disable-next-line camelcase
  const { email_verified, email, name, picture } = data.payload;
  const { accessToken, user } = await authService.loginByThirdParty({
    email_verified,
    email,
    name,
    picture,
  });
  return res.send({ status: 1, result: { accessToken, user } });
};

const loginByFacebook = async (req, res) => {
  const { accessToken, userId } = req.body;
  const urlFacebook = `https://graph.facebook.com/v2.11/${userId}?fields=id,name,email,picture&access_token=${accessToken}`;
  const data = await axios.get(urlFacebook);
  const { email, name } = data.data;

  const { accessToken: token, user } = await authService.loginByThirdParty({
    email,
    name,
  });
  return res.send({ status: 1, result: { accessToken: token, user } });
};

const verifyAccessToken = async (req, res) => {
  const { accessToken } = req;
  const user = await authService.verifyAccessToken(accessToken);
  res.send({ status: 1, result: { user } });
};

const deleteUser = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await Users.findOne({ _id: id }).lean();
    if (user) {
      const now = Math.floor(Date.now() / 1000);
      user.deletedAt = now;
      await UserDeleted.deleteOne({ _id: id });
      await Promise.all([
        new UserDeleted(user).save(),
        Users.deleteOne({ _id: id }),
      ]);
      return res
        .status(200)
        .send({ code: 200, message: 'Success', error: null });
    } else {
      return res.status(500).send({ code: 500, message: 'User not found' });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ code: 500, message: 'Error' });
  }
};

module.exports = {
  register,
  login,
  loginByGoogle,
  loginByFacebook,
  verifyAccessToken,
  deleteUser,
};
