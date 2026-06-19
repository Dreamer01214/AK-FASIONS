/* =========================================
   AK FASHIONS - MAIN JAVASCRIPT
   ========================================= */

const baseProducts = [
    {
        name: "Adidas T-Shirt",
        category: "tshirts",
        price: 350,
        originalPrice: 599,
        isOffer: true,
        image: "assets/adidas front.jpeg",
        images: ["assets/adidas front.jpeg", "assets/adidas back.jpeg"],
        description: "Premium acid wash oversized t-shirt. Trendy and comfortable.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Blue"]
    },
    {
        name: "Adidas T-Shirt",
        category: "tshirts",
        price: 350,
        originalPrice: 599,
        isOffer: true,
        image: "assets/adidas tshirt1.jpeg",
        description: "Premium acid wash oversized t-shirt. Trendy and comfortable.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Beige"]
    },
    {
        name: "Adidas T-Shirt",
        category: "tshirts",
        price: 350,
        originalPrice: 599,
        isOffer: true,
        image: "assets/adidas tshirt2.jpeg",
        description: "Premium acid wash oversized t-shirt. Trendy and comfortable.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Pink"]
    },
    {
        name: "Premium Cotton T-Shirt",
        category: "tshirts",
        price: 350,
        originalPrice: 599,
        isOffer: true,
        image: "assets/tshirt.jpg",
        description: "Soft and breathable premium cotton t-shirt. Available in multiple colors.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "White", "Navy", "Olive"]
    },
    {
        name: "Casual Checkered Shirt",
        category: "shirts",
        price: 430,
        originalPrice: 799,
        isOffer: true,
        image: "assets/casual shirt.jpg",
        description: "A comfortable and stylish checkered shirt for everyday wear.",
        sizes: ["M", "L", "XL"],
        colors: ["Red/Black", "Blue/White", "Grey/Black"]
    },
    {
        name: "Tactical Black Cargo Pants",
        category: "jeans",
        price: 899,
        isOffer: false,
        image: "assets/tactical_black_cargo_pants.jpg",
        description: "Comfortable and durable black cargo pants with multiple utility pockets.",
        sizes: ["30", "32", "34", "36"]
    },
    {
        name: "Light Blue Denim Cargo Jeans",
        category: "jeans",
        price: 999,
        originalPrice: 1299,
        isOffer: true,
        image: "assets/light_blue_denim_cargo_jeans.jpg",
        description: "Modern light wash denim combined with functional cargo styling.",
        sizes: ["28", "30", "32", "34"]
    },
    {
        name: "Solid Formal Shirt",
        category: "shirts",
        price: 430,
        isOffer: false,
        image: "assets/plain formal shirt.jpg",
        description: "Classic solid formal shirt, perfect for office and formal events.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["White", "Light Blue", "Pink", "Black"]
    },
    {
        name: "Graphic Print T-Shirt",
        category: "tshirts",
        price: 350,
        isOffer: false,
        image: "assets/printed tshirt.jpg",
        description: "Trendy graphic print t-shirt for a cool casual look.",
        sizes: ["M", "L", "XL"],
        colors: ["White", "Black", "Grey"]
    },
    {
        name: "Classic Denim Jacket",
        category: "shirts",
        price: 899,
        originalPrice: 1299,
        isOffer: true,
        image: "assets/vintage_dark_denim_shirt.jpeg",
        description: "A timeless denim jacket that pairs perfectly with any outfit.",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        name: "Urban Polo T-Shirt",
        category: "tshirts",
        price: 350,
        isOffer: false,
        image: "assets/tshirt1.jpg",
        description: "Smart casual polo t-shirt with contrast collar.",
        sizes: ["M", "L", "XL", "XXL"],
        colors: ["Navy", "Maroon", "Dark Green"]
    }
];

// Generate 40 products
const products = [];
const extraProductsData = [
    { image: "assets/tshirt 4.jpg", name: "Classic Green Polo", category: "tshirts", price: 350 },
    { image: "assets/tshirt 5.jpg", name: "Premium Black Henley", category: "tshirts", price: 350 },
    { image: "assets/tshirt 6.jpg", name: "Vintage T-Shirt", category: "tshirts", price: 350 },
    { image: "assets/white tshirt.jpg", name: "Essential White T-Shirt", category: "tshirts", price: 350 },
    { image: "assets/designed shirt.jpg", name: "Tropical Printed Shirt", category: "shirts", price: 430 },
    { image: "assets/plain fomal shirt 2.jpg", name: "Navy Blue Formal Shirt", category: "shirts", price: 430 },
    { image: "assets/OIP (33).jpg", name: "Striped Linen Henley", category: "shirts", price: 430 },
    { image: "assets/OIP (34).jpg", name: "Casual Oxford Shirt", category: "shirts", price: 430 },
    { image: "assets/OIP (35).jpg", name: "Camo Cargo Half Trousers", category: "jeans", price: 430 },
    { image: "assets/OIP (36).jpg", name: "Grey Athletic Half Trousers", category: "jeans", price: 430 }
];

