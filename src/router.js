const {
  serverStaticFile,
  insetUser,
  login,
  displayAllpost,
  logout,
  getName,
  addposts,
  addcomments,
  getComment,
  checkVote,
  getUserPost,
  insertVote,
  handelError,
  pages
} = require("./handler/functions.js");
const auth_check = require("./handler/verfiy");

const router = (req, res) => {
  const endponit = req.url;
  if (endponit === "/") {
    pages("home", req, res);
  } else if (endponit.includes("public")) {
    serverStaticFile(req, res);
  } else if (endponit === "/signup" && req.method === "POST") {
    insetUser(req, res);
  } else if (endponit === "/login") {
    login(req, res);
  } else if (endponit === "/createPost") {
    auth_check(req, (err, result) => {
      if (result) {
        pages("createPost", req, res);
      } else {
        pages("home", req, res);
      }
    });
  } else if (endponit === "/createCommnts") {
    pages("createCommant", req, res);
  } else if (endponit === "/UserPost") {
    pages("UserPost", req, res);
  } else if (endponit === "/addposts") {
    if (req.headers.cookie) {
      addposts(req, res);
    } else {
      pages("home", req, res);
    }
  } else if (endponit === "/voteposts") {
    if (req.headers.cookie) {
      insertVote(req, res);
    } else {
      pages("home", req, res);
    }
  } else if (endponit === "/addcomments") {
    if (req.headers.cookie) {
      addcomments(req, res);
    } else {
      pages("home", req, res);
    }
  } else if (endponit === "/getcomments") {
    getComment(req, res);
  } else if (endponit === "/checkvote") {
    if (req.headers.cookie) {
      checkVote(req, res);
    } else {
      pages("home", req, res);
    }
  } else if (endponit === "/getUserPost") {
    getUserPost(req, res);
  } else if (endponit === "/getpost") {
    displayAllpost(req, res);
  } else if (endponit === "/getname") {
    if (req.headers.cookie) {
      getName(req, res);
    } else {
      res.writeHead(200, { "content-type": "applcation/javascript" });
      res.end(JSON.stringify({ err: "/home", result: "Not Memeber" }));
    }
  } else if (endponit === "/logout") {
    logout(req, res);
  } else {
    handelError(res);
  }
};

module.exports = router;
