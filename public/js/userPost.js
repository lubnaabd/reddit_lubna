const btnpost = document.querySelector("#Create_Post");
const creatPostPage = document.querySelector(".creatPostPage");
const list = document.getElementById("myList");
const header = document.getElementById("header");
const model = document.getElementById("model");
const inner = document.querySelector(".inner");

window.addEventListener("load", () => {
  let user_id = sessionStorage.getItem("user_id");

  fetchdata("GET", "/getname", null)
    .then(res => {
      MemberSession();
      const name = document.createElement("h4");
      name.textContent = res.user_name;
      header.appendChild(name);
      model.style.visibility = "hidden";
    })
    .catch(err => GuestSession());

  fetchdata("POST", "/getUserPost", user_id)
    .then(res => {
      let arr = JSON.parse(res);
      rendering(arr);
    })
    .catch(err => alert(err));

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
    // console.log("Guest Session");
  };
});

const rendering = arr => {
  arr.forEach(x => {
    const innerpost = document.createElement("div");
    const inner = document.querySelector(".post1");
    const post = document.createElement("div");
    const inner2 = document.createElement("div");
    const div = document.createElement("div");
    const title = document.createElement("div");
    const dis = document.createElement("div");
    const vote = document.createElement("div");
    const disEle = document.createElement("h3");
    const imgEle = document.createElement("img");
    const commnts = document.createElement("button");
    const votdown = document.createElement("i");
    const votup = document.createElement("i");
    const votpost = document.createElement("div");

    commnts.textContent = "Comments";
    const title1 = x.title;
    const description = x.description;
    const imgPost = x.img_post;
    const votpostvalue = x.sum;
    title.textContent = title1;
    disEle.textContent = description;
    if (imgPost !== null) {
      imgEle.src = imgPost;
    }
    votpost.textContent = votpostvalue;

    votup.addEventListener("click", e => {
      votup.style.background = "red";
      votpost.style.color = "red";
      votdown.style.background = "transparent";
    });

    votdown.addEventListener("click", e => {
      votup.style.background = "transparent";
      votpost.style.color = "#000000";
      votdown.style.background = "red";
    });

    commnts.addEventListener("click", e => {
      const post_id = x.id;
      sessionStorage.setItem("post_id", post_id);
      window.location = "/createCommnts";
    });

    inner2.classList.add("inner2");
    title.classList.add("title");
    dis.classList.add("dis");
    votpost.classList.add("votpost");
    innerpost.classList.add("innerpost");
    post.classList.add("post");
    commnts.classList.add("btnADDpost");
    vote.classList.add("vote");
    votup.classList.add("far");
    votup.classList.add("fa-arrow-alt-circle-up");
    votdown.classList.add("far");
    votdown.classList.add("fa-arrow-alt-circle-down");

    div.appendChild(imgEle);
    div.appendChild(disEle);
    dis.appendChild(div);
    inner2.appendChild(title);
    inner2.appendChild(dis);
    inner2.appendChild(commnts);
    innerpost.appendChild(vote);
    innerpost.appendChild(inner2);
    post.appendChild(innerpost);
    inner.appendChild(post);
  });
};
