/* =========================================
   AK FASHIONS - MAIN JAVASCRIPT
   ========================================= */

const baseProducts = [
    {
        name: "Black Henley Long Sleeve",
        category: "tshirts",
        price: 899,
        originalPrice: 1199,
        isOffer: true,
        image: "assets/black_henley_long_sleeve.jpg",
        description: "Premium long sleeve Henley t-shirt for a casual yet refined look.",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        name: "Tactical Black Cargo Pants",
        category: "jeans",
        price: 1899,
        isOffer: false,
        image: "assets/tactical_black_cargo_pants.jpg",
        description: "Comfortable and durable black cargo pants with multiple utility pockets.",
        sizes: ["30", "32", "34", "36"]
    },
    {
        name: "Classic Sweatpants Trio Pack",
        category: "jeans",
        price: 2499,
        originalPrice: 3299,
        isOffer: true,
        image: "assets/classic_sweatpants_trio_pack.jpeg",
        description: "Pack of 3 essential sweatpants (Black, Grey, Dark Grey). Premium cotton blend.",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        name: "Light Blue Denim Cargo Jeans",
        category: "jeans",
        price: 2199,
        originalPrice: 2899,
        isOffer: true,
        image: "assets/light_blue_denim_cargo_jeans.jpg",
        description: "Modern light wash denim combined with functional cargo styling.",
        sizes: ["28", "30", "32", "34"]
    },
    {
        name: "Vintage Dark Denim Shirt",
        category: "shirts",
        price: 1499,
        isOffer: false,
        image: "assets/vintage_dark_denim_shirt.jpg",
        description: "Rugged yet stylish dark denim shirt with double chest pockets.",
        sizes: ["M", "L", "XL", "XXL"]
    },
    {
        name: "Athletic Loose Straight Sweatpants",
        category: "jeans",
        price: 1199,
        isOffer: false,
        image: "assets/athletic_loose_straight_sweatpants.avif",
        description: "High performance athletic loose pants, perfect for workouts or casual wear.",
        sizes: ["M", "L", "XL"]
    }
];

// Generate 24 products using the exact correctly matched images
const products = [];
for (let i = 0; i < 24; i++) {
    const base = baseProducts[i % baseProducts.length];
    products.push({
        id: i + 1,
        name: i < 6 ? base.name : `${base.name} - Edition ${Math.floor(i / 6) + 1}`,
        category: base.category,
        price: base.price,
        originalPrice: base.originalPrice,
        isOffer: base.isOffer,
        image: base.image,
        description: base.description,
        sizes: base.sizes
    });
}

const combos = [
    {
        id: 101,
        name: "Summer Date Combo (White Shirt + Blue Jeans)",
        category: "combos",
        price: 2999,
        originalPrice: 3698,
        isOffer: true,
        image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop",
        description: "The perfect summer date outfit. Includes the Classic Oxford White Shirt and Midnight Blue Slim Fit Jeans. Save big when bought together!",
        sizes: ["M (Shirt/32 Jeans)", "L (Shirt/34 Jeans)", "XL (Shirt/36 Jeans)"]
    },
    {
        id: 102,
        name: "Weekend Relax Combo (Black T-Shirt + Light Jeans)",
        category: "combos",
        price: 2499,
        originalPrice: 3398,
        isOffer: true,
        image: "https://images.unsplash.com/photo-1516826957135-700ede19c6ce?q=80&w=600&auto=format&fit=crop",
        description: "Casual weekend ready. Graphic Print Black T-Shirt paired with our Distressed Light Wash Jeans.",
        sizes: ["M (Tee/32 Jeans)", "L (Tee/34 Jeans)", "XL (Tee/36 Jeans)"]
    },
    {
        id: 103,
        name: "Smart Casual Combo (Grey Shirt + Blue Jeans)",
        category: "combos",
        price: 2899,
        originalPrice: 3498,
        isOffer: true,
        image: "https://images.unsplash.com/photo-1594938298596-70f594f62bce?q=80&w=600&auto=format&fit=crop",
        description: "Office to evening transition. Charcoal Grey Casual Shirt and Midnight Blue Slim Fit Jeans.",
        sizes: ["M (Shirt/32 Jeans)", "L (Shirt/34 Jeans)", "XL (Shirt/36 Jeans)"]
    }
];

