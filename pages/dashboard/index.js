import { getCategories } from "../../services/product.service.js";

// create function for display categories
export const displayCategories = async () => {
  try {
    // get the categories data
    let categories = await getCategories();

    // get the categories grid element for displaying categories
    let categoriesList = document.querySelector("#categories-container");

    // Clear existing content
    categoriesList.innerHTML = "";

    // Loop through categories and create HTML elements
    categories.forEach((category) => {
      // Create category card div
      const categoryCard = document.createElement("div");
      categoryCard.className = "category-card";

      // Add animation delay based on index
      const index = categories.indexOf(category);
      categoryCard.style.animationDelay = `${index * 0.1}s`;

      // Create inner HTML structure
      categoryCard.innerHTML = `
                <img class="category-image" src="${category.image}" />
                <h3 class="category-name">${category.name}</h3>
                <p class="category-description">${category.description}</p>
                <div class="category-stats">
                    <span class="items-count">${category.itemCount || "10+"} items</span>
                    <span class="explore-btn">Explore →</span>
                </div>
                <div class="category-overlay"></div>
            `;

      // Append to categories list
      categoriesList.appendChild(categoryCard);
    });

    return categoriesList;
  } catch (error) {
    console.error("Error displaying categories:", error);

    let categoriesList = document.querySelector("#categories-container");
    if (categoriesList) {
      categoriesList.innerHTML = `
                <div class="error-message">
                    <span>⚠️</span>
                    <p>Failed to load categories. Please try again later.</p>
                </div>
            `;
    }
  }
};

displayCategories();
