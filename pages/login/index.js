// set the BASE_URL for mock API
let BASE_URL = "http://localhost:3000";

let users = []; // create empty array to store user's list

// get login button from HTML using DOM;
let login = document.getElementById("login-btn");

// get the user's list
const getUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    users.push(...data);
    console.log("Loaded users for sigin", users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// create a function for set the payload structure and sign in the user;
const handleSignin = async (e) => {
  try {
    // prevent from page reloading
    e.preventDefault();

    // get values from HTML form using DOM;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // check in users array if the user email and password are same;
    let isAuthenticatedUser = users.some(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password,
    );
    console.log("authenticated user", isAuthenticatedUser);

    if (isAuthenticatedUser == true) {
     // is user match with correct credentials then stores it into localStorage
     
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

getUsers();
