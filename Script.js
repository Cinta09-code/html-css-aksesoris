// Seleksi elemen
const cartIcon = document.querySelector("#cart-icon");
const closeCart = document.querySelector("#close-cart");
const cart = document.querySelector(".cart");
const categoryButtons = document.querySelectorAll(".category-btn");
const productBoxes = document.querySelectorAll(".product-box");
const navMenu = document.querySelector(".navbar-menu");
const menuIcon = document.querySelector("#menu-icon");
const userIcon = document.getElementById("user-icon");
const loginMenu = document.getElementById("login-menu");
// Open cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};

// Close cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};
//menu
menuIcon.onclick = (event) => {
  event.preventDefault();
  console.log();
  navMenu.classList.toggle("active");
};
//Login
userIcon.addEventListener("click", (e) => {
  e.preventDefault();
  loginMenu.classList.toggle("active");
});
//Working JS
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
// add Login
document.addEventListener("click", (e) => {
  if (!loginMenu.contains(e.target) && !userIcon.contains(e.target)) {
    loginMenu.classList.remove("active");
  }
});
//Making Function
function ready() {
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItems);
  }
  //Quantity changes
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  //add to cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", function (event) {
      event.preventDefault();
      alert("Your Order is Placed");

      // remove product in cart,expect total and heading
      var cartContent = document.getElementsByClassName("cart-content")[0];
      var productBoxes = cartContent.getElementsByClassName("cart-box");

      // remove all product
      while (productBoxes.length > 0) {
        productBoxes[0].remove();
      }
      updatetotal();
    });
  //Quantity Changes
  function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updatetotal();
  }
  //add to cart
  function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title =
      shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
  }
  function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
      if (cartItemsNames[i].innerText === title) {
        alert("You have already add this item to cart");
        return;
      }
    }
    //Remove Items from cart
    function removeCartItems(event) {
      var buttonClicked = event.target;
      buttonClicked.parentElement.remove();
      updatetotal();
    }
    var cartBoxContent = `
                    <img src="${productImg}" alt="" class="cart-img" />
                    <div class="detail-box">
                      <div class="cart-product-title">${title}</div>
                      <div class="cart-price">${price}</div>
                      <input type="number" value="1" class="cart-quantity" />
                    </div>
                    <!-- Remove cart -->
                    <i class="bx bxs-trash-alt cart-remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
      .getElementsByClassName("cart-remove")[0]
      .addEventListener("click", removeCartItems);
    cartShopBox
      .getElementsByClassName("cart-quantity")[0]
      .addEventListener("change", quantityChanged);
  }
  //kategori
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      productBoxes.forEach((product) => {
        if (category === "All" || product.dataset.category === category) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });
    });
  });
  //Update total
  function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
      var cartBox = cartBoxes[i];
      var priceElement = cartBox.getElementsByClassName("cart-price")[0];
      var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
      var price = parseFloat(
        priceElement.innerText.replace("Rp", "").replace(/\./g, "").trim()
      );

      var quantity = quantityElement.value;
      total = total + price * quantity;
    }
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName("total-price")[0].innerText =
      "Rp" + total.toLocaleString("id-ID");
  }
}
