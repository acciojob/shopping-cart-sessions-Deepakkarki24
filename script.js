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

function renderProduct() {
  products.forEach((item, index) => {
    let prdListli = document.createElement("li");
    let addToCartBtn = document.createElement("button");
    addToCartBtn.innerHTML = "Add to Cart";
    addToCartBtn.id = `id-${item.id}`;
    addToCartBtn.onclick = () => addToCart(item);
    prdListli.innerHTML = `${item.name} ${item.price}`;
    prdListli.append(addToCartBtn);
    productList.append(prdListli);
  });
}

function addToCart(item) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cart.push(item);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  let cartListli = document.createElement("li");

  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartList.textContent = "";
  } else {
    cart.forEach((item) => {
      const li = document.createElement("li");
      cartListli.innerHTML = `${item.name} ${item.price}`;
      cartList.append(cartListli);
    });
  }
}

function clearCart() {
  clearCartBtn.addEventListener("click", () => {
    sessionStorage.removeItem("cart");
    renderCart();
  });
}

clearCart();

window.onload = function () {
  renderProduct();
  renderCart();
};