baseProducts.forEach((base, i) => {
    products.push({
        id: i + 1,
        name: base.name,
        category: base.category,
        price: base.price,
        originalPrice: base.originalPrice,
        isOffer: i % 3 === 0 ? true : base.isOffer,
        image: base.image,
        images: base.images,
        description: base.description,
        sizes: base.sizes || ["S", "M", "L", "XL"],
        colors: base.colors || []
    });
});

extraProductsData.forEach((extra, i) => {
    const globalIndex = baseProducts.length + i;
    products.push({
        id: globalIndex + 1,
        name: extra.name,
        category: extra.category,
        price: extra.price,
        originalPrice: extra.price + 299,
        isOffer: globalIndex % 3 === 0,
        image: extra.image,
        description: "Premium quality clothing for everyday comfort and style.",
        sizes: ["M", "L", "XL"],
        colors: []
    });
});

const comboImages = [
    "assets/combo.jpeg", "assets/combo1.jpeg", "assets/combo2.jpeg", 
    "assets/combo4.jpeg", "assets/combo5.jpeg", "assets/combo6.jpeg", 
    "assets/combo7.jpeg", "assets/combo8.jpeg", "assets/combo9.jpeg", 
    "assets/combo10.jpeg", "assets/combo11.jpeg", "assets/combo12.jpeg", 
    "assets/combo13.jpeg", "assets/combo14.jpeg", "assets/combo15.jpeg", 
    "assets/combo16.jpeg", "assets/combo17.jpeg"
];

const combos = [];
for(let i = 0; i < comboImages.length; i++) {
    combos.push({
        id: 100 + i + 1,
        name: "Premium Style Combo Set",
        category: "combos",
        price: 999,
        originalPrice: 1199,
        isOffer: true,
        image: comboImages[i],
        description: "An exclusive limited edition bundle bringing you premium style and maximum comfort. Save big when bought together!",
        sizes: ["M (Top/32 Bot)", "L (Top/34 Bot)", "XL (Top/36 Bot)"]
    });
}

const allItems = [...products, ...combos];

// --- 2. STATE MANAGEMENT ---
let cart = JSON.parse(localStorage.getItem('ak_cart')) || [];
let selectedProduct = null;
let selectedSize = null;
let selectedColor = null;

// Pagination State
let currentPage = 1;
const itemsPerPage = 12;
let currentFilteredProducts = products; // Defaults to all products

// --- 3. DOM ELEMENTS ---
const elements = {
    productsGrid: document.getElementById('products-grid'), // Shop page
    comboGrid: document.getElementById('combo-grid'),       // Home page
    seasonalGrid: document.getElementById('seasonal-grid'), // Home page
    newGrid: document.getElementById('new-grid'),           // Home page
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
        renderGrid(combos.slice(0, 3), elements.comboGrid); // Render all combos on Home
    } 
    if (elements.seasonalGrid) {
        const seasonalOffers = products.filter(p => p.isOffer).slice(0, 3);
        renderGrid(seasonalOffers, elements.seasonalGrid);
    }
    if (elements.newGrid) {
        renderGrid(products.slice(0, 3), elements.newGrid);
    }
    
    if (elements.productsGrid) {
        const urlParams = new URLSearchParams(window.location.search);
        const filterParam = urlParams.get('filter');
        const collectionParam = urlParams.get('collection');
        
        let shopTitle = document.querySelector('.shop-header .hero-title');
        let shopSubtitle = document.querySelector('.shop-header .hero-subtitle');
        let categoryFilters = document.getElementById('category-filters');

        if (collectionParam) {
            // Dynamic separate interface UI
            if(categoryFilters) categoryFilters.style.display = 'none';

            if (collectionParam === 'combos') {
                if(shopTitle) shopTitle.textContent = "Combo Offers";
                if(shopSubtitle) shopSubtitle.textContent = "Exclusive sets tailored for the perfect look.";
                currentFilteredProducts = combos;
            } else if (collectionParam === 'seasonal') {
                if(shopTitle) shopTitle.textContent = "Seasonal Offers";
                if(shopSubtitle) shopSubtitle.textContent = "Up to 50% off on winter and premium items.";
                currentFilteredProducts = products.filter(p => p.isOffer);
            } else if (collectionParam === 'new') {
                if(shopTitle) shopTitle.textContent = "New Collection";
                if(shopSubtitle) shopSubtitle.textContent = "Be the first to wear our latest arrivals.";
                // Let's pretend the first 16 items in 'products' are new
                currentFilteredProducts = products.slice(0, 16);
            }
        } else if (filterParam) {
            if (filterParam === 'all') {
                currentFilteredProducts = allItems;
            } else if (filterParam === 'offers') {
                currentFilteredProducts = products.filter(p => p.isOffer);
            } else {
                currentFilteredProducts = products.filter(p => p.category === filterParam);
            }
            
            if (elements.filterBtns) {
                elements.filterBtns.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.getAttribute('data-filter') === filterParam) {
                        btn.classList.add('active');
                    }
                });
            }
        } else {
            // Default Shop page shows all 50 items
            currentFilteredProducts = allItems;
        }
        
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
window.changeModalImage = function(thumbElement, newSrc) {
    document.getElementById('main-product-img').src = newSrc;
    document.querySelectorAll('.gallery-thumb').forEach(el => {
        el.style.border = '2px solid transparent';
    });
    thumbElement.style.border = '2px solid var(--primary-color)';
};