const allItems = [...products, ...combos];

// --- 2. STATE MANAGEMENT ---
let cart = JSON.parse(localStorage.getItem('ak_cart')) || [];
let selectedProduct = null;
let selectedSize = null;

// Pagination State
let currentPage = 1;
const itemsPerPage = 12;
let currentFilteredProducts = products; // Defaults to all products

// --- 3. DOM ELEMENTS ---
const elements = {
    productsGrid: document.getElementById('products-grid'), // Shop page
    comboGrid: document.getElementById('combo-grid'),       // Home page
    paginationContainer: document.getElementById('pagination-container'), // Shop page
    filterBtns: document.querySelectorAll('.filter-btn'),
    searchInput: document.getElementById('search-input'),
    loginBtn: document.getElementById('login-btn'),
    cartBtn: document.getElementById('cart-btn'),
    cartBadge: document.getElementById('cart-badge'),
    cartSidebar: document.getElementById('cart-sidebar'),
    closeCartSidebar: document.getElementById('close-cart-sidebar'),
    cartItemsContainer: document.getElementById('cart-items-container'),
    cartSubtotal: document.getElementById('cart-subtotal'),
    checkoutBtn: document.getElementById('checkout-btn'),
    sidebarOverlay: document.getElementById('sidebar-overlay'),
    
    // Login Modal
    loginModal: document.getElementById('login-modal'),
    closeLoginModal: document.getElementById('close-login-modal'),
    googleSigninBtn: document.getElementById('google-signin-btn'),
    
    // Product Modal
    productModal: document.getElementById('product-modal'),
    closeProductModal: document.getElementById('close-product-modal'),
    productDetailsContainer: document.getElementById('product-details-container'),
    
    // Checkout Modal
    checkoutModal: document.getElementById('checkout-modal'),
    closeCheckoutModal: document.getElementById('close-checkout-modal'),
    checkoutForm: document.getElementById('checkout-form'),
    checkoutItems: document.getElementById('checkout-items'),
    checkoutTotalAmount: document.getElementById('checkout-total-amount')
};

// --- 4. INITIALIZATION ---
function init() {
    if (elements.comboGrid) {
        renderGrid(combos, elements.comboGrid); // Render all combos on Home
    } 
    
    if (elements.productsGrid) {
        renderPaginatedGrid(); // Render paginated products on Shop
    }
    
    updateCartUI();
    setupEventListeners();
    
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 17, 21, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
        } else {
            if(!elements.productsGrid) {
                navbar.style.background = 'rgba(15, 17, 21, 0.85)';
                navbar.style.boxShadow = 'none';
            }
        }
    });
}

// --- 5. RENDER FUNCTIONS ---
function formatPrice(price) {
    return `₹${price.toLocaleString('en-IN')}`;
}

// Basic render for combos
function renderGrid(items, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    if (items.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">No products found matching your criteria.</p>';
        return;
    }
    
    items.forEach(product => {
        container.appendChild(createProductCard(product));
    });
}

// Advanced render for shop pagination
function renderPaginatedGrid() {
    if (!elements.productsGrid) return;
    
    elements.productsGrid.innerHTML = '';
    
    if (currentFilteredProducts.length === 0) {
        elements.productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">No products found matching your criteria.</p>';
        if(elements.paginationContainer) elements.paginationContainer.innerHTML = '';
        return;
    }
    
    // Calculate start and end indices
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Slice array to get current page items
    const pageItems = currentFilteredProducts.slice(startIndex, endIndex);
    
    pageItems.forEach(product => {
        elements.productsGrid.appendChild(createProductCard(product));
    });
    
    renderPaginationControls();
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    let badgeHtml = product.isOffer ? `<div class="offer-badge">OFFER</div>` : '';
    let priceHtml = product.originalPrice 
        ? `<span class="original-price">${formatPrice(product.originalPrice)}</span> ${formatPrice(product.price)}` 
        : formatPrice(product.price);
        
    card.innerHTML = `
        <div class="product-img-wrapper" style="cursor:pointer;" onclick="openProductModal(${product.id})">
            ${badgeHtml}
            <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
        </div>
        <div class="product-info">
            <span class="product-category">${product.category.toUpperCase()}</span>
            <h3 class="product-title" style="cursor:pointer;" onclick="openProductModal(${product.id})">${product.name}</h3>
            <div class="product-price">${priceHtml}</div>
            <button class="btn btn-primary btn-block" onclick="openProductModal(${product.id})">
                View Details
            </button>
        </div>
    `;
    return card;
}

