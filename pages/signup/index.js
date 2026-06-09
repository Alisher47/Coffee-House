// get the functions from services
import { getUsers, registerUser } from "../../services/auth.service.js";
// get the validators for signup
import { validatorSignUp } from "../../utils/validators.js";

// get signup button
let signUp = document.getElementById("signup-btn");

// create a function for register the user
const handleSignUp = async (e) => {
  try {
    // prevent the page from reload
    e.preventDefault();
    // get the form values from form
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document
      .getElementById("confirm-password")
      .value.trim();

    // send these values in validator as a parameter
    validatorSignUp({ name, email, password, confirmPassword });

    // get the user's list
    const users = await getUsers();

    // check user already exists or not;
    const isEmailExist = users.some(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );

    if (isEmailExist) {
      alert("User Already Registered!");
      return;
    }

    const payload = {
      name,
      email,
      password,
      confirmPassword,
    };

    let result = await registerUser(payload);

    // set rule if user successfully registered then navigate to login page
    if (result || result.id) {
      alert(`${name} is Registered Successfully`);
      window.location.href = "../login/index.html";
    }
  } catch (error) {
    alert(`${error}`);
  }
};

signUp.addEventListener("click", (e) => {
  handleSignUp(e);
});
