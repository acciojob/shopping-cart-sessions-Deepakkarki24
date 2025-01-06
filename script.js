let productList = document.getElementById("product-list");
let cartList = document.getElementById("cart-list");
let clearCartBtn = document.getElementById("clear-cart-btn");

const products = [
  { id: 1, name: "Apple", price: 10 },
  { id: 2, name: "Mango", price: 20 },
  { id: 3, name: "Banana", price: 30 },
  { id: 4, name: "Grapes", price: 40 },
  { id: 5, name: "Cherry", price: 50 },
];

// Render the list of products
function renderProduct() {
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
  cart.push(item);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Render the cart
function renderCart() {
  cartList.innerHTML = ""; // Clear the cart list before rendering
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartList.textContent = "Your cart is empty.";
  } else {
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `${item.name} -${item.price}`;
      cartList.append(li);
    });
  }
}

// Clear the cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// Initialize the app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  renderProduct();
  renderCart();
  clearCartBtn.addEventListener("click", clearCart);
});
