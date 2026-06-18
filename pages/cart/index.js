import { deleteItem, getCart } from "../../services/coffee.service.js";

// access the cart count div using DOM;
let cartCount = document.querySelector(".cart-count");
let itemCount = document.querySelector(".item-count");

// get the items;
let coffeeItems = [];

// get the subtotal field;
let subTotal = document.getElementById("subtotal");
// get the delivery fee field;
let deliveryFee = document.getElementById("deliveryFee");
// get tax field;
let tax = document.getElementById("tax");
// get Total Field;
let total = document.getElementById("total");
// promo code;
let promoValue = "PAK097";

// fetch the cart items array;
const fetchCartItems = async () => {
  let items = await getCart();

  coffeeItems = items;

  cartCount.textContent = coffeeItems.length;
  itemCount.textContent = `${coffeeItems.length} items`;

  updateTotals();
  handleCartItems(coffeeItems);
};

const updateTotals = (code) => {
  const subTotalPrice = coffeeItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  subTotal.textContent = `$${subTotalPrice}`;

  const deliveryFeePrice = subTotalPrice * 0.1;
  deliveryFee.textContent = `$${deliveryFeePrice.toFixed(2)}`;

  const taxAmount = subTotalPrice * 0.08;
  tax.textContent = `$${taxAmount.toFixed(2)}`;

  let totalAmount = subTotalPrice + deliveryFeePrice + taxAmount;
  total.textContent = `$${totalAmount.toFixed(2)}`;

  if (code === promoValue) {
    let promoCodeAmount = subTotalPrice + deliveryFeePrice + taxAmount * 0.1;

    total.textContent = `$${promoCodeAmount.toFixed(2)}`;
  }
};

// function for display cart items;
const handleCartItems = async (items) => {
  try {
    // access the div where items list shown;
    let itemsDiv = document.querySelector("#cart-items-container");
    itemsDiv.className = "cart-items-grid";
    itemsDiv.innerHTML = "";

    // set the forEach method on cart items to display and modify the elements;
    items.forEach((item, index) => {
      // create div for every item;
      let itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.style.animationDelay = `${index * 0.1}s`;

      // display the item details with +, -, and beautiful trash button;
      itemDiv.innerHTML = `
        <div class="cart-item-image">
          <img src="${item.image || "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400"}" alt="${item.name}" />
        </div>
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.name}</h4>
          <span class="cart-item-category">${item.category || "Coffee"}</span>
          <span class="cart-item-price">$${item.price}</span>
        </div>
        <div class="cart-item-actions">
          <div class="quantity-control">
            <button class="quantity-btn minus-btn" data-id="${item.id}">−</button>
            <span class="quantity-value">${item.quantity || 1}</span>
            <button class="quantity-btn plus-btn" data-id="${item.id}">+</button>
          </div>
          <button class="remove-item-btn" data-id="${item.id}">
            <svg class="trash-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      `;

      itemsDiv.appendChild(itemDiv);
    });

    return itemsDiv;
  } catch (error) {
    console.error("Error displaying cart items:", error);
  }
};

// function for delete the item;
const handleDeleteItem = async (productId) => {
  try {
    await deleteItem(productId);
    await fetchCartItems();
  } catch (error) {
    throw error;
  }
};

let increament = document.getElementById("cart-items-container");
increament.addEventListener("click", (e) => {
  let increamentButton = e.target.closest(".plus-btn");
  if (!increamentButton) return;

  let itemId = increamentButton.dataset.id;

  const quantityElement =
    increamentButton.parentElement.querySelector(".quantity-value");

  let selectedItem = coffeeItems.find((item) => item.id == itemId);

  if (increamentButton) {
    quantityElement.textContent = ++selectedItem.quantity;
    updateTotals();
  }
});

// decreament button for decrease quantity;
let decreament = document.getElementById("cart-items-container");
decreament.addEventListener("click", async (e) => {
  let decreamentButton = e.target.closest(".minus-btn");

  if (!decreamentButton) return;
  let itemId = decreamentButton.dataset.id;

  let selectedItem = coffeeItems.find((item) => item.id == itemId);

  if (selectedItem.quantity > 1) {
    const quantityElement =
      decreamentButton.parentElement.querySelector(".quantity-value");

    quantityElement.textContent = --selectedItem.quantity;
    updateTotals();
  }
});

let btn = document.getElementById("cart-items-container");
btn.addEventListener("click", async (e) => {
  let removeButton = e.target.closest(".remove-item-btn");

  if (!removeButton) return;
  // get the coffee id from dataset;
  let coffeeId = removeButton.dataset.id;
  let selectedItem = coffeeItems.find((item) => item.id == coffeeId);
  await handleDeleteItem(selectedItem.id);
});

// set the hardcoded promo code value;

let text = document.querySelector(".promo-message");

// get the apply button;
let applyCode = document.getElementById("applyPromoBtn");
applyCode.addEventListener("click", () => {
  let promoCode = document.getElementById("promoInput").value.trim();
  if (promoCode === promoValue) {
    text.innerHTML = "Promo Code Applied! Enjoy Your 10% Off 🎉";
  } else {
    text.innerHTML = "Wrong Promo Code! Please Try Again";
  }
  updateTotals(promoCode);
});

fetchCartItems();
