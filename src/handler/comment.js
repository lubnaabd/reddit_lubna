const { verify } = require("jsonwebtoken");
const { getcomments } = require("../database/queries/getdata");
const { addcomment } = require("../database/queries/postdata");
const { parse } = require("cookie");

const getComment = (request, response) => {
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("end", () => {
    const post_id = JSON.parse(data);
    getcomments(post_id)
      .then(res => {
        response.writeHead(200, { "content-type": "application/json" });
        response.end(
          JSON.stringify({ err: null, result: JSON.stringify(res) })
        );
      })
      .catch(err => response.end(JSON.stringify({ err: err })));
  });
};

const addcomments = (request, response) => {
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
          const { Comment, post_id } = finalData;
          if (finalData.Comment && finalData.post_id) {
            const user_id = jwt.userId;
            addcomment(Comment, post_id, user_id)
              .catch(err => response.end(JSON.stringify({ err: err })))
              .then(res => {
                response.end(
                  JSON.stringify({ err: null, result: " added successfuly" })
                );
              });
          }
        }
      });
    }
  });
};

module.exports = {
  addcomments,
  getComment
};
