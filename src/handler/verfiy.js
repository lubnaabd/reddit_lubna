const { parse } = require("cookie");
const { verify } = require("jsonwebtoken");
require("env2")("./config.env");

const auth_check = (request, cb) => {
  if (!request.headers.cookie)
    return cb(new TypeError("Something is Error ! "));
  const { jwt } = parse(request.headers.cookie);
  if (!jwt) return cb(new TypeError("Something is Error ! "));
  verify(jwt, process.env.SECRET, (err, jwt) => {
    if (err) {
      return cb(new TypeError("Fail"));
    } else {
      cb(null, jwt);
    }
  });
};

module.exports = auth_check;
