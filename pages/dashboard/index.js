import { getCategories, getReviews } from "../../services/dashboard.service.js";

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
        <div class="category-image-container">
          <img class="category-image" src="${category.image}" alt="${category.name}" />
        </div>
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

// Function to render star ratings
const renderStars = (rating) => {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<span class="star filled">★</span>';
    } else {
      stars += '<span class="star">☆</span>';
    }
  }
  return stars;
};

// create function for display Reviews
export const displayReviews = async () => {
  try {
    // get the reviews data
    let reviews = await getReviews();


    // get the reviews grid element
    let reviewsList = document.querySelector("#testimonials-container");

    // Clear existing content
    reviewsList.innerHTML = "";

    // Loop through reviews and create HTML elements
    reviews.forEach((review, index) => {
      // Create review card div
      const reviewCard = document.createElement("div");
      reviewCard.className = "review-card";

      // Add animation delay based on index
      reviewCard.style.animationDelay = `${index * 0.1}s`;

      // Create inner HTML structure for review
      reviewCard.innerHTML = `
        <div class="review-quote">"</div>
        <div class="review-header">
          <div class="customer-avatar">
            ${review.customerImage || "👤"}
          </div>
          <div class="customer-info">
            <h3 class="customer-name">${review.customerName}</h3>
            <div class="customer-rating">
              ${renderStars(review.rating)}
              <span class="rating-number">(${review.rating}.0)</span>
            </div>
          </div>
          ${review.verified ? '<div class="verified-badge">✓ Verified</div>' : ''}
        </div>
        
        <p class="review-text">"${review.review}"</p>
        
        <div class="review-footer">
          <div class="review-meta">
            <span class="review-category">☕ ${review.category}</span>
            <span class="review-date">📅 ${review.date}</span>
          </div>
        </div>
        
        <div class="review-overlay"></div>
      `;

      // Append to reviews list
      reviewsList.appendChild(reviewCard);
    });

    return reviewsList;
  } catch (error) {
    console.error("Error displaying reviews:", error);

    let reviewsList = document.querySelector("#testimonials-container");
    if (reviewsList) {
      reviewsList.innerHTML = `
        <div class="error-message">
          <span>⚠️</span>
          <p>Failed to load reviews. Please try again later.</p>
        </div>
      `;
    }
  }
};

// Initialize both displays
displayCategories();
displayReviews();