function renderPaginationControls() {
    if (!elements.paginationContainer) return;
    
    const totalPages = Math.ceil(currentFilteredProducts.length / itemsPerPage);
    elements.paginationContainer.innerHTML = '';
    
    if (totalPages <= 1) return; // Hide pagination if only 1 page
    
    // Prev button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
        if(currentPage > 1) {
            currentPage--;
            renderPaginatedGrid();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    elements.paginationContainer.appendChild(prevBtn);
    
    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.onclick = () => {
            currentPage = i;
            renderPaginatedGrid();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        elements.paginationContainer.appendChild(pageBtn);
    }
    
    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => {
        if(currentPage < totalPages) {
            currentPage++;
            renderPaginatedGrid();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    elements.paginationContainer.appendChild(nextBtn);
}

// --- 6. PRODUCT MODAL LOGIC ---
window.openProductModal = function(productId) {
    selectedProduct = allItems.find(p => p.id === productId);
    selectedSize = null; 
    
    if (!selectedProduct) return;
    
    let priceHtml = selectedProduct.originalPrice 
        ? `<span class="original-price" style="font-size:1.2rem">${formatPrice(selectedProduct.originalPrice)}</span> ${formatPrice(selectedProduct.price)}` 
        : formatPrice(selectedProduct.price);
    
    elements.productDetailsContainer.innerHTML = `
        <div class="product-detail-grid">
            <div class="product-detail-img-container">
                ${selectedProduct.isOffer ? `<div class="offer-badge" style="font-size: 1rem; padding: 8px 16px;">SPECIAL OFFER</div>` : ''}
                <img src="${selectedProduct.image}" alt="${selectedProduct.name}" class="product-detail-img">
            </div>
            <div class="product-detail-info">
                <span style="color: var(--primary-color); font-weight: 600; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 5px; display: block;">${selectedProduct.category}</span>
                <h2 class="product-detail-title">${selectedProduct.name}</h2>
                <div class="product-detail-price">${priceHtml}</div>
                <p class="product-detail-desc">${selectedProduct.description}</p>
                
                <div class="selector-group">
                    <label class="selector-label">Select Size <span style="color:#ff4757" id="size-error"></span></label>
                    <div class="size-options">
                        ${selectedProduct.sizes.map(size => `
                            <button class="size-btn" onclick="selectSize('${size}', this)" style="width: auto; padding: 0 15px;">${size}</button>
                        `).join('')}
                    </div>
                </div>
                
                <div class="selector-group">
                    <label class="selector-label">Quantity</label>
                    <div class="qty-control">
                        <button class="qty-btn" onclick="updateModalQty(-1)">-</button>
                        <input type="number" id="modal-qty" class="qty-input" value="1" min="1" readonly>
                        <button class="qty-btn" onclick="updateModalQty(1)">+</button>
                    </div>
                </div>
                
                <button class="btn btn-primary btn-block" onclick="addToCartFromModal()" style="margin-top: 20px; font-size: 1.1rem; padding: 15px;">
                    <i class="fa-solid fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `;
    
    elements.productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

window.selectSize = function(size, btnElement) {
    selectedSize = size;
    document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('selected'));
    btnElement.classList.add('selected');
    document.getElementById('size-error').textContent = '';
}

window.updateModalQty = function(change) {
    const input = document.getElementById('modal-qty');
    let newVal = parseInt(input.value) + change;
    if (newVal >= 1) {
        input.value = newVal;
    }
}

window.addToCartFromModal = function() {
    if (!selectedSize) {
        document.getElementById('size-error').textContent = '(Please select a size)';
        return;
    }
    
    const qty = parseInt(document.getElementById('modal-qty').value);
    addToCart(selectedProduct, selectedSize, qty);
    
    closeModals();
    toggleCartSidebar(true);
}

// --- 7. CART LOGIC ---
function addToCart(product, size, qty) {
    const existingItemIndex = cart.findIndex(item => item.id === product.id && item.size === size);
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].qty += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: size,
            qty: qty
        });
    }
    
    saveCart();
    updateCartUI();
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

