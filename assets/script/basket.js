function updateBasketTable() {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  const basketItems = JSON.parse(localStorage.getItem("basket")) || [];

  basketItems.forEach((item) => {
    const total = item.quantity * item.price;
    const row = `
          <tr>
            <td><img src="${item.img}" alt="${
      item.title
    }" style="max-width: 100px;"></td>
            <td>${item.title}</td>
            <td>
              <button class="quantityBtn decrease" data-id="${
                item.id
              }" onclick="decreaseQuantity(event)">-</button>
              ${item.quantity}
              <button class="quantityBtn increase" data-id="${
                item.id
              }" onclick="increaseQuantity(event)">+</button>
            </td>
            <td>$${item.price}</td>
            <td>$${total.toFixed(2)}</td>
            <td><button class="btn btn-danger deleteBtn" data-id="${
              item.id
            }">Delete</button></td>
          </tr>`;
    tableBody.innerHTML += row;
  });

  const deleteButtons = document.querySelectorAll(".deleteBtn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteFromBasket);
  });
}

function deleteFromBasket(event) {
  const productId = event.target.dataset.id;
  let basketItems = JSON.parse(localStorage.getItem("basket")) || [];
  basketItems = basketItems.filter((item) => item.id !== productId);
  localStorage.setItem("basket", JSON.stringify(basketItems));
  updateBasketTable();
}

function increaseQuantity(event) {
  const productId = event.target.dataset.id;
  let basketItems = JSON.parse(localStorage.getItem("basket")) || [];
  const productIndex = basketItems.findIndex((item) => item.id === productId);

  if (productIndex !== -1) {
    basketItems[productIndex].quantity++;
    basketItems[productIndex].total =
      basketItems[productIndex].quantity * basketItems[productIndex].price;
  }
  localStorage.setItem("basket", JSON.stringify(basketItems));
  updateBasketTable();
}

function decreaseQuantity(event) {
  const productId = event.target.dataset.id;
  let basketItems = JSON.parse(localStorage.getItem("basket")) || [];
  const productIndex = basketItems.findIndex((item) => item.id === productId);

  if (productIndex !== -1 && basketItems[productIndex].quantity > 1) {
    basketItems[productIndex].quantity--;
    basketItems[productIndex].total =
      basketItems[productIndex].quantity * basketItems[productIndex].price;
  }
  localStorage.setItem("basket", JSON.stringify(basketItems));
  updateBasketTable();
}
updateBasketTable();
