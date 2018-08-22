const emaillog = document.querySelector('#Checkemail');
const passwor = document.querySelector('#Checkpassword');
const emailErr2 = document.querySelector('#emailErr');
const login = document.querySelector('#login');

const displayErr2 = (errElem, errMsg) => {
    errElem.innerText = errMsg;
  }

const checkEmail2 = () => {
    if (email.validity.typeMismatch) {
      displayErr(emailErr, "Please enter a valid email address");
    } else if (email.validity.valueMissing) {
      displayErr(emailErr, "Please enter an email address");
    } else {
      displayErr(emailErr, "");
      return true;
    }
  };
  emaillog.addEventListener("focusout", checkEmail);

login.addEventListener("click", e => {
    const emaillog = document.getElementById("Checkemail").value;
    const password = document.getElementById("Checkpassword").value;
    let user = {
      email: emaillog,
      password: password
    };
    fetchdata("POST", "/login", user, (err, res) => {
     if (err) {
        alert(err);
      } else {
        alert("login");
        window.location = '/';
      }
    });
  });