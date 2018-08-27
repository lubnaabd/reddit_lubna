const { checkUser } = require("../database/queries/checkuser");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
require("env2")("./config.env");

const login = (request, response) => {
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("end", () => {
    const user = JSON.parse(data);

    const { email, password } = user;
    if (user.email && user.password) {
      checkUser(email, password)
        .then(res => {
          const userDetails = {
            userId: res[0].id,
            user_name: res[0].user_name
          };
          const cookie = sign(userDetails, process.env.SECRET);
          bcrypt.compare(password, res[0].password, (err, res) => {
            if (err) {
              return new Error("Error");
            } else if (res === false) {
              response.end(JSON.stringify({ err: "error password " }));
            } else {
              response.writeHead(200, {
                "Set-Cookie": `jwt=${cookie}; HttpOnly`
              });
              response.end(
                JSON.stringify({ err: null, result: JSON.stringify(res) })
              );
            }
          });
        })
        .catch(err => response.end(JSON.stringify({ err: err })))
        .catch(res => {
          if (!res[0]) {
            return response.end(JSON.stringify({ err: "User Not Found" }));
          }
        });
    }
  });
};
module.exports = { login };
