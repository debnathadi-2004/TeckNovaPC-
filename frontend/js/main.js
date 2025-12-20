// ===============================
// NAVBAR HIGHLIGHT ACTIVE LINK
// ===============================
const navLinks = document.querySelectorAll("nav ul li a");
navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});


// ===============================
// PRODUCT DATA (20 Products)
// ===============================
const products = [
  // =============================== //
  // Laptops (1–4)
  // =============================== //
  { id: 1, name: "Asus TUF Gaming A15 (Ryzen 7 + RTX 4060)", category: "laptops", price: 1599, image: "assets/images/products/Asus TUF Gaming A15 (Ryzen 7 + RTX 4060) 01.png" },
  { id: 2, name: "HP Envy x360 15", category: "laptops", price: 1299, image: "assets/images/products/HP Envy x360 15 02.png" },
  { id: 3, name: "Lenovo IdeaPad Slim 3", category: "laptops", price: 1199, image: "assets/images/products/Lenovo IdeaPad Slim 3.png" },
  { id: 4, name: "Apple MacBook Air M2", category: "laptops", price: 1399, image: "assets/images/products/Apple MacBook Air M2.png" },

  // =============================== //
  // Desktops (5–8)
  // =============================== //
  { id: 5, name: "Intel Core i9 Gaming Tower", category: "desktops", price: 2099, image: "assets/images/products/Intel Core i9 Gaming Tower.png" },
  { id: 6, name: "RYZEN 9 7950X Ultra PC", category: "desktops", price: 1899, image: "assets/images/products/RYZEN 9 7950X Ultra PC.png" },
  { id: 7, name: "RTX 4070 Ti High-End Tower", category: "desktops", price: 1799, image: "assets/images/products/RTX 4070 Ti High-End Tower.png" },
  { id: 8, name: "Creator Build Intel i7 + RTX 4060", category: "desktops", price: 1499, image: "assets/images/products/Creator Build Intel i7 + RTX 4060.png" },

  // =============================== //
  // Components (9–12)
  // =============================== //
  { id: 9, name: "AMD Ryzen 7 7800X3D Processor", category: "components", price: 399, image: "assets/images/products/AMD Ryzen 7 7800X3D Processor.png" },
  { id: 10, name: "ASUS ROG Strix B650 Motherboard", category: "components", price: 259, image: "assets/images/products/ASUS ROG Strix B650 Motherboard.png" },
  { id: 11, name: "Corsair Vengeance 16GB DDR5 RAM", category: "components", price: 119, image: "assets/images/products/Corsair Vengeance 16GB DDR5 RAM.png" },
  { id: 12, name: "NVIDIA RTX 4080 SUPER GPU", category: "components", price: 1199, image: "assets/images/products/NVIDIA RTX 4080 SUPER GPU.png" },

  // =============================== //
  // Accessories (13–16)
  // =============================== //
  { id: 13, name: "Logitech G Pro X Gaming Mouse", category: "accessories", price: 59, image: "assets/images/products/Logitech G Pro X Gaming Mouse.png" },
  { id: 14, name: "HyperX Alloy RGB Mechanical Keyboard", category: "accessories", price: 99, image: "assets/images/products/HyperX Alloy RGB Mechanical Keyboard.png" },
  { id: 15, name: "RGB Premium Gaming Chair", category: "accessories", price: 249, image: "assets/images/products/RGB Premium Gaming Chair.png" },
  { id: 16, name: "SteelSeries Gaming Mouse Pad XL", category: "accessories", price: 29, image: "assets/images/products/SteelSeries Gaming Mouse Pad XL.png" },

  // =============================== //
  // Peripherals (17–20)
  // =============================== //
  { id: 17, name: "24-inch 144Hz Gaming Monitor", category: "peripherals", price: 179, image: "assets/images/products/24-inch 144Hz Gaming Monitor.png" },
  { id: 18, name: "SteelSeries Arctis 7 Wireless Headset", category: "peripherals", price: 179, image: "assets/images/products/SteelSeries Arctis 7 Wireless Headset.png" },
  { id: 19, name: "34-inch UltraWide Curved Monitor", category: "peripherals", price: 499, image: "assets/images/products/34-inch UltraWide Curved Monitor.png" },
  { id: 20, name: "4K 165Hz IPS Gaming Monitor", category: "peripherals", price: 699, image: "assets/images/products/4K 165Hz IPS Gaming Monitor.png" }
];



// ===============================
// RENDER PRODUCTS (SHOP PAGE)
// ===============================
function renderProducts(category = "all") {
  const container = document.querySelector(".product-grid");
  if (!container) return;

  container.innerHTML = "";
  const filtered = category === "all" ? products : products.filter(p => p.category === category);

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">৳${p.price}</p>
      <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}


// ===============================
// CATEGORY FILTER BUTTONS
// ===============================
const buttons = document.querySelectorAll(".category-btn");
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.category);
  });
});


// ===============================
// ADD TO CART FUNCTION
// ===============================
function addToCart(id) {
  const item = products.find(p => p.id === id);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.find(i => i.id === id)) {
    alert(`${item.name} is already in your cart!`);
    return;
  }

  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${item.name} added to cart!`);
}


// ===============================
// RENDER CART (CART PAGE)
// ===============================
function renderCart() {
  const container = document.querySelector(".cart-items");
  if (!container) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p class='empty-cart'>Your cart is empty.</p>";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h4>${item.name}</h4>
      <p>৳${item.price}</p>
      <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
    `;
    container.appendChild(row);
  });

  const totalDiv = document.createElement("div");
  totalDiv.className = "cart-total";
  totalDiv.innerHTML = `
    <h3>Total: ৳${total.toFixed(2)}</h3>
    <button class="checkout-btn">Checkout</button>
  `;
  container.appendChild(totalDiv);
}


// ===============================
// REMOVE ITEM FROM CART
// ===============================
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}


// ===============================
// INITIAL CALLS
// ===============================
renderProducts();
renderCart();
