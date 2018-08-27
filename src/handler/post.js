const { parse } = require("cookie");
const { getAllpost, getuserpost } = require("../database/queries/getdata");
const { addpost } = require("../database/queries/postdata");
const { verify } = require("jsonwebtoken");

const displayAllpost = (request, response) => {
  response.writeHead(200, {
    "content-type": "applcation/javascript"
  });
  getAllpost()
    .then(res =>
      response.end(JSON.stringify({ err: null, result: JSON.stringify(res) }))
    )

    .catch(err => response.end(JSON.stringify({ err: "err" })));
};

const addposts = (request, response) => {
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("end", () => {
    const finalData = JSON.parse(data);
    const { jwt } = parse(request.headers.cookie);
    if (jwt) {
      verify(jwt, process.env.SECRET, (err, jwt) => {
        if (err) {
          response.end(JSON.stringify({ err: err.message, result: null }));
        } else {
          const { title, description } = finalData;
          if (finalData.title && finalData.description) {
            const user_id = jwt.userId;
            addpost(title, description, user_id)
              .then(res => {
                response.end(
                  JSON.stringify({ err: null, result: " added successfuly" })
                );
              })
              .catch(err => response.end(JSON.stringify({ err: "err" })));
          }
        }
      });
    }
  });
};

const getUserPost = (request, response) => {
  let data = "";
  request.on("data", function(chunk) {
    data += chunk;
  });
  request.on("end", () => {
    const user_id = JSON.parse(data);
    getuserpost(user_id)
      .then(res => {
        response.writeHead(200, { "content-type": "application/json" });
        response.end(
          JSON.stringify({ err: null, result: JSON.stringify(res) })
        );
      })

      .catch(err => response.end(JSON.stringify({ err: err })));
  });
};
module.exports = { displayAllpost, addposts, getUserPost };
