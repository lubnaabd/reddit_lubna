const dbconnection = require("../db_connection");

const getuserpost = (user_id)=>new Promise((resolve, reject)  => {
  const sqluser = { text: "SELECT *  FROM post where user_id=$1;", values: [user_id] };
  dbconnection.query(sqluser, (err, res) => {
    if (err) {
      return reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

const getAllpost = ()=>new Promise((resolve, reject)  => {
  const sqlpost = {
    text:
      "SELECT SUM(COALESCE(votpost.votpostValue, 0)),COALESCE(votpost.votpostValue, 0) as votpostValue ,post.* from post left join votpost ON votpost.post_id = post.id group by votpost.votpostValue ,post.id"
  };
  dbconnection.query(sqlpost, (err, res) => {
    if (err) {
      return reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

const getcomments = (post_id) =>new Promise((resolve, reject)  => {
  const sqlcomment = {
    text: "SELECT *  FROM comments WHERE post_id = $1 order by id DESC",
    values: [post_id]
  };
  dbconnection.query(sqlcomment, (err, res) => {
    if (err) {
      return reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

const checkvote = (user_id)=>new Promise((resolve, reject)  => {
  const sqlvot = {
    text: "SELECT *  FROM votpost WHERE user_id = $1 and votpostvalue = 1",
    values: [user_id]
  };
  dbconnection.query(sqlvot, (err, res) => {
    if (err) {
      return reject(err);
    } else {
      resolve(res.rows);
    }
  });
});
module.exports = {
  getuserpost,
  getAllpost,
  getcomments,
  checkvote
};
