import { get } from "./api.service.js"

// create a function to get coffees;
export const getCoffees = async () => {
    return await get("products");
}