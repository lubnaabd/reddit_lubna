const dbconnection = require("../db_connection");

const addUser = (user_name, email, password) => new Promise((resolve, reject)  => {
  let sql = {
    text:
      "INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) RETURNING id ;",
    values: [user_name, email, password]
  };
  dbconnection.query(sql, (err, res) => {
    if (err) {
      return reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

const addpost = (title, description, user_id)=>new Promise((resolve, reject)  => {
  let sql = {
    text:
      "INSERT INTO post (title, description, user_id) VALUES ($1, $2, $3) ;",
    values: [title, description, user_id]
  };
  dbconnection.query(sql, (err, res) => {
    if (err) {
      return reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

const addcomment = (comment, post_id, user_id) =>new Promise((resolve, reject)  => {
  let sql = {
    text:
      "INSERT INTO comments (comment, post_id, user_id) VALUES ($1, $2, $3) ;",
    values: [comment, post_id, user_id]
  };
  dbconnection.query(sql, (err, res) => {
    if (err) {
      return reject(err);
    } else {
      resolve(res.rows);
    }
  });
});



const insertvote = ( post_id,user_id,votpostvalue)=>new Promise((resolve, reject)  => {
  let sql = {
    text:
      "INSERT INTO votpost (post_id,user_id,votpostvalue) VALUES ($1, $2, $3) ;",
    values: [post_id,user_id,votpostvalue]
  };
  dbconnection.query(sql, (err, res) => {
    if (err) {
      return reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

module.exports = { addUser, addpost, addcomment,insertvote };
