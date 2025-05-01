

const products = [
    { id: 1, name: "Smartphone X", price: 599, image: "https://via.placeholder.com/200" },
    { id: 2, name: "Laptop Pro", price: 1299, image: "https://via.placeholder.com/200" },
    { id: 3, name: "Wireless Earbuds", price: 99, image: "https://via.placeholder.com/200" },
];

function loadCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cart = loadCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
}

function renderProducts() {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    productList.innerHTML = products.map(product => `
        <article class="product-card bg-white p-4 rounded shadow fade-in">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded">
            <h3 class="text-xl font-semibold mt-2">${product.name}</h3>
            <p class="text-lg font-bold">$${product.price}</p>
            <button onclick="addToCart(${product.id})" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2">Add to Cart</button>
        </article>
    `).join('');
}

function addToCart(productId) {
    const cart = loadCart();
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    updateCartCount();
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;

    const cart = loadCart();
    cartItems.innerHTML = cart.length ? cart.map(item => `
        <article class="cart-item bg-white p-4 rounded shadow flex justify-between items-center fade-in">
            <div>
                <h3 class="text-xl font-semibold">${item.name}</h3>
                <p>$${item.price} x ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart(${item.id})" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Remove</button>
        </article>
    `).join('') : '<p class="text-lg">Your cart is empty.</p>';

    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) {
        clearCartBtn.onclick = () => {
            localStorage.removeItem('cart');
            renderCart();
            updateCartCount();
        };
    }
}

function removeFromCart(productId) {
    const cart = loadCart().filter(item => item.id !== productId);
    saveCart(cart);
    renderCart();
    updateCartCount();
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCart();
    updateCartCount();
});