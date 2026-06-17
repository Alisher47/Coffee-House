import { BASE_URL } from "../config/config.js";

export const get = async (endpoint) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return await response.json();
};

export const post = async (endpoint, payload) => {
  const response = await fetch(
    `${BASE_URL}/${endpoint}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return await response.json();
};

export const remove = async (endpoint) => {
  const response = await fetch(
    `${BASE_URL}/${endpoint}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
};