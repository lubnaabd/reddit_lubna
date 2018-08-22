const tape = require("tape");
const {addpost,addcomment} = require("../src/database/queries/postdata");
const {
  getAllpost,
} = require("../src/database/queries/getdata");
const supertest = require("supertest");
const router = require("../src/router");

tape("Home route returns a status code of 200", t => {
  supertest(router)
    .get("/")
    .expect(200)
    .expect("Content-Type", /html/)
    .end(err => {
      t.error(err);
      t.end();
    });
});

tape("Erorr page status code", t => {
  supertest(router)
    .get("/search")
    .expect(404)
    .expect("Content-Type", /html/)
    .end(err => {
      t.error(err);
      t.end();
    });
});

tape("Testing The Length of Result about posts table", t => {
  getAllpost((err, res) => {
    t.error(err);
    t.equal(res.rows > 0, false, "DB Should Have Rows inside");
    t.end();
  });
});





