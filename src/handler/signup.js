const hashPassword = require("./hashpassword.js");
const { addUser } = require("../database/queries/postdata");

const insetUser = (request, response) => {
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("end", () => {
    const user = JSON.parse(data);
    const { name, email, password } = user;
    if (user.name && user.email && user.password) {
      hashPassword(password, (err, hash) => {
        if (err) {
          response.end(JSON.stringify({ err: err }));
        } else {
          addUser(name, email, hash)
            .then(res => {
              return response.end(
                JSON.stringify({ err: null, result: JSON.stringify(res) })
              );
            })
            .catch(err =>
              response.end(
                JSON.stringify({ err: "This Email is Already Exists" })
              )
            );
        }
      });
    }
  });
};

module.exports = { insetUser };