window.updateCartItemQty = function(index, change) {
    const newQty = cart[index].qty + change;
    if (newQty > 0) {
        cart[index].qty = newQty;
        saveCart();
        updateCartUI();
    }
}

function saveCart() {
    localStorage.setItem('ak_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const totalItems = cart.reduce((total, item) => total + item.qty, 0);
    if(elements.cartBadge) elements.cartBadge.textContent = totalItems;
    
    if(!elements.cartItemsContainer) return;
    
    if (cart.length === 0) {
        elements.cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is currently empty.</div>';
        elements.checkoutBtn.disabled = true;
        elements.cartSubtotal.textContent = '₹0';
        return;
    }
    
    elements.checkoutBtn.disabled = false;
    elements.cartItemsContainer.innerHTML = '';
    
    let subtotal = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;
        
        const cartItemEl = document.createElement('div');
        cartItemEl.className = 'cart-item';
        cartItemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-meta">Size: ${item.size}</div>
                <div class="cart-item-bottom">
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                    <div class="qty-control" style="transform: scale(0.85); transform-origin: left center;">
                        <button class="qty-btn" onclick="updateCartItemQty(${index}, -1)">-</button>
                        <input type="number" class="qty-input" value="${item.qty}" readonly>
                        <button class="qty-btn" onclick="updateCartItemQty(${index}, 1)">+</button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
        elements.cartItemsContainer.appendChild(cartItemEl);
    });
    
    elements.cartSubtotal.textContent = formatPrice(subtotal);
}

