import { get } from "./api.service.js";

// get Categories data API
export const getCategories = async () => {
 return await get("categories");
}

// get customer reviews data through API
export const getReviews = async () => {
  return await get("reviews");
}