window.openProductModal = function(productId) {
    selectedProduct = allItems.find(p => p.id === productId);
    selectedSize = null; 
    selectedColor = null;
    
    if (!selectedProduct) return;
    
    let priceHtml = selectedProduct.originalPrice 
        ? `<span class="original-price" style="font-size:1.2rem">${formatPrice(selectedProduct.originalPrice)}</span> ${formatPrice(selectedProduct.price)}` 
        : formatPrice(selectedProduct.price);
        
    let colorSelectorHtml = '';
    if (selectedProduct.colors && selectedProduct.colors.length > 0) {
        colorSelectorHtml = `
            <div class="selector-group">
                <label class="selector-label">Select Color <span style="color:#ff4757" id="color-error"></span></label>
                <div class="size-options">
                    ${selectedProduct.colors.map(color => `
                        <button class="size-btn color-btn" onclick="selectColor('${color}', this)" style="width: auto; padding: 0 15px;">${color}</button>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    let imageGalleryHtml = '';
    if (selectedProduct.images && selectedProduct.images.length > 1) {
        imageGalleryHtml = `
            <div class="product-gallery" style="display: flex; gap: 10px; margin-top: 15px; justify-content: center;">
                ${selectedProduct.images.map((img, idx) => `
                    <img src="${img}" class="gallery-thumb" style="width: 60px; height: 60px; object-fit: contain; background: var(--bg-elevated); border-radius: 5px; cursor: pointer; border: 2px solid ${idx === 0 ? 'var(--primary-color)' : 'transparent'}; transition: border-color 0.2s;" onclick="changeModalImage(this, '${img}')">
                `).join('')}
            </div>
        `;
    }
    
    elements.productDetailsContainer.innerHTML = `
        <div class="product-detail-grid">
            <div class="product-detail-img-container">
                ${selectedProduct.isOffer ? `<div class="offer-badge" style="font-size: 1rem; padding: 8px 16px;">SPECIAL OFFER</div>` : ''}
                <img src="${selectedProduct.image}" alt="${selectedProduct.name}" class="product-detail-img" id="main-product-img">
                ${imageGalleryHtml}
            </div>
            <div class="product-detail-info">
                <span style="color: var(--primary-color); font-weight: 600; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 5px; display: block;">${selectedProduct.category}</span>
                <h2 class="product-detail-title">${selectedProduct.name}</h2>
                <div class="product-detail-price">${priceHtml}</div>
                <p class="product-detail-desc">${selectedProduct.description}</p>
                
                ${colorSelectorHtml}
                
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

window.selectColor = function(color, btnElement) {
    selectedColor = color;
    document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('selected'));
    btnElement.classList.add('selected');
    if (document.getElementById('color-error')) {
        document.getElementById('color-error').textContent = '';
    }
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
    if (selectedProduct.colors && selectedProduct.colors.length > 0 && !selectedColor) {
        document.getElementById('color-error').textContent = '(Please select a color)';
        return;
    }

    if (!selectedSize) {
        document.getElementById('size-error').textContent = '(Please select a size)';
        return;
    }
    
    const qty = parseInt(document.getElementById('modal-qty').value);
    addToCart(selectedProduct, selectedSize, qty, selectedColor);
    
    closeModals();
    toggleCartSidebar(true);
}

// --- 7. CART LOGIC ---
function addToCart(product, size, qty, color) {
    const existingItemIndex = cart.findIndex(item => item.id === product.id && item.size === size && item.color === color);
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].qty += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: size,
            color: color,
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
                <div class="cart-item-meta">Size: ${item.size}${item.color ? ` | Color: ${item.color}` : ''}</div>
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
                    <div class="checkout-item-detail">Size: ${item.size} ${item.color ? `| Color: ${item.color}` : ''} | Qty: ${item.qty}</div>
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
   Size: ${item.size} ${item.color ? `| Color: ${item.color}` : ''} | Qty: ${item.qty} | ₹${item.price} each`;
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
