const dbconnection = require("../db_connection");

const checkUser = (email, password)=>new Promise((resolve, reject)  => {
  const sql = {
    text: `SELECT * FROM users WHERE email=$1`,
    values: [email]
  };
  dbconnection.query(sql, (err, res) => {
    if (err) {
      return  reject(err);
    } else {
      resolve(res.rows) ;
    }
  });
});

module.exports = {
  checkUser
};
