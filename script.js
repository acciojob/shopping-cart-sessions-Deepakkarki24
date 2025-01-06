// Sample Product Data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Select DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartButton = document.getElementById("clear-cart-btn");

// Function to render products
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(li);
  });
}

// Function to add product to cart
function addToCart(productId) {
  const cart = getCart();
  const product = products.find((p) => p.id === productId);
  cart.push(product);
  updateCart(cart);
  saveCart(cart);
}

// Function to render the cart
function renderCart() {
  cartList.innerHTML = ""; // Clear existing cart items
  const cart = getCart();
  cart.forEach((product, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
      <button onclick="removeFromCart(${index})">Remove</button>`;
    cartList.appendChild(li);
  });
}

// Function to remove an item from the cart
function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1); // Remove the item at the given index
  updateCart(cart);
  saveCart(cart);
}

// Function to clear the cart
function clearCart() {
  updateCart([]);
  saveCart([]);
}

// Function to get the cart from session storage
function getCart() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Function to save the cart to session storage
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Function to update the cart display
function updateCart(cart) {
  renderCart(cart);
}

// Event listener for clearing the cart
clearCartButton.addEventListener("click", clearCart);

// Initialize the page
function initialize() {
  renderProducts();
  renderCart();
}

initialize();
