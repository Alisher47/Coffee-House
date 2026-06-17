import { get, post, remove } from "./api.service.js"

// create a function to get coffees;
export const getCoffees = async () => {
    return await get("products");
};

export const getCart = async () => {
    return await get("cart");
}

export const addToCart = async (item) => {
    return await post("cart", item);
}

export const deleteItem = async (id) => {
    return await remove(`cart/${id}`);
}