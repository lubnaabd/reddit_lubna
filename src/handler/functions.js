"use strict";
const path = require("path");
const read = require("./read.js");
const { checkvote } = require("../database/queries/getdata");
const { insertvote } = require("../database/queries/postdata");
const { parse } = require("cookie");
const { verify } = require("jsonwebtoken");
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

  read(path.join(__dirname, "..", "..", endponit))
    .then(res => {
      response.end(res);
    })
    .catch(err => {
      response.writeHead(500, { "content-type": "text/html" });
      response.end("<h1>Sorry, There is a problem</h1>");
    });
};
const pages = (dir, request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  const page = {
    home: "public/home.html",
    createPost: "public/createPost.html",
    createCommant: "public/createCommant.html",
    UserPost: "public/UserPost.html"
  };
  const filePath = path.join(__dirname, "..", "..", page[dir]);
  read(filePath)
    .then(res => {
      response.end(res);
    })
    .catch(err => {
      response.writeHead(500, { "content-type": "text/html" });
      response.end("<h1>Sorry, There is a problem</h1>");
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
const checkVote = (request, response) => {
  let data = "";
  request.on("data", function(chunk) {
    data += chunk;
  });
  request.on("end", () => {
    const user_id = JSON.parse(data);
    checkvote(user_id).then(err => {
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify({ err: null, result: JSON.stringify(res) }));
    });
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
          const { post_id, votpostvalue } = finalData;
          const user_id = jwt.userId;
          insertvote(post_id, user_id, votpostvalue)
            .then(res => response.end())
            .catch(err => response.end(JSON.stringify({ err: err })));
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
  read(path.join(__dirname, "..", "..", "public", "errp.html"))
    .then(res => response.end(res))
    .catch(err => response.end(err.message));
};
module.exports = {
  serverStaticFile,
  logout,
  getName,
  handelError,
  checkVote,
  insertVote,
  pages
};
