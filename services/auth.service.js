import { get, post } from "./api.service.js";

// set the get user api function

export const getUsers = async () => {
  return await get("users")
}

// set the registeruser function
export const registerUser = async (user) => {
  return await post("users", user)
}