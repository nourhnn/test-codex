const products = [
  { id: 1, name: 'Air Pulse X', price: 129.9, category: 'running', emoji: '🏃‍♂️' },
  { id: 2, name: 'Street Nova', price: 99.9, category: 'lifestyle', emoji: '✨' },
  { id: 3, name: 'Court Master', price: 149.9, category: 'basketball', emoji: '🏀' },
  { id: 4, name: 'Urban Glide', price: 109.9, category: 'lifestyle', emoji: '🌆' },
  { id: 5, name: 'Sprint Pro', price: 139.9, category: 'running', emoji: '⚡' },
  { id: 6, name: 'Hoop Elite', price: 159.9, category: 'basketball', emoji: '🔥' },
];

const cart = [];
const productsList = document.getElementById('products-list');
const filterSelect = document.getElementById('filter-category');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const cartPanel = document.getElementById('cart-panel');
const overlay = document.getElementById('overlay');

function formatPrice(price) {
  return price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}

function renderProducts(category = 'all') {
  const filtered = category === 'all' ? products : products.filter((p) => p.category === category);

  productsList.innerHTML = filtered
    .map((p) => `
      <article class="product">
        <div class="img">${p.emoji}</div>
        <span class="badge">${p.category}</span>
        <h3>${p.name}</h3>
        <p>Confort premium & design moderne.</p>
        <div class="product-footer">
          <strong>${formatPrice(p.price)}</strong>
          <button data-id="${p.id}">Ajouter</button>
        </div>
      </article>
    `)
    .join('');
}

function renderCart() {
  if (!cart.length) {
    cartItems.innerHTML = '<li>Ton panier est vide.</li>';
  } else {
    cartItems.innerHTML = cart
      .map((item) => `<li><span>${item.name}</span><strong>${formatPrice(item.price)}</strong></li>`)
      .join('');
  }

  cartCount.textContent = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = formatPrice(total);
}

productsList.addEventListener('click', (e) => {
  const button = e.target.closest('button[data-id]');
  if (!button) return;
  const product = products.find((p) => p.id === Number(button.dataset.id));
  if (!product) return;
  cart.push(product);
  renderCart();
});

filterSelect.addEventListener('change', (e) => {
  renderProducts(e.target.value);
});

function openCart() {
  cartPanel.classList.add('open');
  overlay.classList.add('visible');
  cartPanel.setAttribute('aria-hidden', 'false');
}

function closeCart() {
  cartPanel.classList.remove('open');
  overlay.classList.remove('visible');
  cartPanel.setAttribute('aria-hidden', 'true');
}

document.getElementById('open-cart').addEventListener('click', openCart);
document.getElementById('close-cart').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

document.getElementById('checkout').addEventListener('click', () => {
  if (!cart.length) {
    alert('Ajoute au moins une paire avant de commander.');
    return;
  }
  alert('Commande validée ✅ Merci pour ton achat !');
  cart.length = 0;
  renderCart();
  closeCart();
});

renderProducts();
renderCart();