// --- 8. UI TOGGLES & EVENT LISTENERS ---
function toggleCartSidebar(show = true) {
    if(!elements.cartSidebar) return;
    
    if (show) {
        elements.cartSidebar.classList.add('active');
        elements.sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        elements.cartSidebar.classList.remove('active');
        elements.sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function closeModals() {
    if(elements.productModal) elements.productModal.classList.remove('active');
    if(elements.checkoutModal) elements.checkoutModal.classList.remove('active');
    if(elements.loginModal) elements.loginModal.classList.remove('active');
    document.body.style.overflow = '';
}

function openCheckout() {
    toggleCartSidebar(false);
    
    elements.checkoutItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        
        elements.checkoutItems.innerHTML += `
            <div class="checkout-item-mini">
                <div>
                    <div class="checkout-item-name">${item.name}</div>
                    <div class="checkout-item-detail">Size: ${item.size} | Qty: ${item.qty}</div>
                </div>
                <div class="checkout-item-total">${formatPrice(itemTotal)}</div>
            </div>
        `;
    });
    
    elements.checkoutTotalAmount.textContent = formatPrice(total);
    
    const savedCustomer = JSON.parse(localStorage.getItem('ak_customer'));
    if (savedCustomer) {
        if(document.getElementById('cust-name')) document.getElementById('cust-name').value = savedCustomer.name || '';
        if(document.getElementById('cust-phone')) document.getElementById('cust-phone').value = savedCustomer.phone || '';
        if(document.getElementById('cust-address')) document.getElementById('cust-address').value = savedCustomer.address || '';
    }
    
    elements.checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function setupEventListeners() {
    // Filter functionality (Shop Page)
    if (elements.filterBtns && elements.productsGrid) {
        elements.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                elements.filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                if(elements.searchInput) elements.searchInput.value = '';
                
                const filter = e.target.getAttribute('data-filter');
                if (filter === 'all') {
                    currentFilteredProducts = products;
                } else if (filter === 'offers') {
                    currentFilteredProducts = products.filter(p => p.isOffer);
                } else {
                    currentFilteredProducts = products.filter(p => p.category === filter);
                }
                
                currentPage = 1; // Reset to page 1 on new filter
                renderPaginatedGrid();
            });
        });
    }
    
    // Search functionality (Shop Page)
    if (elements.searchInput && elements.productsGrid) {
        elements.searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            elements.filterBtns.forEach(b => b.classList.remove('active'));
            elements.filterBtns[0].classList.add('active');
            
            if (query.trim() === '') {
                currentFilteredProducts = products;
            } else {
                currentFilteredProducts = products.filter(p => 
                    p.name.toLowerCase().includes(query) || 
                    p.description.toLowerCase().includes(query) ||
                    p.category.toLowerCase().includes(query)
                );
            }
            
            currentPage = 1; // Reset to page 1 on new search
            renderPaginatedGrid();
        });
    }
    
    // Login Modal & Google Sign In
    if(elements.loginBtn) {
        elements.loginBtn.addEventListener('click', () => {
            elements.loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if(elements.closeLoginModal) elements.closeLoginModal.addEventListener('click', closeModals);
    
    if(elements.loginModal) elements.loginModal.addEventListener('click', (e) => {
        if (e.target === elements.loginModal) closeModals();
    });
    
    if(elements.googleSigninBtn) {
        elements.googleSigninBtn.addEventListener('click', () => {
            const mockUser = {
                name: "Guest User",
                phone: "+91 9876543210",
                address: "123 Main Street, City"
            };
            localStorage.setItem('ak_customer', JSON.stringify(mockUser));
            alert("Successfully signed in with Google! Your details will be pre-filled during checkout.");
            closeModals();
        });
    }
    
    // Sidebar & Modals
    if(elements.cartBtn) elements.cartBtn.addEventListener('click', () => toggleCartSidebar(true));
    if(elements.closeCartSidebar) elements.closeCartSidebar.addEventListener('click', () => toggleCartSidebar(false));
    if(elements.sidebarOverlay) elements.sidebarOverlay.addEventListener('click', () => {
        toggleCartSidebar(false);
        closeModals();
    });
    if(elements.closeProductModal) elements.closeProductModal.addEventListener('click', closeModals);
    if(elements.closeCheckoutModal) elements.closeCheckoutModal.addEventListener('click', closeModals);
    
    // Close modal on outside click
    if(elements.productModal) elements.productModal.addEventListener('click', (e) => {
        if (e.target === elements.productModal) closeModals();
    });
    if(elements.checkoutModal) elements.checkoutModal.addEventListener('click', (e) => {
        if (e.target === elements.checkoutModal) closeModals();
    });
    
    // Checkout flow
    if(elements.checkoutBtn) elements.checkoutBtn.addEventListener('click', openCheckout);
    
    // WhatsApp Order Submission
    if(elements.checkoutForm) {
        elements.checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('cust-name').value;
            const phone = document.getElementById('cust-phone').value;
            const address = document.getElementById('cust-address').value;
            
            if (!name || !phone || !address) return;
            
            sendWhatsAppOrder(name, phone, address);
        });
    }
}

// --- 9. WHATSAPP INTEGRATION ---
function sendWhatsAppOrder(name, phone, address) {
    const customerInfo = { name, phone, address };
    localStorage.setItem('ak_customer', JSON.stringify(customerInfo));

    const shopNumber = "919361438664"; 
    
    let subtotal = 0;
    
    let itemsText = cart.map((item, index) => {
        subtotal += (item.price * item.qty);
        return `${index + 1}. *${item.name}*
   Size: ${item.size} | Qty: ${item.qty} | ₹${item.price} each`;
    }).join('\n\n');
    
    const message = `🛍️ *NEW ORDER - AK Fashions*
━━━━━━━━━━━━━━━━━━
👤 *Name:* ${name}
📞 *Phone:* ${phone}
📍 *Address:* ${address}

🧾 *Order Details:*
━━━━━━━━━━━━━━━━━━
${itemsText}

━━━━━━━━━━━━━━━━━━
💰 *Total Amount: ₹${subtotal.toLocaleString('en-IN')}*
━━━━━━━━━━━━━━━━━━
Please confirm my order. Thank you! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${shopNumber}?text=${encodedMessage}`;
    
    cart = [];
    saveCart();
    updateCartUI();
    closeModals();
    
    window.open(whatsappUrl, '_blank');
    
    setTimeout(() => {
        alert("Thank you! Opening WhatsApp to send your order.");
    }, 500);
}

document.addEventListener('DOMContentLoaded', init);
