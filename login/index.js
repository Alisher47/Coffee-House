// set the BASE_URL for mock API
let BASE_URL = "http://localhost:3000";

let users = []; // create empty array to store user's list


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

const signinPayload = async () => {
 try {
    
 } catch (error) {
    
 }
}

getUsers();