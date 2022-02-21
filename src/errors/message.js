const codes = require('./code');

const getErrorMessage = (code) => {
  switch (code) {
    case codes.NOT_FOUND:
      return 'Not found';
    case codes.INTERNAL_SERVER_ERROR:
      return 'Internal server error';
    case codes.UNAUTHORIZED:
      return 'Unauthorized';
    case codes.USER_NOT_FOUND:
      return 'User is not found';
    case codes.WRONG_PASSWORD:
      return 'Wrong password';
    case codes.EMAIL_EXIST:
      return 'Email existed';
    case codes.ITEM_EXIST:
      return 'Item is exist';
    case codes.CONTEST_IS_PRIVATE:
      return 'Contest is private';
    default:
      return null;
  }
};

module.exports = getErrorMessage;
