console.log("bandColors");
const products = [
  {
    color: "purple",
    title: "Classy Modern Smart watch",
    oldPrice: 92,
    newPrice: 79,
    model: "Forerunner 290XT",
    image: "./images/default-img.png",
  },
  {
    color: "cyan",
    title: "Stylish Cyan Watch",
    oldPrice: 95,
    newPrice: 82,
    image: "./images/watch3.png",
  },
  {
    color: "blue",
    title: "Sleek Blue Watch",
    oldPrice: 108,
    newPrice: 94,
    model: "Forerunner 290BL",
    image: "./images/watch2.png",
  },
  {
    color: "black",
    title: "Classic Black Watch",
    oldPrice: 99,
    newPrice: 87,
    model: "Forerunner 290BK",
    image: "./images/watch1.png",
  },
];

const thumnailImg = document.getElementById("thumnail-img");
const productTitle = document.getElementById("product-title");
const newPrice = document.getElementById("new-price");
const oldPrice = document.getElementById("deleted-price");
const modelNumber = document.getElementById("model-name");
const checkoutQuantity = document.getElementById("checkout-quantity");
const checkoutButton = document.getElementById("checkout-btn");
const modalOverlay = document.getElementById("cart-modal-overlay");
const cartItemsContainer = document.getElementById("cart-items");
const totalQuantityElement = document.getElementById("cart-total-quantity");
const totalPriceElement = document.getElementById("cart-total-price");
const finalCheckout = document.getElementById("final-checkout");
const continueShopping = document.getElementById("continue-shopping");

const bandColors = document.querySelectorAll(".options");
const sizeButtons = document.querySelectorAll(".size-button");

const decreaseBtn = document.querySelector(".decrease");
const increaseBtn = document.querySelector(".increase");
const quantityDisplay = document.querySelector(".quantity-display");
const addToCartBtn = document.querySelector(".add-to-cart-btn");
const checkoutContainer = document.querySelector(".checkout-container");

// console.log(bandColors);
let quantity = 0;
let checkout_Quantity = 0;
const cartData = [];

bandColors.forEach((colorOption) => {
  colorOption.addEventListener("click", () => {
    bandColors.forEach((opt) => opt.classList.remove("selected"));
    colorOption.classList.add("selected");

    const selectedColor = colorOption.dataset.color;

    const selectedProduct = products.find(
      (product) => product.color == selectedColor
    );

    thumnailImg.src = selectedProduct.image;
    productTitle.innerText = selectedProduct.title;
    oldPrice.innerText = `$${selectedProduct.oldPrice}`;
    newPrice.innerText = `$${selectedProduct.newPrice}`;

    // console.log(selectedProduct);
  });
});

sizeButtons.forEach((sizeOption) =>
  sizeOption.addEventListener("click", () => {
    sizeButtons.forEach((opt) => opt.classList.remove("selected-size"));
    sizeOption.classList.add("selected-size");
  })
);

//quantity specifying and add to cart operation

const updateQuantityDisplay = () => {
  quantityDisplay.innerText = quantity;
};

decreaseBtn.addEventListener("click", () => {
  if (quantity > 0) {
    quantity--;
    updateQuantityDisplay();
  }
});

increaseBtn.addEventListener("click", () => {
  quantity++;
  updateQuantityDisplay();
});

const showCheckoutButton = () => {
  checkoutContainer.style.display = "block";
  checkoutQuantity.innerText = checkout_Quantity;
};

addToCartBtn.addEventListener("click", () => {
  if (quantity > 0) {
    const selectedColor =
      document.querySelector(".options.selected").dataset.color;
    const selectedSize = document
      .querySelector(".size-button.selected-size")
      .getAttribute("data-size");
    const selectedProduct = products.find(
      (product) => product.color == selectedColor
    );
    console.log(selectedProduct);
    const existingItem = cartData.find(
      (item) =>
        item.item === selectedProduct.title &&
        item.color === selectedColor &&
        item.size === selectedSize
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartData.push({
        item: selectedProduct.title,
        image: selectedProduct.image,
        color: selectedColor,
        size: selectedSize,
        quantity: quantity,
        price: selectedProduct.newPrice,
      });
    }
    checkout_Quantity += quantity;
    updateQuantityDisplay();
    showCheckoutButton();
  }
});

//modal functionality
const openCartModal = () => {
  cartItemsContainer.innerHTML = "";
  let total_price = 0;
  let total_quantity = 0;

  if (cartData.length === 0) {
    return; // Exit the function
  }

  cartData.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
       <td>
        <div style="display: flex; align-items: center;">
          <img src="${item.image}" class="cart-item-image" />
          <span>${item.item}</span>
        </div>
      </td>
      <td class="cart-item-color">${item.color}</td>
      <td class="cart-item-text">${item.size}</td>
      <td class="cart-item-text">${item.quantity}</td>
      <td class="cart-item-price">$${
        item.quantity * item.price.toFixed(2)
      }</td>`;
    total_price += item.quantity * item.price;
    total_quantity += item.quantity;
    cartItemsContainer.appendChild(row);
  });

  totalPriceElement.innerText = `$${total_price.toFixed(2)}`;
  totalQuantityElement.innerText = `${total_quantity}`;
};

const closeModal = () => {
  modalOverlay.style.display = "none";
};

checkoutButton.addEventListener("click", () => {
  openCartModal();
  modalOverlay.style.display = "flex";
});
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});
continueShopping.addEventListener("click", () => {
  closeModal();
});
finalCheckout.addEventListener("click", () => {
  quantity = 0;
  quantityDisplay.innerText = quantity;
  checkoutContainer.style.display = "none";
  cartData.length = 0;
  checkout_Quantity = 0;
  checkoutQuantity.innerText = checkout_Quantity;
  closeModal();
});
