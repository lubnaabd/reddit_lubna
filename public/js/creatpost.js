const btnpost = document.querySelector("#Create_Post");
const creatPostPage = document.querySelector(".creatPostPage");
const list = document.getElementById("myList");
const AddPost = document.getElementById("Add_Post");
const header = document.getElementById("header");

window.addEventListener("load", () => {
  fetchdata("GET", "/getname", null)
    .then(res => {
      MemberSession();
      const name = document.createElement("h4");
      name.textContent = res.user_name;
      header.appendChild(name);
    })
    .catch(err => GuestSession());

  AddPost.addEventListener("click", e => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    if (title.trim() === "" && description.trim() === "") {
      alert("Please Enter title & description");
    } else {
      let post = {
        title: title,
        description: description
      };
      fetchdata("POST", "/addposts", post)
        .then(res => {
          alert(res);
          window.location = "/";
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
        .then(res => {
          window.location = "/";
        })
        .catch(err => alert(err));
    });
  };

  const GuestSession = () => {};
});
