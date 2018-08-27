const name = document.querySelector("#name");
const email1 = document.querySelector("#email1");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const nameErr = document.querySelector("#nameErr");
const emailErr = document.querySelector("#emailErr2");
const passwordErr = document.querySelector("#passwordErr");
const confirmErr = document.querySelector("#confirmErr");
const adduser = document.querySelector("#adduser");

const displayErr = (errElem, errMsg) => {
  errElem.innerText = errMsg;
};
const checkName = () => {
  if (name.value === "") {
    displayErr(nameErr, "Please enter a name");
  }
};
const checkEmail = () => {
  if (email1.validity.typeMismatch) {
    displayErr(emailErr, "Please enter a valid email address");
  } else if (email1.validity.valueMissing) {
    displayErr(emailErr, "Please enter an email address");
  } else {
    displayErr(emailErr, "");
    return true;
  }
};

const checkPw = () => {
  if (password.validity.patternMismatch) {
    displayErr(
      passwordErr,
      "Password must contain at least eight characters, including one letter and one number"
    );
  } else if (password.validity.valueMissing) {
    displayErr(passwordErr, "Please enter a password");
  } else {
    displayErr(passwordErr, "");
    return true;
  }
};

const checkConfirmPw = () => {
  if (password.value != confirmPassword.value) {
    displayErr(confirmErr, "Passwords do not match");
  } else if (confirmPassword.validity.valueMissing) {
    displayErr(confirmErr, "Please confirm your password");
  } else {
    displayErr(confirmErr, "");
    return true;
  }
};

name.addEventListener("focusout", checkName);
email1.addEventListener("focusout", checkEmail);
password.addEventListener("focusout", checkPw);
confirmPassword.addEventListener("focusout", checkConfirmPw);

adduser.addEventListener("click", e => {

  if(!checkName){
    event.preventDefault();
   }
  if (!checkEmail()) {
    event.preventDefault();
  }
  if (!checkPw()) {
    event.preventDefault();
  }
  if (!checkConfirmPw()) {
    event.preventDefault();
  }
  else{const name = document.querySelector("#name").value;
  const email = email1.value;
  const password = document.querySelector("#password").value;
  let user = {
    name: name,
    email: email,
    password: password
  };
  fetchdata("POST", "/signup", user)
    .then(res => {
      alert("sign up");
      window.location = "/";
    })
    .catch(err => alert(err));}
});
