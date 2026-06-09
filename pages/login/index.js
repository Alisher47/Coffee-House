import { getUsers } from "../../services/auth.service.js";
import { validatorLogin } from "../../utils/validators.js";

// get login button from HTML using DOM;
let login = document.getElementById("login-btn");

// create a function for set the payload structure and sign in the user;
const handleSignin = async (e) => {
  try {
    // prevent from page reloading
    e.preventDefault();

    // get values from HTML form using DOM;
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    let users = await getUsers();

    // check in users array if the user email and password are same;
    let isAuthenticatedUser = users.some(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password,
    );
    console.log("authenticated user", isAuthenticatedUser);

    validatorLogin({email, password})

    if (isAuthenticatedUser == true) {
     // is user match with correct credentials then stores it into localStorage
     localStorage.setItem('currentUser', JSON.stringify(isAuthenticatedUser));
     alert("Login Successfully");
     window.location.href = "../dashboard/index.html";
     
    } else {
      alert("Credentials Not Found");
    }
  } catch (error) {
    alert(`Errorsss ${error}`);
  }
};

login.addEventListener("click", (e) => {
  handleSignin(e);
});

