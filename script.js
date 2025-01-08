// Updated JavaScript Code to Fix Issues

let productList = document.getElementById("product-list");
let cartList = document.getElementById("cart-list");
let clearCartBtn = document.getElementById("clear-cart-btn");

const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Render the list of products
function renderProduct() {
  if (!productList) {
    console.error("Product list element is missing!");
    return;
  }

  productList.innerHTML = ""; // Clear the product list before rendering
  products.forEach((item) => {
    let prdListli = document.createElement("li");
    let addToCartBtn = document.createElement("button");
    addToCartBtn.innerHTML = "Add to Cart";
    addToCartBtn.id = `id-${item.id}`;
    addToCartBtn.onclick = () => addToCart(item);

    prdListli.innerHTML = `${item.name} - ${item.price}`;
    prdListli.append(addToCartBtn);
    productList.append(prdListli);
  });
}

// Add item to the cart
function addToCart(item) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Ensure no duplicate entries
  const existingItem = cart.find((cartItem) => cartItem.id === item.id);
  if (!existingItem) {
    cart.push(item);
  }

  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Render the cart
function renderCart() {
  if (!cartList) {
    console.error("Cart list element is missing!");
    return;
  }

  cartList.innerHTML = ""; // Clear the cart list before rendering
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    const placeholder = document.createElement("li");
    placeholder.textContent = "Your cart is empty.";
    cartList.append(placeholder);
  } else {
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `${item.name} - ${item.price}`;
      cartList.append(li);
    });
  }
}

// Clear the cart with confirmation
function clearCart() {
  if (confirm("Are you sure you want to clear the cart?")) {
    sessionStorage.removeItem("cart");
    renderCart();
  }
}

// Initialize the app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  if (!productList || !cartList || !clearCartBtn) {
    console.error("Required DOM elements are missing!");
    return;
  }

  renderProduct();
  renderCart();

  // Check if clearCartBtn exists before adding the event listener
  clearCartBtn.addEventListener("click", clearCart);
});
