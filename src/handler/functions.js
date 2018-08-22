"use strict";
const path = require("path");
const read = require("./read.js");
const hashPassword = require("./hashpassword.js");
const { checkUser } = require("../database/queries/checkuser");
const {getAllpost,getcomments,checkvote,getuserpost} = require("../database/queries/getdata");
const {addUser,addpost,addcomment,insertvote} = require("../database/queries/postdata");
const bcrypt = require("bcryptjs");
const { parse } = require("cookie");
const { sign, verify } = require("jsonwebtoken");
require("env2")("./config.env");

const serverStaticFile = (request, response) => {
  const endponit = request.url;
  const extention = endponit.split(".")[1];
  const contenttype = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    jpg: "image/jpg",
    svg: "image/svg+xml",
    png: "image/png",
    json: "application/json",
    gif: "image/gif",
    svg: "image/svg"
  };
  response.writeHead(200, {
    "content-type": contenttype[extention]
  });

  read(path.join(__dirname, "..", "..", endponit), (err, res) => {
    if (err) {
      response.writeHead(500, { "content-type": "text/html" });
      response.end("<h1>Sorry, There is a problem</h1>");
    } else response.end(res);
  });
};
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
          addUser(name, email, hash, (err, res) => {
            if (err) {
              response.end(
                JSON.stringify({ err: "This Email is Already Exists" })
              );
            } else {
              return response.end(
                JSON.stringify({ err: null, result: JSON.stringify(res) })
              );
            }
          });
        }
      });
    }
  });
};
const login = (request, response) => {
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("end", () => {
    const user = JSON.parse(data);
    const { email, password } = user;
    if (user.email && user.password) {
      checkUser(email, password, (err, res) => {
        if (err) {
          response.end(JSON.stringify({ err: err }));
        } else if (!res[0]) {
          return response.end(JSON.stringify({ err: "User Not Found" }));
        } else {
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
        }
      });
    }
  });
};
const pages = (dir, request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  const page = {
    home: "public/home.html",
    createPost: "public/createPost.html",
    createCommant: "public/createCommant.html",
    UserPost: "public/UserPost.html",
  };
  const filePath = path.join(__dirname, "..", "..", page[dir]);
  read(filePath, (err, res) => {
    if (err) {
      response.writeHead(500, { "content-type": "text/html" });
      response.end("<h1>Sorry, There is a problem</h1>");
    } else {
      response.end(res);
    }
  });
};
const displayAllpost = (request, response) => {
  response.writeHead(200, {
    "content-type": "applcation/javascript"
  });
  getAllpost((err, res) => {
    if (err) {
      response.end(JSON.stringify({ err: "err" }));
    } else {
      response.end(JSON.stringify({ err: null, result: JSON.stringify(res) }));
    }
  });
};
const getName = (request, response) => {
  const { jwt } = parse(request.headers.cookie);
  if (jwt) {
    verify(jwt, process.env.SECRET, (err, jwt) => {
      if (err) {
        response.end(JSON.stringify({ err: err.message, result: null }));
      } else {
        response.end(JSON.stringify({ err: null, result: jwt }));
      }
    });
  }
};
const getComment = (request, response) => {
  let data = "";
  request.on("data", function(chunk) {
    data += chunk;
  });
  request.on("end", () => {
    const post_id = JSON.parse(data);
    getcomments(post_id, (err, res) => {
      if (err) {
        response.end(JSON.stringify({ err: err }));
      } else {
        response.writeHead(200, { "content-type": "application/json" });
        response.end(
          JSON.stringify({ err: null, result: JSON.stringify(res) })
        );
      }
    });
  });
};



const getUserPost = (request, response) => {
  let data = "";
  request.on("data", function(chunk) {
    data += chunk;
  });
  request.on("end", () => {
    const user_id = JSON.parse(data);
    getuserpost(user_id, (err, res) => {
      if (err) {
        response.end(JSON.stringify({ err: err }));
      } else {
        response.writeHead(200, { "content-type": "application/json" });
        response.end(
          JSON.stringify({ err: null, result: JSON.stringify(res) })
        );
      }
    });
  });
};
const checkVote = (request, response) => {
  let data = "";
  request.on("data", function(chunk) {
    data += chunk;
  });
  request.on("end", () => {
    const user_id = JSON.parse(data);
    checkvote(user_id, (err, res) => {
      if (err) {
        response.end(JSON.stringify({ err: err }));
      } else {
        response.writeHead(200, { "content-type": "application/json" });
        response.end(
          JSON.stringify({ err: null, result: JSON.stringify(res) })
        );
      }
    });
  });
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
            addpost(title, description, user_id, (err, res) => {
              if (err) {
                response.end(JSON.stringify({ err: err }));
              } else {
                response.end(
                  JSON.stringify({ err: null, result: " added successfuly" })
                );
              }
            });
          }
        }
      });
    }
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
            addcomment(Comment, post_id, user_id, (err, res) => {
              if (err) {
                response.end(JSON.stringify({ err: err }));
              } else {
                response.end(
                  JSON.stringify({ err: null, result: " added successfuly" })
                );
              }
            });
          }
        }
      });
    }
  });
};

const insertVote = (request, response) => {
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
          const {post_id ,votpostvalue} = finalData;
            const user_id = jwt.userId;
            insertvote(post_id,user_id,votpostvalue,(err, res) => {
              if (err) {
                response.end(JSON.stringify({ err: err }));
              } else {
                response.end(
                  // JSON.stringify({ err: null, result: " added successfuly" })
                );
              }
            });
          
        }
      });
    }
  });
};

const logout = (request, response) => {
  response.writeHead(200, {
    "Set-Cookie": `jwt=0; Max-Age=0`
  });
  response.end(JSON.stringify({ err: null, result: null }));
};
const handelError = response => {
  response.writeHead(404, { "content-type": "text/html" });
  read(path.join(__dirname, "..", "..", "public", "errp.html"), (err, res) => {
    if (err) {
      response.end(err.message);
    } else response.end(res);
  });
};
module.exports = {
  serverStaticFile,
  insetUser,
  login,
  displayAllpost,
  logout,
  getName,
  handelError,
  addposts,
  addcomments,
  getComment,
  checkVote,
  insertVote,
  getUserPost,
  pages
};
