const constants = require('../constants');

function checkDate(el) {
  const date = new Date();
  const startTime = new Date(el.startTime);
  const endTime = el.endTime && new Date(el.endTime);
  if (endTime && endTime < date) {
    return constants.ENDED;
  }
  if (startTime > date) {
    return constants.UPCOMING;
  }
  return constants.HAPPENING;
}

module.exports = {
  checkDate,
};
