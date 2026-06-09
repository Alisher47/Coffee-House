// Create user Array to store users locally
const users = [];

const btn = document.getElementById("btn");

// Set URL of json-server
const URL = "http://localhost:3000";

// GET request to fetch existing users
const getUsers = async () => {
  try {
    const response = await fetch(`${URL}/users`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    users.push(...data);
    console.log("Loaded users:", users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// POST request to send user payload
const signupPayload = async (user) => {
  try {
    const response = await fetch(`${URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // FIX 4: Added 'await' to resolve the JSON promise properly
    const result = await response.json();

    if (result && (result.id || result.success || result.name)) {
      alert(`User ${user.name} successfully registered`);
      window.location.href = "../login/index.html";
    }

    return result;
  } catch (error) {
    alert(`Signup failed: ${error.message}`);
  }
};

// Form handler function
// FIX 1: Accepts the event 'e' parameter from the listener
const handleSignup = async (e) => {
  try {
    // FIX 1: Stops the form from submitting and reloading the page
    e.preventDefault();

    // Grab the DOM elements themselves for validation methods
    const confirmPasswordInput = document.getElementById("confirm-password");

    // Grab the raw string values for comparisons and payloads
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password").value;
    let confirm_password = confirmPasswordInput.value;

    // Check for empty fields
    if (!name || !email || !password || !confirm_password) {
      alert(`Fields should not be empty`);
      return; // Stop execution if fields are empty
    }

    // FIX 2: Compared strings directly instead of calling '.value' on a string
    if (confirm_password !== password) {
      // FIX 3: Called setCustomValidity on the DOM node, not the text string
      confirmPasswordInput.setCustomValidity("Passwords do not match");
      confirmPasswordInput.reportValidity(); // Forces the browser to show the error bubble
      return; // Stop the signup process
    } else {
      confirmPasswordInput.setCustomValidity("");
    }

    // check if user already exists in db;
    const emailExists = users.some(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );
    if (emailExists) {
      alert("User Already Exists! Please try another email");
      return;
    }

    console.log("email exists", emailExists);

    const payload = {
      name,
      email,
      phone,
      password,
      // You don't usually need to send confirm_password to your backend database
    };

    await signupPayload(payload);
  } catch (error) {
    // FIX 5: Added error logging so you can see errors in the console tab
    console.error("An error occurred in handleSignup:", error);
  }
};

// Event listener passing the event object 'e'
btn.addEventListener("click", (e) => {
  handleSignup(e);
});

// Initialize by getting users
getUsers();
