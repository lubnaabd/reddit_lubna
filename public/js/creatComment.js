const creatPostPage = document.querySelector(".creatPostPage");
const list = document.getElementById("myList");
const innercomment = document.querySelector(".innercomment");
const AddComment = document.getElementById("AddComment");
const header = document.getElementById("header");
const Comment = document.getElementById("Comment");
const notcomment = document.getElementById("notcomment");

window.addEventListener("load", () => {
  let post_id = sessionStorage.getItem("post_id");
  fetchdata("POST", "/getcomments", post_id)
    .then(res => rendering(JSON.parse(res)))
    .catch(err => alert(err));

  fetchdata("GET", "/getname", null)
    .then(res => {
      MemberSession();
      const name = document.createElement("h4");
      name.textContent = res.user_name;
      header.appendChild(name);
    })

    .catch(err => GuestSession());

  AddComment.addEventListener("click", e => {
    const Comment = document.getElementById("Comment").value;
    if (Comment.trim() === "") {
      alert("Please Enter Comment");
    } else {
      let comment = {
        Comment: Comment,
        post_id: post_id
      };

      fetchdata("POST", "/addcomments", comment)
        .then(res => {
          alert(res);
          window.location = "/createCommnts";
        })
        .catch(err => alert(err));
    }
  });

  const MemberSession = restult => {
    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
    const li = document.createElement("li");
    const signout = document.createElement("a");
    signout.classList.add("d-main-nav__item");
    signout.textContent = "logout";
    li.appendChild(signout);
    list.appendChild(li);
    signout.addEventListener("click", e => {
      fetchdata("GET", "/logout", null)
        .then(res => (window.location = "/"))
        .catch(err => alert(err));
    });
  };

  const GuestSession = () => {
    Comment.style.display = "none";
    AddComment.style.display = "none";
    // divText.style.display="none"
  };
});

const rendering = arr => {
  arr.forEach(x => {
    const comments = document.createElement("div");
    if (x.comment !== null) {
      const reply = document.createElement("button");
      const divText = document.createElement("div");
      const commentsreply = document.createElement("div");

      comments.textContent = x.comment;
      reply.textContent = "Reply";
      reply.value = x.id;
      reply.addEventListener("click", e => {
        const textreply = document.createElement("textarea");
        const btnreply = document.createElement("button");
        textreply.rows = 7;

        btnreply.textContent = "Reply";
        textreply.classList.add("replyText");
        btnreply.classList.add("btnreplys");
        divText.classList.add("divText");

        if (divText.style.display === "none") {
          divText.style.display = "block";
          while (divText.hasChildNodes()) {
            divText.removeChild(divText.firstChild);
          }
          divText.appendChild(textreply);
          divText.appendChild(btnreply);
        } else {
          divText.style.display = "none";
        }
      });
      comments.classList.add("commentss");
      commentsreply.classList.add("reply");
      reply.classList.add("btnreply");

      commentsreply.appendChild(reply);
      innercomment.appendChild(comments);
      innercomment.appendChild(commentsreply);
      innercomment.appendChild(divText);
    } else {
      innercomment.textContent = "No Comments This Post";
    }
  });
};
