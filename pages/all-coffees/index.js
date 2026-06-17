import {
  addToCart,
  getCart,
  getCoffees,
} from "../../services/coffee.service.js";
import { getCategories } from "../../services/dashboard.service.js";

// get filtered buttons;
const filterButton = document.querySelectorAll(".filter-buttons .filter-btn");
// get reset button;
const resetButton = document.getElementById("resetFilter");

let coffeeList = [];
let cart = [];
let cartCount = document.querySelector(".cart-count");

// create a function in which fetch the coffee's list and set in function;
export const fetchCoffees = async () => {
  try {
    let coffees = await getCoffees();
    let cartItem = await getCart();
    displayCoffees(coffees);
    coffeeList = coffees;
    cart = cartItem;
    cartCount.innerHTML = cart.length;
    console.log(cart.length);
  } catch (error) {
    throw error;
  }
};

// create a function to display coffees
export const displayCoffees = async (coffees) => {
  try {
    // get the coffee list div
    let coffeeList = document.querySelector("#products-container");
    coffeeList.className = "products-grid";

    // fetch the categories data from API;

    let categories = await getCategories();
    // set initially coffeeList text empty;
    coffeeList.innerHTML = "";

    // implement the forEach() method to iterate over every coffee;
    coffees.forEach((coffee, index) => {
      // create div element for every coffee
      let coffeeData = document.createElement("div");
      coffeeData.className = "product-card";
      coffeeData.style.animationDelay = `${index * 0.1}s`;

      // filter the category of the coffee;
      let filteredCategory = categories.filter(
        (category) => category.id === coffee.categoryId,
      );
      let coffeeCategory = filteredCategory.map((category) => category.name);

      // create inner HTML structure with coffee data
      coffeeData.innerHTML = `
                <div class="product-image-container">
                    <img class="product-image" src="${coffee.image || "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400"}" alt="${coffee.name}" />
                    ${coffee.featured ? '<span class="featured-badge">⭐ Featured</span>' : ""}
                </div>
                <div class="product-info">
                    <h3 class="product-name">${coffee.name}</h3>
                    <span class="product-category">${coffeeCategory || "Hot Coffee"}</span>
                    <p class="product-description">${coffee.description || "Delicious coffee crafted with love and care."}</p>
                    <div class="product-rating">
                        <div class="stars">
                            ${renderStars(coffee.rating || 4.5)}
                        </div>
                        <span class="rating-value">(${coffee.reviews || 0} reviews)</span>
                    </div>
                    <div class="product-footer">
                        <div class="product-price">
                            $${coffee.price} <small>/ ${coffee.size || "Regular"}</small>
                        </div>
                        <button class="order-button" data-id="${coffee.id}">
                            Order Now ☕
                        </button>
                    </div>
                </div>
                <div class="product-overlay"></div>
            `;

      // append the coffees in coffees grid
      coffeeList.appendChild(coffeeData);
    });

    return coffeeList;
  } catch (error) {
    console.error("Error displaying coffees:", error);
    let coffeeList = document.querySelector("#products-container");
    if (coffeeList) {
      coffeeList.innerHTML = `
                <div class="error-message">
                    <span>⚠️</span>
                    <p>Failed to load coffees. Please try again later.</p>
                </div>
            `;
    }
  }
};

// Helper function to render star ratings
const renderStars = (rating) => {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars += '<span class="star filled">★</span>';
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars += '<span class="star half">½</span>';
    } else {
      stars += '<span class="star">☆</span>';
    }
  }
  return stars;
};

filterButton.forEach((button) => {
  button.addEventListener("click", async (e) => {
    const category = e.target.getAttribute("data-category");
    const coffees = await getCoffees();
    button.className = "filter-btn active";

    if (category === "all") {
      displayCoffees(coffees);
    } else {
      let filteredCoffee = coffees.filter(
        (coffee) => coffee.category === category,
      );
      displayCoffees(filteredCoffee);
    }
  });
});

const handleCart = async (coffee) => {
  try {
    // set the POST API call;
    let result = await addToCart(coffee);
  } catch (error) {
    throw error;
  }
};

const productsContainer = document.getElementById("products-container");

productsContainer.addEventListener("click", async (e) => {
  if (e.target.classList.contains("order-button")) {
    const coffeeId = e.target.dataset.id;
    let selectedItem = coffeeList.find((item) => item.id == coffeeId);
    let result = await handleCart(selectedItem);

  }
});

resetButton.addEventListener("click", async () => {
  filterButton.forEach((btn) => {
    btn.classList.remove("active");
  });

  document.querySelector('[data-category="all"]')?.classList.add("active");

  fetchCoffees();
});

// Navigate on cart page;
let cartPage = document.querySelector(".cart-icon");
cartPage.addEventListener('click', () => {
   window.location.href = "/pages/cart/index.html";
})

fetchCoffees();
