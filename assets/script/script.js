function renderUI(products) {
  const cardProduct = document.getElementById("cardProduct");
  cardProduct.innerHTML = "";

  products.forEach((product) => {
    cardProduct.innerHTML += `
      <div class="row align-items-center">
        <div class="card mt-5 mb-5 col-3" style="width: 18rem;">
          <img src="${product.img}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">$${product.price}</p>
            <button class="btn btn-light addToCartBtn" data-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      </div>`;
  });

  const addToCartButtons = document.querySelectorAll(".addToCartBtn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });
}

function addToCart(event) {
  const productId = event.target.dataset.id;
  const product = getProductById(productId);
  const basketItems = JSON.parse(localStorage.getItem("basket")) || [];
  basketItems.push(product);

  localStorage.setItem("basket", JSON.stringify(basketItems));
}
function getProductById(productId) {
  return products.find((product) => product.id === productId);
}

fetch("http://localhost:3000/product")
  .then((res) => res.json())
  .then((data) => {
    products = data;
    renderUI(data);
  });

function addToCart(event) {
  const productId = event.target.dataset.id;
  const product = getProductById(productId);
  const basketItems = JSON.parse(localStorage.getItem("basket")) || [];
  const existingProductIndex = basketItems.findIndex((item) => item.id === productId);

  if (existingProductIndex !== -1) {
    basketItems[existingProductIndex].quantity++;
  } else {
    product.quantity = 1;
    basketItems.push(product);
  }
  localStorage.setItem("basket", JSON.stringify(basketItems));
}