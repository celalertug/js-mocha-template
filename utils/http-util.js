const makeResponse = (code = 200, success = true, msg = '', data = {}) => ({
  code,
  success,
  msg,
  data,
});

module.exports = { makeResponse };
