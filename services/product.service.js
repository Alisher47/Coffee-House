import { get } from "./api.service.js";

// get Categories data API
export const getCategories = async () => {
 return await get("categories");
}