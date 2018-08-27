const emaillog = document.querySelector("#Checkemail");
const passwor = document.querySelector("#Checkpassword");
const emailErr2 = document.querySelector("#emailErr");
const passErr = document.querySelector("#passErr");
const login = document.querySelector("#login");


const displayErr2 = (errElem, errMsg) => {
  errElem.innerText = errMsg;
};

const checkEmail2 = () => {
  if (emaillog.validity.typeMismatch) {
    displayErr(emailErr2, "Please enter a valid email address");
  } else if (emaillog.validity.valueMissing) {
    displayErr(emailErr2, "Please enter an email address");
  } else {
    displayErr(emailErr2, "");
    return true;
  }

};

const checkPw2 = () => {
if (passwor.validity.valueMissing) {
    displayErr(passErr, "Please enter a password");
  } else {
    displayErr(passErr, "");
    return true;
  }
};

emaillog.addEventListener("focusout", checkEmail2);
passwor.addEventListener("focusout", checkPw2);

login.addEventListener("click", e => {

  if (!checkEmail2()) {
    event.preventDefault();
  }
  if (!checkPw2()) {
    event.preventDefault();
  }

  const emaillog = document.getElementById("Checkemail").value;
  const password = document.getElementById("Checkpassword").value;
  let user = {
    email: emaillog,
    password: password
  };
  fetchdata("POST", "/login", user)
    .then(res => {
      alert("login");
      window.location = "/";
    })
    .catch(err => alert(err));
});
