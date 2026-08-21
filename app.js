/* =========================================
   AK FASHIONS - MAIN JAVASCRIPT v2.0
   ========================================= */

const WHATSAPP_NUMBER = "919361438664";

// ==========================================
// 1. PRODUCT DATA
// ==========================================
const baseProducts = [
    {
        id: 1,
        name: "Adidas T-Shirt (Blue)",
        category: "tshirts",
        price: 350,
        originalPrice: 599,
        isOffer: true,
        image: "assets/T-Shirt/adidas front.jpeg",
        images: ["assets/T-Shirt/adidas front.jpeg", "assets/T-Shirt/adidas back.jpeg"],
        description: "Premium acid wash oversized t-shirt. Trendy and comfortable.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Blue"],
        defaultStock: { S: 15, M: 20, L: 18, XL: 12 }
    },
    {
        id: 2,
        name: "Adidas T-Shirt (Beige)",
        category: "tshirts",
        price: 350,
        originalPrice: 599,
        isOffer: true,
        image: "assets/T-Shirt/adidas tshirt1.jpeg",
        description: "Premium acid wash oversized t-shirt. Trendy and comfortable.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Beige"],
        defaultStock: { S: 10, M: 15, L: 12, XL: 8 }
    },
    {
        id: 3,
        name: "Adidas T-Shirt (Pink)",
        category: "tshirts",
        price: 350,
        originalPrice: 599,
        isOffer: true,
        image: "assets/T-Shirt/adidas tshirt2.jpeg",
        description: "Premium acid wash oversized t-shirt. Trendy and comfortable.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Pink"],
        defaultStock: { S: 8, M: 14, L: 16, XL: 10 }
    },
    {
        id: 4,
        name: "Premium Cotton T-Shirt",
        category: "tshirts",
        price: 350,
        originalPrice: 599,
        isOffer: true,
        image: "assets/T-Shirt/tshirt.png",
        description: "Soft and breathable premium cotton t-shirt. Available in multiple colors.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "White", "Navy", "Olive"],
        defaultStock: { S: 20, M: 25, L: 22, XL: 15 }
    },
    {
        id: 5,
        name: "Casual Checkered Shirt",
        category: "shirts",
        price: 430,
        originalPrice: 799,
        isOffer: true,
        image: "assets/Shirt/casual shirt.png",
        description: "A comfortable and stylish checkered shirt for everyday wear.",
        sizes: ["M", "L", "XL"],
        colors: ["Red/Black", "Blue/White", "Grey/Black"],
        defaultStock: { M: 18, L: 20, XL: 14 }
    },
    {
        id: 6,
        name: "Tactical Black Cargo Pants",
        category: "jeans",
        price: 899,
        isOffer: false,
        image: "assets/Track Pant/tactical_black_cargo_pants.jpg",
        description: "Comfortable and durable black cargo pants with multiple utility pockets.",
        sizes: ["30", "32", "34", "36"],
        defaultStock: { "30": 10, "32": 15, "34": 12, "36": 8 }
    },
    {
        id: 7,
        name: "Light Blue Denim Cargo Jeans",
        category: "jeans",
        price: 999,
        originalPrice: 1299,
        isOffer: true,
        image: "assets/Pant/light_blue_denim_cargo_jeans.jpg",
        description: "Modern light wash denim combined with functional cargo styling.",
        sizes: ["28", "30", "32", "34"],
        defaultStock: { "28": 8, "30": 12, "32": 14, "34": 10 }
    },
    {
        id: 8,
        name: "Solid Formal Shirt",
        category: "shirts",
        price: 430,
        isOffer: false,
        image: "assets/Shirt/plain formal shirt.png",
        description: "Classic solid formal shirt, perfect for office and formal events.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["White", "Light Blue", "Pink", "Black"],
        defaultStock: { S: 12, M: 18, L: 16, XL: 10 }
    },
    {
        id: 9,
        name: "Graphic Print T-Shirt",
        category: "tshirts",
        price: 350,
        isOffer: false,
        image: "assets/T-Shirt/printed tshirt.png",
        description: "Trendy graphic print t-shirt for a cool casual look.",
        sizes: ["M", "L", "XL"],
        colors: ["White", "Black", "Grey"],
        defaultStock: { M: 20, L: 18, XL: 12 }
    },
    {
        id: 10,
        name: "Classic Denim Jacket",
        category: "shirts",
        price: 899,
        originalPrice: 1299,
        isOffer: true,
        image: "assets/Shirt/vintage_dark_denim_shirt.jpeg",
        description: "A timeless denim jacket that pairs perfectly with any outfit.",
        sizes: ["S", "M", "L", "XL"],
        defaultStock: { S: 5, M: 8, L: 7, XL: 4 }
    },
    {
        id: 11,
        name: "Urban Polo T-Shirt",
        category: "tshirts",
        price: 350,
        isOffer: false,
        image: "assets/T-Shirt/tshirt1.png",
        description: "Smart casual polo t-shirt with contrast collar.",
        sizes: ["M", "L", "XL", "XXL"],
        colors: ["Navy", "Maroon", "Dark Green"],
        defaultStock: { M: 14, L: 16, XL: 10, XXL: 6 }
    }
];

const extraProductsData = [
    { id: 12, image: "assets/T-Shirt/tshirt 4.jpg", name: "Classic Green Polo", category: "tshirts", price: 350, defaultStock: { S: 10, M: 15, L: 12, XL: 8 } },
    { id: 13, image: "assets/T-Shirt/tshirt 5.jpg", name: "Premium Black Henley", category: "tshirts", price: 350, defaultStock: { S: 8, M: 12, L: 14, XL: 10 } },
    { id: 14, image: "assets/T-Shirt/tshirt 6.jpg", name: "Vintage T-Shirt", category: "tshirts", price: 350, defaultStock: { S: 12, M: 16, L: 14, XL: 9 } },
    { id: 15, image: "assets/T-Shirt/white tshirt.jpg", name: "Essential White T-Shirt", category: "tshirts", price: 350, defaultStock: { S: 20, M: 25, L: 22, XL: 15 } },
    { id: 16, image: "assets/Shirt/designed shirt.jpg", name: "Tropical Printed Shirt", category: "shirts", price: 430, defaultStock: { M: 10, L: 12, XL: 8 } },
    { id: 17, image: "assets/Shirt/plain fomal shirt 2.png", name: "Navy Blue Formal Shirt", category: "shirts", price: 430, defaultStock: { S: 8, M: 12, L: 10, XL: 6 } },
    { id: 18, image: "assets/Shirt/OIP (33).jpg", name: "Striped Linen Henley", category: "shirts", price: 430, defaultStock: { M: 14, L: 16, XL: 10 } },
    { id: 19, image: "assets/Shirt/OIP (34).jpg", name: "Casual Oxford Shirt", category: "shirts", price: 430, defaultStock: { S: 6, M: 10, L: 8, XL: 5 } },
    { id: 20, image: "assets/Pant/OIP (35).png", name: "Camo Cargo Half Trousers", category: "jeans", price: 430, defaultStock: { "30": 8, "32": 10, "34": 8, "36": 5 } },
    { id: 21, image: "assets/Track Pant/OIP (36).jpg", name: "Grey Athletic Half Trousers", category: "jeans", price: 430, defaultStock: { "30": 6, "32": 10, "34": 9, "36": 4 } }
];

// Build products array
const products = baseProducts.map(p => ({
    ...p,
    colors: p.colors || [],
    sizes: p.sizes || ["S", "M", "L", "XL"]
}));

extraProductsData.forEach(extra => {
    // Bug fix: only mark as offer if there's an actual discount defined;
    // previously all extra products were given a fabricated originalPrice.
    const hasDiscount = extra.originalPrice && extra.originalPrice > extra.price;
    products.push({
        id: extra.id,
        name: extra.name,
        category: extra.category,
        price: extra.price,
        originalPrice: hasDiscount ? extra.originalPrice : undefined,
        isOffer: hasDiscount,
        image: extra.image,
        description: "Premium quality clothing for everyday comfort and style.",
        sizes: Object.keys(extra.defaultStock),
        colors: [],
        defaultStock: extra.defaultStock
    });
});

// Build combos
const comboImages = [
    "assets/Combo/combo.jpeg", "assets/Combo/combo1.jpeg", "assets/Combo/combo2.jpeg",
    "assets/Combo/combo4.jpeg", "assets/Combo/combo5.jpeg", "assets/Combo/combo6.jpeg",
    "assets/Combo/combo7.jpeg", "assets/Combo/combo8.jpeg", "assets/Combo/combo9.jpeg",
    "assets/Combo/combo10.jpeg", "assets/Combo/combo11.jpeg", "assets/Combo/combo12.jpeg",
    "assets/Combo/combo13.jpeg", "assets/Combo/combo14.jpeg", "assets/Combo/combo15.jpeg",
    "assets/Combo/combo16.jpeg", "assets/Combo/combo17.jpeg"
];

const combos = comboImages.map((img, i) => ({
    id: 100 + i + 1,
    name: "Premium Style Combo Set",
    category: "combos",
    price: 999,
    originalPrice: 1199,
    isOffer: true,
    image: img,
    description: "An exclusive limited edition bundle bringing you premium style and maximum comfort. Save big when bought together!",
    sizes: ["M", "L", "XL"],
    colors: [],
    defaultStock: { M: 10, L: 12, XL: 8 }
}));

const allItems = [...products, ...combos];

// Load custom products from admin
const customProducts = JSON.parse(localStorage.getItem('ak_custom_products')) || [];
customProducts.forEach(cp => {
    products.push(cp);
    allItems.push(cp);
});

// Apply admin modifications to base products
const modifiedProducts = JSON.parse(localStorage.getItem('ak_modified_products')) || {};
allItems.forEach(p => {
    if (modifiedProducts[p.id]) {
        Object.assign(p, modifiedProducts[p.id]);
    }
});

// ==========================================
// 2. STOCK MANAGER
// ==========================================
const stockManager = {
    STORAGE_KEY: 'ak_stock_v2',

    init() {
        const existing = localStorage.getItem(this.STORAGE_KEY);
        if (!existing) {
            const stockData = {};
            allItems.forEach(p => {
                stockData[p.id] = {};
                if (p.defaultStock) {
                    Object.assign(stockData[p.id], p.defaultStock);
                } else {
                    (p.sizes || []).forEach(s => { stockData[p.id][s] = 15; });
                }
            });
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stockData));
        }
    },

    getAll() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || {};
    },

    get(productId, size) {
        const all = this.getAll();
        return (all[productId] && all[productId][size] !== undefined) ? all[productId][size] : 0;
    },

    getProductStock(productId) {
        const all = this.getAll();
        return all[productId] || {};
    },

    reduce(productId, size, qty) {
        const all = this.getAll();
        if (!all[productId]) all[productId] = {};
        const current = all[productId][size] || 0;
        all[productId][size] = Math.max(0, current - qty);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
    },

    set(productId, size, qty) {
        const all = this.getAll();
        if (!all[productId]) all[productId] = {};
        all[productId][size] = parseInt(qty) || 0;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
    },

    getTotalForProduct(productId) {
        const stock = this.getProductStock(productId);
        return Object.values(stock).reduce((a, b) => a + b, 0);
    },

    getStockLabel(qty) {
        if (qty === 0) return { label: 'Out of Stock', cls: 'stock-none' };
        if (qty <= 2) return { label: `${qty} left`, cls: 'stock-low' };
        if (qty <= 5) return { label: `${qty} left`, cls: 'stock-medium' };
        return { label: `${qty} in stock`, cls: 'stock-good' };
    }
};

// ==========================================
// 3. ORDER HISTORY
// ==========================================
const orderHistory = {
    STORAGE_KEY: 'ak_order_history_v2',

    getAll() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    },

    save(order) {
        const orders = this.getAll();
        orders.unshift(order);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(orders));
    },

    generateId() {
        // Add random suffix to avoid collisions if two orders are placed within the same millisecond
        return 'ORD-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7).toUpperCase();
    }
};

// ==========================================
// 4. STATE
// ==========================================
let cart = JSON.parse(localStorage.getItem('ak_cart_v2')) || [];
let selectedProduct = null;
let selectedSize = null;
let selectedColor = null;
let currentPage = 1;
const itemsPerPage = 12;
let currentFilteredProducts = products;

// ==========================================
// 5. DOM ELEMENTS
// ==========================================
const elements = {
    productsGrid: document.getElementById('products-grid'),
    comboGrid: document.getElementById('combo-grid'),
    seasonalGrid: document.getElementById('seasonal-grid'),
    newGrid: document.getElementById('new-grid'),
    paginationContainer: document.getElementById('pagination-container'),
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
    loginModal: document.getElementById('login-modal'),
    closeLoginModal: document.getElementById('close-login-modal'),
    googleSigninBtn: document.getElementById('google-signin-btn'),
    productModal: document.getElementById('product-modal'),
    closeProductModal: document.getElementById('close-product-modal'),
    productDetailsContainer: document.getElementById('product-details-container'),
    checkoutModal: document.getElementById('checkout-modal'),
    closeCheckoutModal: document.getElementById('close-checkout-modal'),
    checkoutForm: document.getElementById('checkout-form'),
    checkoutItems: document.getElementById('checkout-items'),
    checkoutTotalAmount: document.getElementById('checkout-total-amount'),
    groupOrderModal: document.getElementById('group-order-modal'),
    closeGroupOrderModal: document.getElementById('close-group-order-modal'),
    groupOrderContainer: document.getElementById('group-order-container')
};

// ==========================================
// 6. INIT
// ==========================================
function init() {
    stockManager.init();

    if (elements.comboGrid) renderGrid(combos.slice(0, 3), elements.comboGrid);
    if (elements.seasonalGrid) renderGrid(products.filter(p => p.isOffer).slice(0, 3), elements.seasonalGrid);
    if (elements.newGrid) renderGrid(products.slice(0, 3), elements.newGrid);

    if (elements.productsGrid) {
        const urlParams = new URLSearchParams(window.location.search);
        let filterParam = urlParams.get('filter');
        let collectionParam = urlParams.get('collection');
        let shopTitle = document.querySelector('.shop-header .hero-title');
        let shopSubtitle = document.querySelector('.shop-header .hero-subtitle');
        let categoryFilters = document.getElementById('category-filters');
        
        const path = window.location.pathname.toLowerCase();
        if (!filterParam && !collectionParam) {
            if (path.includes('tshirt.html')) filterParam = 'tshirts';
            else if (path.includes('shirt.html')) filterParam = 'shirts';
            else if (path.includes('pant.html')) filterParam = 'jeans';
            else if (path.includes('track.html')) filterParam = 'track';
            else if (path.includes('combo.html')) collectionParam = 'combos';
        }

        if (collectionParam) {
            if (categoryFilters) categoryFilters.style.display = 'none';
            if (collectionParam === 'combos') {
                if (shopTitle) shopTitle.textContent = "Combo Offers";
                if (shopSubtitle) shopSubtitle.textContent = "Exclusive sets tailored for the perfect look.";
                currentFilteredProducts = allItems.filter(p => p.category === 'combos' || p.category === 'combo');
            } else if (collectionParam === 'seasonal') {
                if (shopTitle) shopTitle.textContent = "Seasonal Offers";
                if (shopSubtitle) shopSubtitle.textContent = "Up to 50% off on premium items.";
                currentFilteredProducts = allItems.filter(p => p.isOffer);
            } else if (collectionParam === 'new') {
                if (shopTitle) shopTitle.textContent = "New Collection";
                if (shopSubtitle) shopSubtitle.textContent = "Be the first to wear our latest arrivals.";
                currentFilteredProducts = allItems.slice(0, 16);
            }
        } else if (filterParam) {
            if (categoryFilters) categoryFilters.style.display = 'none'; // Hide category filters on specific category pages
            
            if (filterParam === 'all') currentFilteredProducts = allItems;
            else if (filterParam === 'offers') currentFilteredProducts = allItems.filter(p => p.isOffer);
            else currentFilteredProducts = allItems.filter(p => p.category === filterParam);

            if (shopTitle && filterParam !== 'all') {
                shopTitle.textContent = filterParam.charAt(0).toUpperCase() + filterParam.slice(1);
                // Bug fix: null-check shopSubtitle before accessing it
                if (shopSubtitle) shopSubtitle.textContent = "Browse our premium " + filterParam + ".";
            }

            if (elements.filterBtns && categoryFilters && categoryFilters.style.display !== 'none') {
                elements.filterBtns.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.getAttribute('data-filter') === filterParam) btn.classList.add('active');
                });
            }
        } else {
            currentFilteredProducts = allItems;
        }
        renderPaginatedGrid();
    }

    updateCartUI();
    setupEventListeners();

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Section 15: Admin login form (storefront modal)
    const adminLoginForm = document.getElementById('storefront-admin-login');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('modal-admin-id').value;
            const pass = document.getElementById('modal-admin-password').value;
            const errorMsg = document.getElementById('modal-login-error');
            if ((id === 'admin123' || id === 'admin') && pass === 'admin123') {
                const expiresAt = Date.now() + (60 * 60 * 1000);
                localStorage.setItem("ak_admin_auth", JSON.stringify({ loggedIn: true, expiresAt }));
                window.location.href = "admin/index.html";
            } else {
                if (errorMsg) errorMsg.style.display = 'block';
            }
        });
    }

    // Section 16: Scroll-reveal initial observation (delayed so grid renders first)
    setTimeout(observeElements, 500);
}

// ==========================================
// 7. RENDER FUNCTIONS
// ==========================================
function formatPrice(price) {
    return `₹${price.toLocaleString('en-IN')}`;
}

function renderGrid(items, container) {
    if (!container) return;
    container.innerHTML = '';
    if (items.length === 0) {
        container.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted);">No products found.</p>';
        return;
    }
    items.forEach(product => container.appendChild(createProductCard(product)));
}

function renderPaginatedGrid() {
    if (!elements.productsGrid) return;
    elements.productsGrid.innerHTML = '';
    if (currentFilteredProducts.length === 0) {
        elements.productsGrid.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted);">No products found.</p>';
        if (elements.paginationContainer) elements.paginationContainer.innerHTML = '';
        return;
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const pageItems = currentFilteredProducts.slice(startIndex, startIndex + itemsPerPage);
    pageItems.forEach(product => elements.productsGrid.appendChild(createProductCard(product)));
    renderPaginationControls();
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card reveal';

    const priceHtml = product.originalPrice
        ? `<span class="original-price">${formatPrice(product.originalPrice)}</span> <span class="current-price">${formatPrice(product.price)}</span>`
        : `<span class="current-price">${formatPrice(product.price)}</span>`;

    const totalStock = stockManager.getTotalForProduct(product.id);
    const stockInfo = totalStock === 0
        ? `<div class="card-stock-badge stock-none">OUT OF STOCK</div>`
        : totalStock <= 5
            ? `<div class="card-stock-badge stock-low">LOW STOCK</div>`
            : `<div class="card-stock-badge stock-good">IN STOCK</div>`;

    const categoryName = (product.category || 'MENSWEAR').toUpperCase();

    card.innerHTML = `
        <div class="product-img-wrapper" onclick="openProductModal(${product.id})">
            ${stockInfo}
            <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
        </div>
        <div class="product-info">
            <span class="product-category">${categoryName}</span>
            <h3 class="product-title" onclick="openProductModal(${product.id})">${product.name}</h3>
            <div class="product-price">${priceHtml}</div>
            <button class="btn-view-details" onclick="openProductModal(${product.id})">
                <i class="fa-regular fa-eye"></i> View Details
            </button>
        </div>
    `;
    return card;
}

function renderPaginationControls() {
    if (!elements.paginationContainer) return;
    const totalPages = Math.ceil(currentFilteredProducts.length / itemsPerPage);
    elements.paginationContainer.innerHTML = '';
    if (totalPages <= 1) return;

    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => { if (currentPage > 1) { currentPage--; renderPaginatedGrid(); window.scrollTo({ top: 0, behavior: 'smooth' }); } };
    elements.paginationContainer.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.onclick = () => { currentPage = i; renderPaginatedGrid(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
        elements.paginationContainer.appendChild(pageBtn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => { if (currentPage < totalPages) { currentPage++; renderPaginatedGrid(); window.scrollTo({ top: 0, behavior: 'smooth' }); } };
    elements.paginationContainer.appendChild(nextBtn);
}

// ==========================================
// 8. PRODUCT MODAL
// ==========================================
window.changeModalImage = function (thumbEl, newSrc) {
    document.getElementById('main-product-img').src = newSrc;
    document.querySelectorAll('.gallery-thumb').forEach(el => el.style.border = '2px solid transparent');
    thumbEl.style.border = '2px solid var(--primary-color)';
};

window.openProductModal = function (productId) {
    selectedProduct = allItems.find(p => p.id === productId);
    selectedSize = null;
    selectedColor = null;
    if (!selectedProduct) return;

    const priceHtml = selectedProduct.originalPrice
        ? `<span class="original-price" style="font-size:1.2rem">${formatPrice(selectedProduct.originalPrice)}</span> ${formatPrice(selectedProduct.price)}`
        : formatPrice(selectedProduct.price);

    const productStock = stockManager.getProductStock(selectedProduct.id);

    let colorSelectorHtml = '';
    if (selectedProduct.colors && selectedProduct.colors.length > 0) {
        colorSelectorHtml = `
            <div class="selector-group">
                <label class="selector-label">Select Color <span style="color:#ff4757" id="color-error"></span></label>
                <div class="size-options">
                    ${selectedProduct.colors.map(color => `
                        <button class="size-btn color-btn" onclick="selectColor('${color}', this)" style="width:auto;padding:0 15px;">${color}</button>
                    `).join('')}
                </div>
            </div>`;
    }

    let imageGalleryHtml = '';
    if (selectedProduct.images && selectedProduct.images.length > 1) {
        imageGalleryHtml = `
            <div class="product-gallery" style="display:flex;gap:10px;margin-top:15px;justify-content:center;flex-wrap:wrap;">
                ${selectedProduct.images.map((img, idx) => `
                    <img src="${img}" class="gallery-thumb" style="width:60px;height:60px;object-fit:contain;background:var(--bg-elevated);border-radius:5px;cursor:pointer;border:2px solid ${idx === 0 ? 'var(--primary-color)' : 'transparent'};transition:border-color 0.2s;" onclick="changeModalImage(this,'${img}')">
                `).join('')}
            </div>`;
    }

    const totalStock = stockManager.getTotalForProduct(selectedProduct.id);
    const stockStatusHtml = `
        <div class="stock-status-bar">
            <span class="stock-total-label ${totalStock === 0 ? 'stock-none' : totalStock <= 5 ? 'stock-low' : 'stock-good'}">
                <i class="fa-solid fa-boxes-stacked"></i>
                ${totalStock === 0 ? 'Out of Stock' : `${totalStock} units available`}
            </span>
        </div>`;

    const sizesHtml = selectedProduct.sizes.map(size => {
        const qty = productStock[size] !== undefined ? productStock[size] : 0;
        const info = stockManager.getStockLabel(qty);
        const disabled = qty === 0 ? 'disabled' : '';
        return `
            <div class="size-option-wrap">
                <button class="size-btn ${qty === 0 ? 'out-of-stock' : ''}" onclick="selectSize('${size}', this)" ${disabled} style="width:auto;padding:0 15px;">
                    ${size}
                </button>
                <span class="size-stock-label ${info.cls}">${info.label}</span>
            </div>`;
    }).join('');

    elements.productDetailsContainer.innerHTML = `
        <div class="product-detail-grid">
            <div class="product-detail-img-container">
                ${selectedProduct.isOffer ? `<div class="offer-badge" style="font-size:1rem;padding:8px 16px;">SPECIAL OFFER</div>` : ''}
                <img src="${selectedProduct.image}" alt="${selectedProduct.name}" class="product-detail-img" id="main-product-img">
                ${imageGalleryHtml}
            </div>
            <div class="product-detail-info">
                <span style="color:var(--primary-color);font-weight:600;font-size:0.9rem;text-transform:uppercase;margin-bottom:5px;display:block;">${selectedProduct.category}</span>
                <h2 class="product-detail-title">${selectedProduct.name}</h2>
                <div class="product-detail-price">${priceHtml}</div>
                ${stockStatusHtml}
                <p class="product-detail-desc">${selectedProduct.description}</p>
                ${colorSelectorHtml}
                <div class="selector-group">
                    <label class="selector-label">Select Size <span style="color:#ff4757" id="size-error"></span></label>
                    <div class="size-options size-options-stacked">
                        ${sizesHtml}
                    </div>
                </div>
                <div class="selector-group">
                    <label class="selector-label">Quantity</label>
                    <div class="qty-control">
                        <button class="qty-btn" onclick="updateModalQty(-1)">-</button>
                        <input type="number" id="modal-qty" class="qty-input" value="1" min="1" oninput="handleModalQtyInput(this)" onblur="handleModalQtyBlur(this)">
                        <button class="qty-btn" onclick="updateModalQty(1)">+</button>
                    </div>
                </div>
                <div style="display:flex; gap:12px; margin-top:20px;">
                    <button class="btn btn-primary" onclick="addToCartFromModal()" style="flex:1; font-size:1rem; padding:14px;" ${totalStock === 0 ? 'disabled' : ''}>
                        <i class="fa-solid fa-cart-plus"></i> Add to Cart
                    </button>
                    <button class="btn btn-whatsapp" onclick="buyNowFromModal()" style="flex:1; font-size:1rem; padding:14px;" ${totalStock === 0 ? 'disabled' : ''}>
                        <i class="fa-solid fa-bolt"></i> Buy Now
                    </button>
                </div>
            </div>
        </div>`;

    elements.productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.selectColor = function (color, btnEl) {
    selectedColor = color;
    document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('selected'));
    btnEl.classList.add('selected');
    if (document.getElementById('color-error')) document.getElementById('color-error').textContent = '';
};

window.selectSize = function (size, btnEl) {
    if (btnEl.disabled) return;
    selectedSize = size;
    document.querySelectorAll('.size-btn:not(.color-btn)').forEach(btn => btn.classList.remove('selected'));
    btnEl.classList.add('selected');
    const errEl = document.getElementById('size-error');
    if (errEl) errEl.textContent = '';

    // Update max qty based on stock
    const stock = stockManager.get(selectedProduct.id, size);
    const qtyInput = document.getElementById('modal-qty');
    if (qtyInput) {
        qtyInput.max = stock;
        if (parseInt(qtyInput.value) > stock) qtyInput.value = stock;
    }
};

window.updateModalQty = function (change) {
    const input = document.getElementById('modal-qty');
    let newVal = parseInt(input.value) + change;
    const max = selectedSize ? stockManager.get(selectedProduct.id, selectedSize) : 99;
    if (newVal >= 1 && newVal <= max) input.value = newVal;
};

window.addToCartFromModal = function () {
    if (selectedProduct.colors && selectedProduct.colors.length > 0 && !selectedColor) {
        document.getElementById('color-error').textContent = '(Please select a color)';
        return;
    }
    if (!selectedSize) {
        document.getElementById('size-error').textContent = '(Please select a size)';
        return;
    }
    const qty = parseInt(document.getElementById('modal-qty').value);
    const stock = stockManager.get(selectedProduct.id, selectedSize);
    if (qty > stock) {
        showToast(`Only ${stock} units available for size ${selectedSize}`, 'error');
        return;
    }
    addToCart(selectedProduct, selectedSize, qty, selectedColor);
    closeModals();
    toggleCartSidebar(true);
};

window.buyNowFromModal = function () {
    if (selectedProduct.colors && selectedProduct.colors.length > 0 && !selectedColor) {
        const colorErr = document.getElementById('color-error');
        if (colorErr) colorErr.textContent = '(Please select a color)';
        showToast('Please select a color', 'error');
        return;
    }
    if (!selectedSize) {
        const sizeErr = document.getElementById('size-error');
        if (sizeErr) sizeErr.textContent = '(Please select a size)';
        showToast('Please select a size', 'error');
        return;
    }
    const qtyInput = document.getElementById('modal-qty');
    const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
    const stock = stockManager.get(selectedProduct.id, selectedSize);
    if (qty > stock) {
        showToast(`Only ${stock} units available for size ${selectedSize}`, 'error');
        return;
    }
    addToCart(selectedProduct, selectedSize, qty, selectedColor);
    closeModals();
    toggleCartSidebar(true);
};

// ==========================================
// 9. BULK ORDER CENTRALIZED SIZE FLOW & MODAL
// ==========================================
let currentBulkRequirements = {}; // {size: qty}
let currentBulkCategory = null;

function ensureBulkOrderModalExists() {
    // Bug fix: always apply consistent dark styling to the modal, whether it was
    // pre-existing in HTML or dynamically created, to avoid inconsistent appearance.
    let modal = document.getElementById('group-order-modal');
    if (!modal) {
        const modalHtml = `
        <div id="group-order-modal" class="modal">
            <div class="modal-content group-order-modal-content">
                <button class="close-btn" id="close-group-order-modal" onclick="closeModals()">&times;</button>
                <div id="group-order-container"></div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        modal = document.getElementById('group-order-modal');
    }
    // Bug fix: use a data attribute to ensure the backdrop-click listener is only
    // added once, even if the modal was pre-existing in HTML (where the listener
    // was never attached). Prevents listener stacking on repeated calls.
    if (!modal.dataset.backdropListenerAdded) {
        modal.addEventListener('click', e => {
            if (e.target === modal) closeModals();
        });
        modal.dataset.backdropListenerAdded = 'true';
    }
    // Always enforce the dark styling on the inner content div
    const inner = modal.querySelector('.group-order-modal-content');
    if (inner) {
        inner.style.background = '#161616';
        inner.style.border = '1px solid var(--border-gold)';
        inner.style.padding = '0';
        inner.style.borderRadius = '8px';
    }
    elements.groupOrderModal = modal;
    elements.closeGroupOrderModal = document.getElementById('close-group-order-modal');
    elements.groupOrderContainer = document.getElementById('group-order-container');
}

window.openBulkOrderFlow = function() {
    closeModals();
    ensureBulkOrderModalExists();

    currentBulkRequirements = {};
    currentBulkCategory = null;
    
    if (document.getElementById('close-group-order-modal')) {
        document.getElementById('close-group-order-modal').style.display = 'block';
    }

    elements.groupOrderContainer.innerHTML = `
        <div class="group-size-selector-header" style="padding: 30px 30px 10px;">
            <h2 style="font-family: var(--font-heading); font-size: 2rem; margin-bottom: 10px; color: var(--primary-color);">Bulk Orders</h2>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.5;">Select a product type for your bulk order.</p>
        </div>
        <div class="group-size-selector-body" style="padding: 20px 30px 30px;">
            <div class="category-selector-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 15px; margin-bottom: 30px;">
                ${['shirts', 'tshirts', 'jeans', 'track', 'combos'].map(cat => `
                    <button class="btn btn-outline" onclick="selectBulkCategory('${cat}')" style="padding: 15px; font-size: 1.1rem; font-weight: bold; border-radius: 12px; display: flex; flex-direction: column; align-items: center; gap: 10px; text-transform: capitalize;">
                        <i class="fa-solid fa-${cat === 'combos' ? 'boxes-stacked' : cat === 'jeans' || cat === 'track' ? 'mitten' : 'shirt'}"></i>
                        ${cat === 'jeans' ? 'Pants' : cat === 'track' ? 'Track Pants' : cat}
                    </button>
                `).join('')}
            </div>
            <div style="background: rgba(255,255,255,0.03); border-radius: 10px; padding: 20px; border-left: 4px solid var(--primary-color);">
                <h4 style="margin-bottom: 5px; color: var(--text-main);"><i class="fa-solid fa-circle-info"></i> How it works</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin: 0;">1. Select Product Type.<br>2. Enter quantity for multiple sizes.<br>3. We will show you products that can fulfill your entire order.</p>
            </div>
        </div>
    `;

    elements.groupOrderModal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.selectBulkCategory = function(cat) {
    currentBulkCategory = cat;
    let sizes = [];
    if (cat === 'shirts' || cat === 'tshirts' || cat === 'combos') {
        sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    } else {
        sizes = ['28', '30', '32', '34', '36'];
    }
    
    if (document.getElementById('close-group-order-modal')) {
        document.getElementById('close-group-order-modal').style.display = 'none';
    }

    elements.groupOrderContainer.innerHTML = `
        <div style="display:flex;flex-direction:column;">
            <div style="padding:22px 24px 18px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:flex-start;">
                <div>
                    <h2 style="font-family:var(--font-heading);font-size:1.75rem;font-weight:800;color:var(--primary-color);margin:0 0 3px 0;">Enter Sizes</h2>
                    <p style="color:#6b7280;font-size:0.85rem;margin:0;text-transform:capitalize;">Category: ${cat === 'jeans' ? 'Pants' : cat === 'track' ? 'Track Pants' : cat}</p>
                </div>
                <div style="display:flex;align-items:center;gap:10px;">
                    <button onclick="openBulkOrderFlow()" style="background:#d4d4d4;color:#111;padding:5px 14px;font-size:0.8rem;font-weight:600;font-family:var(--font-sans);border-radius:5px;border:none;cursor:pointer;">
                        &larr; Back
                    </button>
                    <button onclick="closeModals()" style="background:none;border:none;color:#9ca3af;font-size:1.3rem;cursor:pointer;padding:0;line-height:1;">
                        &times;
                    </button>
                </div>
            </div>
            <div>
                ${sizes.map((size, idx) => `
                    <div style="display:flex;justify-content:space-between;align-items:center;padding:15px 24px;${idx < sizes.length - 1 ? 'border-bottom:1px solid rgba(255,255,255,0.05);' : ''}">
                        <span style="font-weight:700;font-size:1.1rem;color:#fff;">${size}</span>
                        <div style="display:flex;align-items:center;">
                            <button type="button" onclick="adjustBulkReqQty('${size}', -1)" style="width:32px;height:32px;background:#2a2a2a;border:none;color:#999;font-size:1rem;cursor:pointer;border-radius:5px 0 0 5px;display:flex;align-items:center;justify-content:center;">&#8722;</button>
                            <input type="number" id="bulk-req-${size}" value="0" min="0" oninput="handleBulkReqInput('${size}', this)" onblur="handleBulkReqBlur('${size}', this)" style="width:42px;height:32px;background:#1e1e1e;border:none;color:#fff;text-align:center;font-size:0.9rem;font-weight:600;padding:0;outline:none;-moz-appearance:textfield;-webkit-appearance:none;">
                            <button type="button" onclick="adjustBulkReqQty('${size}', 1)" style="width:32px;height:32px;background:#2a2a2a;border:none;color:#999;font-size:1rem;cursor:pointer;border-radius:0 5px 5px 0;display:flex;align-items:center;justify-content:center;">&#43;</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div style="padding:16px 24px 24px;">
                <button onclick="findBulkProducts()" style="width:100%;padding:14px;background:var(--primary-color);color:#111;font-family:var(--font-heading);font-size:1rem;font-weight:700;border:none;border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
                    Find Products <i class="fa-solid fa-magnifying-glass" style="font-size:0.85rem;"></i>
                </button>
            </div>
        </div>
    `;
};

window.adjustBulkReqQty = function(size, change) {
    const input = document.getElementById(`bulk-req-${size}`);
    let val = parseInt(input.value) + change;
    if (val < 0) val = 0;
    input.value = val;
    currentBulkRequirements[size] = val;
};

window.findBulkProducts = function() {
    // Bug fix: always re-read current DOM values before searching, in case oninput
    // didn't fire (e.g. browser autofill or programmatic value changes)
    document.querySelectorAll('[id^="bulk-req-"]').forEach(input => {
        const size = input.id.replace('bulk-req-', '');
        const val = parseInt(input.value);
        currentBulkRequirements[size] = isNaN(val) || val < 0 ? 0 : val;
    });

    let reqs = Object.keys(currentBulkRequirements).filter(size => currentBulkRequirements[size] > 0);
    if (reqs.length === 0) {
        showToast('Please enter at least one quantity', 'error');
        return;
    }

    const availableProducts = allItems.filter(product => {
        if (product.category !== currentBulkCategory) return false;
        const productStock = stockManager.getProductStock(product.id);
        
        for (let size of reqs) {
            let requiredQty = currentBulkRequirements[size];
            let stockForSize = productStock[size] !== undefined ? productStock[size] : 0;
            if (stockForSize < requiredQty) return false;
        }
        return true;
    });

    let productsListHtml = '';
    if (availableProducts.length === 0) {
        productsListHtml = `
            <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
                <i class="fa-solid fa-face-frown" style="font-size: 3rem; margin-bottom: 15px; color: var(--primary-color);"></i>
                <p>Sorry, no products can fulfill your exact size requirements.</p>
            </div>
        `;
    } else {
        productsListHtml = `
            <div class="group-products-grid" style="display: flex; flex-direction: column; gap: 15px; max-height: 400px; overflow-y: auto; padding-right: 5px;">
                ${availableProducts.map(product => {
                    return `
                        <div class="group-product-list-item" style="display: flex; align-items: center; gap: 15px; padding: 12px; background: rgba(255,255,255,0.03); border: 1px solid #2ed573; border-radius: 12px; transition: all 0.2s;">
                            <img src="${product.image}" alt="${product.name}" style="width: 70px; height: 90px; object-fit: cover; border-radius: 8px;">
                            <div style="flex: 1; text-align: left;">
                                <span class="product-category" style="font-size: 0.75rem; color: var(--primary-color); font-weight: 600; text-transform: uppercase;">${product.category}</span>
                                <h4 style="margin: 3px 0; font-size: 1.1rem; color: var(--text-main);">${product.name}</h4>
                                <div style="display: flex; flex-direction: column; gap: 5px; margin-top: 5px;">
                                    <span style="font-weight: 600; color: #fff;">${formatPrice(product.price)}</span>
                                    <span class="size-stock-badge" style="background: rgba(46, 213, 115, 0.1); color: #2ed573; padding: 4px 8px; border-radius: 20px; font-size: 0.75rem; font-weight: bold; width: fit-content;">
                                        <i class="fa-solid fa-check-circle"></i> Suitable for Your Size Requirements
                                    </span>
                                </div>
                            </div>
                            <button class="btn btn-primary" onclick="openBulkOrderModal(${product.id})" style="padding: 10px 15px; font-size: 0.9rem;">
                                Select <i class="fa-solid fa-chevron-right" style="font-size: 0.8rem; margin-left: 5px;"></i>
                            </button>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    let breakdown = reqs.map(size => `${size} &rarr; ${currentBulkRequirements[size]}`).join(' | ');

    elements.groupOrderContainer.innerHTML = `
        <div class="group-size-selector-header" style="padding: 20px 30px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-color);">
            <div style="text-align: left;">
                <h2 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 5px; color: var(--primary-color);">Matching Products</h2>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin: 0;">Requirements: ${breakdown}</p>
            </div>
            <button class="btn btn-outline" onclick="selectBulkCategory('${currentBulkCategory}')" style="padding: 8px 15px; font-size: 0.85rem; border-radius: 8px;">
                <i class="fa-solid fa-arrow-left"></i> Back
            </button>
        </div>
        <div class="group-size-selector-body" style="padding: 20px 30px 30px;">
            ${productsListHtml}
        </div>
    `;
};

window.openBulkOrderModal = function (productId) {
    const product = allItems.find(p => p.id === productId);
    if (!product) return;

    const productStock = stockManager.getProductStock(product.id);
    const priceHtml = product.originalPrice
        ? `<span class="original-price">${formatPrice(product.originalPrice)}</span> ${formatPrice(product.price)}`
        : formatPrice(product.price);

    const colorOptions = product.colors && product.colors.length > 0 ? `
        <div class="group-field-row">
            <label class="group-field-label">Color</label>
            <select id="group-color-select" class="group-select">
                <option value="">Select Color...</option>
                ${product.colors.map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
        </div>` : '';

    let reqs = Object.keys(currentBulkRequirements).filter(size => currentBulkRequirements[size] > 0);
    let totalQty = 0;
    
    const sizeRows = reqs.map(size => {
        let reqQty = currentBulkRequirements[size];
        totalQty += reqQty;
        return `
            <div class="group-size-row" style="background: rgba(255,255,255,0.02); padding: 10px; border-radius: 8px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                <div class="group-size-label" style="display: flex; gap: 10px; align-items: center;">
                    <span class="size-tag" style="background: var(--primary-color); color: #000; padding: 5px 10px; border-radius: 4px; font-weight: bold;">${size}</span>
                </div>
                <div style="font-weight: bold; font-size: 1.1rem;">
                    Qty: ${reqQty}
                    <input type="hidden" class="group-qty-input" value="${reqQty}" data-size="${size}" data-stock="${productStock[size]}">
                </div>
            </div>`;
    }).join('');

    let totalAmount = totalQty * product.price;

    if (elements.groupOrderContainer) {
        elements.groupOrderContainer.innerHTML = `
            <div class="group-order-product-info">
                <img src="${product.image}" alt="${product.name}" class="group-product-img">
                <div class="group-product-details">
                    <span class="product-category">${product.category.toUpperCase()}</span>
                    <h3>${product.name}</h3>
                    <div class="product-price">${priceHtml}</div>
                </div>
            </div>
            <div class="group-order-form">
                <h3><i class="fa-solid fa-layer-group"></i> Order Review</h3>
                <p class="group-order-hint">Review your selected product and bulk quantities.</p>
                ${colorOptions}
                <div class="group-sizes-grid" style="margin-top: 15px;">
                    ${sizeRows}
                </div>
                <div class="group-order-total" style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid var(--border-color);">
                    <div style="display: flex; flex-direction: column; align-items: flex-start;">
                        <span style="font-size: 0.9rem; color: var(--text-muted);">Total Quantity</span>
                        <span style="font-weight: bold; font-size: 1.1rem;">${totalQty} items</span>
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: flex-end;">
                        <span style="font-size: 0.9rem; color: var(--text-muted);">Total Amount</span>
                        <span id="group-total-amount" class="total-amount" style="font-size: 1.4rem; color: var(--primary-color);">₹${totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                </div>
                <div style="display:flex;gap:10px;margin-top:20px;flex-wrap:wrap;">
                    <button class="btn btn-primary" style="flex:1;" onclick="addBulkToCart(${product.id})">
                        <i class="fa-solid fa-cart-plus"></i> Add to Cart
                    </button>
                    <button class="btn btn-whatsapp" style="flex:1;" onclick="sendBulkOrderDirectly(${product.id})">
                        <i class="fa-brands fa-whatsapp"></i> Checkout
                    </button>
                </div>
            </div>`;
    }
};

window.addBulkToCart = function (productId) {
    const product = allItems.find(p => p.id === productId);
    if (!product) return;

    const inputs = document.querySelectorAll('.group-qty-input');
    const colorSelect = document.getElementById('group-color-select');
    const color = colorSelect ? colorSelect.value : '';

    if (product.colors && product.colors.length > 0 && !color) {
        showToast('Please select a color', 'error');
        return;
    }

    // Bug fix: use for...of so we can properly return on stock error,
    // avoiding the forEach-callback early-return trap.
    for (const inp of inputs) {
        const size = inp.dataset.size;
        const qty = parseInt(inp.value) || 0;
        const stock = parseInt(inp.dataset.stock) || 0;
        if (qty > 0) {
            if (qty > stock) {
                showToast(`Only ${stock} in stock for size ${size}`, 'error');
                return; // Properly exits the entire function
            }
        }
    }

    // All sizes valid — add to cart
    for (const inp of inputs) {
        const size = inp.dataset.size;
        const qty = parseInt(inp.value) || 0;
        const stock = parseInt(inp.dataset.stock) || 0;
        if (qty > 0 && qty <= stock) {
            addToCart(product, size, qty, color, true);
        }
    }

    closeModals();
    toggleCartSidebar(true);
    showToast('Bulk order added to cart!', 'success');
};

window.sendBulkOrderDirectly = function (productId) {
    const product = allItems.find(p => p.id === productId);
    if (!product) return;

    const inputs = document.querySelectorAll('.group-qty-input');
    const colorSelect = document.getElementById('group-color-select');
    const color = colorSelect ? colorSelect.value : '';

    if (product.colors && product.colors.length > 0 && !color) {
        showToast('Please select a color', 'error');
        return;
    }

    // Bug fix: validate ALL sizes first using for...of so a stock error
    // properly exits the function (forEach-callback return does not).
    for (const inp of inputs) {
        const size = inp.dataset.size;
        const qty = parseInt(inp.value) || 0;
        const stock = parseInt(inp.dataset.stock) || 0;
        if (qty > 0 && qty > stock) {
            showToast(`Only ${stock} in stock for size ${size}`, 'error');
            return; // Properly exits the entire function
        }
    }

    const orderLines = [];
    for (const inp of inputs) {
        const size = inp.dataset.size;
        const qty = parseInt(inp.value) || 0;
        if (qty > 0) {
            orderLines.push({ size, qty, price: product.price });
        }
    }

    if (orderLines.length === 0) {
        showToast('Please enter at least one quantity', 'error');
        return;
    }

    const tempCartBackup = [...cart];
    cart = [];
    orderLines.forEach(line => {
        // Bug fix: include _key so bulk items can be deduplicated like regular cart items
        const key = `${product.id}_${line.size}_${color || ''}`;
        cart.push({
            _key: key,
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: line.size,
            color,
            qty: line.qty,
            isGroup: true
        });
    });
    openCheckout();
    window._groupCartBackup = tempCartBackup;
};

// ==========================================
// 10. CART LOGIC
// ==========================================
function addToCart(product, size, qty, color, silent = false) {
    const key = `${product.id}_${size}_${color || ''}`;
    const existingIndex = cart.findIndex(item => item._key === key);
    if (existingIndex > -1) {
        cart[existingIndex].qty += qty;
    } else {
        cart.push({
            _key: key,
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size,
            color,
            qty
        });
    }
    saveCart();
    updateCartUI();
    if (!silent) {
        showToast('Added to cart!', 'success');
        if (elements.cartBtn) {
            elements.cartBtn.classList.remove('bounce-animation');
            void elements.cartBtn.offsetWidth;
            elements.cartBtn.classList.add('bounce-animation');
        }
    }
}

window.removeFromCart = function (index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
};

window.updateCartItemQty = function (index, change) {
    const newQty = cart[index].qty + change;
    if (newQty > 0) {
        cart[index].qty = newQty;
        saveCart();
        updateCartUI();
    }
};

function saveCart() {
    localStorage.setItem('ak_cart_v2', JSON.stringify(cart));
}

function updateCartUI() {
    const totalItems = cart.reduce((t, i) => t + i.qty, 0);
    if (elements.cartBadge) elements.cartBadge.textContent = totalItems;
    if (!elements.cartItemsContainer) return;

    if (cart.length === 0) {
        elements.cartItemsContainer.innerHTML = '<div class="empty-cart-msg"><i class="fa-solid fa-bag-shopping" style="font-size:2rem;margin-bottom:10px;display:block;"></i>Your cart is empty.</div>';
        if (elements.checkoutBtn) elements.checkoutBtn.disabled = true;
        if (elements.cartSubtotal) elements.cartSubtotal.textContent = '₹0';
        return;
    }

    if (elements.checkoutBtn) elements.checkoutBtn.disabled = false;
    elements.cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.price * item.qty;
        const cartItemEl = document.createElement('div');
        cartItemEl.className = 'cart-item';
        cartItemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-meta">Size: ${item.size}${item.color ? ` | Color: ${item.color}` : ''}${item.isGroup ? ' <span class="group-tag">GROUP</span>' : ''}</div>
                <div class="cart-item-bottom">
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                    <div class="qty-control" style="transform:scale(0.85);transform-origin:left center;">
                        <button class="qty-btn" onclick="updateCartItemQty(${index}, -1)">-</button>
                        <input type="number" class="qty-input" value="${item.qty}" oninput="handleCartQtyInput(${index}, this)" onblur="handleCartQtyBlur(${index}, this)">
                        <button class="qty-btn" onclick="updateCartItemQty(${index}, 1)">+</button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>`;
        elements.cartItemsContainer.appendChild(cartItemEl);
    });

    if (elements.cartSubtotal) elements.cartSubtotal.textContent = formatPrice(subtotal);
}

// ==========================================
// 11. UI TOGGLES
// ==========================================
function toggleCartSidebar(show = true) {
    if (!elements.cartSidebar) return;
    if (show) {
        elements.cartSidebar.classList.add('active');
        if (elements.sidebarOverlay) elements.sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        elements.cartSidebar.classList.remove('active');
        if (elements.sidebarOverlay) elements.sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function closeModals() {
    if (elements.productModal) elements.productModal.classList.remove('active');
    if (elements.checkoutModal) elements.checkoutModal.classList.remove('active');
    if (elements.loginModal) elements.loginModal.classList.remove('active');
    if (elements.groupOrderModal) elements.groupOrderModal.classList.remove('active');
    document.body.style.overflow = '';
    // Bug fix: if the user cancels checkout without completing it, clear the bulk
    // cart backup so it does not corrupt a subsequent normal checkout.
    if (window._groupCartBackup && !elements.checkoutModal?.classList.contains('active')) {
        cart = [...window._groupCartBackup];
        window._groupCartBackup = null;
        saveCart();
        updateCartUI();
    }
}

// Bug fix: removed unused isGroupDirect parameter
function openCheckout() {
    toggleCartSidebar(false);
    if (!elements.checkoutItems || !elements.checkoutTotalAmount) return;

    elements.checkoutItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        elements.checkoutItems.innerHTML += `
            <div class="checkout-item-mini">
                <div>
                    <div class="checkout-item-name">${item.name}${item.isGroup ? ' <span class="group-tag">GROUP</span>' : ''}</div>
                    <div class="checkout-item-detail">Size: ${item.size} ${item.color ? `| Color: ${item.color}` : ''} | Qty: ${item.qty}</div>
                </div>
                <div class="checkout-item-total">${formatPrice(itemTotal)}</div>
            </div>`;
    });

    elements.checkoutTotalAmount.textContent = formatPrice(total);

    const saved = JSON.parse(localStorage.getItem('ak_customer'));
    const descEl = document.querySelector('.checkout-form-section p');
    if (descEl) {
        descEl.innerHTML = `Please enter your details to complete the order. <br>
        <div style="background: rgba(46, 213, 115, 0.1); border-left: 4px solid #2ed573; padding: 12px; border-radius: 8px; margin: 15px 0 5px; text-align: left; color: #2ed573; font-size: 0.85rem; line-height: 1.4;">
            <i class="fa-solid fa-circle-check"></i> <strong>WhatsApp Order System:</strong> No payment is required online. You will confirm your order details and pay securely via UPI or Cash on Delivery (COD) on WhatsApp.
        </div>`;
    }

    if (saved) {
        if (document.getElementById('cust-name')) document.getElementById('cust-name').value = saved.name || '';
        if (document.getElementById('cust-phone')) document.getElementById('cust-phone').value = saved.phone || '';
        if (document.getElementById('cust-address')) document.getElementById('cust-address').value = saved.address || '';
        if (document.getElementById('cust-pincode')) document.getElementById('cust-pincode').value = saved.pincode || '';
        if (document.getElementById('cust-district')) document.getElementById('cust-district').value = saved.district || '';
        
        // Show indicator if saved details were prefilled
        const titleEl = document.querySelector('.checkout-form-section h2');
        if (titleEl && !document.getElementById('saved-badge')) {
            titleEl.insertAdjacentHTML('beforeend', ' <span id="saved-badge" style="background:var(--primary-color);color:#000;font-size:0.75rem;padding:2px 8px;border-radius:20px;margin-left:10px;vertical-align:middle;font-weight:600;">Details Auto-filled</span>');
        }
    }

    if (elements.checkoutModal) {
        elements.checkoutModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function setupEventListeners() {
    if (elements.filterBtns && elements.productsGrid) {
        elements.filterBtns.forEach(btn => {
            btn.addEventListener('click', e => {
                elements.filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                if (elements.searchInput) elements.searchInput.value = '';
                const filter = e.target.getAttribute('data-filter');
                if (filter === 'all') currentFilteredProducts = allItems;
                else if (filter === 'offers') currentFilteredProducts = allItems.filter(p => p.isOffer);
                else currentFilteredProducts = allItems.filter(p => p.category === filter);
                currentPage = 1;
                renderPaginatedGrid();
            });
        });
    }

    if (elements.searchInput && elements.productsGrid) {
        elements.searchInput.addEventListener('input', e => {
            const query = e.target.value.toLowerCase();
            if (elements.filterBtns.length > 0) {
                elements.filterBtns.forEach(b => b.classList.remove('active'));
                elements.filterBtns[0].classList.add('active');
            }
            currentFilteredProducts = query.trim() === ''
                ? allItems
                : allItems.filter(p =>
                    p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query) ||
                    p.category.toLowerCase().includes(query)
                );
            currentPage = 1;
            renderPaginatedGrid();
        });
    }

    if (elements.loginBtn) elements.loginBtn.addEventListener('click', () => {
        elements.loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    if (elements.closeLoginModal) elements.closeLoginModal.addEventListener('click', closeModals);
    if (elements.loginModal) elements.loginModal.addEventListener('click', e => { if (e.target === elements.loginModal) closeModals(); });

    if (elements.googleSigninBtn) {
        elements.googleSigninBtn.addEventListener('click', () => {
            const mockUser = { name: "Guest User", phone: "+91 9876543210", address: "123 Main Street, City" };
            localStorage.setItem('ak_customer', JSON.stringify(mockUser));
            showToast('Signed in! Details pre-filled at checkout.', 'success');
            closeModals();
        });
    }

    if (elements.cartBtn) elements.cartBtn.addEventListener('click', () => toggleCartSidebar(true));
    if (elements.closeCartSidebar) elements.closeCartSidebar.addEventListener('click', () => toggleCartSidebar(false));
    if (elements.sidebarOverlay) elements.sidebarOverlay.addEventListener('click', () => { toggleCartSidebar(false); closeModals(); });
    if (elements.closeProductModal) elements.closeProductModal.addEventListener('click', closeModals);
    if (elements.closeCheckoutModal) elements.closeCheckoutModal.addEventListener('click', closeModals);
    if (elements.closeGroupOrderModal) elements.closeGroupOrderModal.addEventListener('click', closeModals);

    if (elements.productModal) elements.productModal.addEventListener('click', e => { if (e.target === elements.productModal) closeModals(); });
    if (elements.checkoutModal) elements.checkoutModal.addEventListener('click', e => { if (e.target === elements.checkoutModal) closeModals(); });
    if (elements.groupOrderModal) elements.groupOrderModal.addEventListener('click', e => { if (e.target === elements.groupOrderModal) closeModals(); });

    if (elements.checkoutBtn) elements.checkoutBtn.addEventListener('click', () => openCheckout());

    if (elements.checkoutForm) {
        elements.checkoutForm.addEventListener('submit', e => {
            e.preventDefault();
            const nameInput = document.getElementById('cust-name');
            const phoneInput = document.getElementById('cust-phone');
            const addressInput = document.getElementById('cust-address');
            const pincodeInput = document.getElementById('cust-pincode');
            const districtInput = document.getElementById('cust-district');
            
            const name = nameInput ? nameInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const address = addressInput ? addressInput.value.trim() : '';
            const pincode = pincodeInput ? pincodeInput.value.trim() : '';
            const district = districtInput ? districtInput.value.trim() : '';
            
            if (!name) {
                showToast('Please enter your full name', 'error');
                if (nameInput) nameInput.focus();
                return;
            }
            // Standard Indian phone number match (10 digits, optionally preceded by +91 or 91 or 0)
            const phoneRegex = /^(?:\+?91|0)?[6-9]\d{9}$/;
            if (!phone || !phoneRegex.test(phone.replace(/\s+/g, ''))) {
                showToast('Please enter a valid 10-digit phone number', 'error');
                if (phoneInput) phoneInput.focus();
                return;
            }
            if (!address || address.length < 5) {
                showToast('Please enter a complete delivery address (min 5 characters)', 'error');
                if (addressInput) addressInput.focus();
                return;
            }
            if (!pincode || pincode.length < 6) {
                showToast('Please enter a valid pincode', 'error');
                if (pincodeInput) pincodeInput.focus();
                return;
            }
            if (!district) {
                showToast('Please enter your district', 'error');
                if (districtInput) districtInput.focus();
                return;
            }
            
            // Show sending state
            const submitBtn = elements.checkoutForm.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing WhatsApp Order...';
            
            setTimeout(() => {
                sendWhatsAppOrder(name, phone, address, pincode, district);
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }, 1000);
        });
    }
}

// ==========================================
// 12. WHATSAPP ORDER + HISTORY
// ==========================================
function sendWhatsAppOrder(name, phone, address, pincode, district) {
    localStorage.setItem('ak_customer', JSON.stringify({ name, phone, address, pincode, district }));

    let subtotal = 0;
    let totalItems = 0;

    cart.forEach(item => {
        subtotal += item.price * item.qty;
        totalItems += item.qty;
    });
    const timestampObj = new Date();

    const orderId = orderHistory.generateId();
    const statusDisplay = 'Pending Confirmation';
    const paymentDisplay = 'Cash on Delivery';
    const itemsDisplay = totalItems === 1 ? '1 Item' : `${totalItems} Items`;

    const message = `🛍️ *AK FASHIONS*
━━━━━━━━━━━━━━━━━━
🚨 *NEW ORDER RECEIVED*

🆔 Order: *${orderId}*
👤 ${name}
📞 ${phone}

🛒 ${itemsDisplay}
💰 *Total: ₹${subtotal.toLocaleString('en-IN')}*
💳 ${paymentDisplay}
📌 *${statusDisplay}*

📄 *Order details attached in PDF.*

━━━━━━━━━━━━━━━━━━
❤️ Thank you — *AK FASHIONS*`;

    // Save to order history BEFORE clearing cart
    const orderRecord = {
        id: orderId,
        timestamp: timestampObj.toISOString(),
        customer: { name, phone, address, pincode, district },
        items: cart.map(i => ({ ...i })),
        total: subtotal,
        status: 'pending'  // pending, confirmed, rejected
    };
    orderHistory.save(orderRecord);

    // Reduce stock immediately to reserve it
    cart.forEach(item => {
        stockManager.reduce(item.id, item.size, item.qty);
    });

    // Restore group cart backup if any
    if (window._groupCartBackup) {
        cart = [...window._groupCartBackup];
        window._groupCartBackup = null;
    } else {
        cart = [];
    }
    saveCart();
    updateCartUI();
    closeModals();

    // Refresh grids visually so stock reduction is immediately visible
    setTimeout(() => {
        if (typeof renderPaginatedGrid === 'function' && document.getElementById('products-grid')) renderPaginatedGrid();
        if (typeof renderGrid === 'function') {
            if (document.getElementById('new-grid')) renderGrid(products.slice(0, 3), document.getElementById('new-grid'));
            if (document.getElementById('seasonal-grid')) renderGrid(products.filter(p => p.isOffer).slice(0, 3), document.getElementById('seasonal-grid'));
            if (document.getElementById('combo-grid')) renderGrid(combos.slice(0, 3), document.getElementById('combo-grid'));
        }
    }, 100);

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    showToast(`Order ${orderId} sent! Check WhatsApp. 🎉`, 'success');
    showOrderSuccessModal(orderRecord);
}

window.showOrderSuccessModal = function(order) {
    let successModal = document.getElementById('order-success-modal');
    if (!successModal) {
        const modalHtml = `
        <div id="order-success-modal" class="modal">
            <div class="modal-content" style="max-width:500px;text-align:center;padding:40px;">
                <button class="close-btn" onclick="document.getElementById('order-success-modal').classList.remove('active')">&times;</button>
                <i class="fa-solid fa-circle-check" style="font-size:4rem;color:#2ed573;margin-bottom:20px;"></i>
                <h2>Order Placed Successfully!</h2>
                <p style="color:var(--text-muted);margin:15px 0;">Your order <strong id="success-order-id"></strong> has been saved and sent via WhatsApp.</p>
                <div style="display:flex;gap:15px;justify-content:center;margin-top:25px;flex-wrap:wrap;">
                    <button class="btn btn-outline" id="btn-download-pdf">
                        <i class="fa-solid fa-file-pdf"></i> Download PDF
                    </button>
                    <button class="btn btn-primary" onclick="document.getElementById('order-success-modal').classList.remove('active')">
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        successModal = document.getElementById('order-success-modal');
        
        // Add event listener for overlay click
        successModal.addEventListener('click', e => { 
            if (e.target === successModal) successModal.classList.remove('active'); 
        });
    }
    
    document.getElementById('success-order-id').textContent = order.id;
    document.getElementById('btn-download-pdf').onclick = async function() {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';
        this.disabled = true;
        try {
            await window.generateOrderPDF(order);
            showToast('PDF downloaded successfully!', 'success');
        } catch(e) {
            console.error(e);
            showToast('Failed to generate PDF. Please try again.', 'error');
        }
        this.innerHTML = originalText;
        this.disabled = false;
    };
    
    successModal.classList.add('active');
};

// ==========================================
// 13. TOAST NOTIFICATIONS
// ==========================================
function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
        <span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('toast-show'), 10);
    setTimeout(() => {
        toast.classList.remove('toast-show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// ==========================================
// 13.5 DIRECT QUANTITY INPUT HANDLERS
// ==========================================
window.handleModalQtyInput = function (input) {
    let val = parseInt(input.value);
    const max = selectedSize ? stockManager.get(selectedProduct.id, selectedSize) : 99;
    if (isNaN(val) || val < 1) {
        return; // Allow typing
    }
    if (val > max) {
        input.value = max;
        showToast(`Only ${max} units available for size ${selectedSize}`, 'error');
    }
};

window.handleModalQtyBlur = function (input) {
    let val = parseInt(input.value);
    if (isNaN(val) || val < 1) {
        input.value = 1;
    }
};

window.handleBulkReqInput = function (size, input) {
    let val = parseInt(input.value);
    if (isNaN(val) || val < 0) {
        currentBulkRequirements[size] = 0;
        return;
    }
    currentBulkRequirements[size] = val;
};

window.handleBulkReqBlur = function (size, input) {
    let val = parseInt(input.value);
    if (isNaN(val) || val < 0) {
        input.value = 0;
        currentBulkRequirements[size] = 0;
    }
};

window.handleCartQtyInput = function (index, input) {
    let val = parseInt(input.value);
    if (isNaN(val) || val < 1) {
        return; // Allow typing
    }
    const item = cart[index];
    const product = allItems.find(p => p.id === item.id);
    if (product) {
        const stock = stockManager.get(product.id, item.size);
        if (val > stock) {
            val = stock;
            input.value = val;
            showToast(`Only ${stock} units available for size ${item.size}`, 'error');
        }
    }
    cart[index].qty = val;
    saveCart();
    updateCartUIStateOnly();
};

window.handleCartQtyBlur = function (index, input) {
    let val = parseInt(input.value);
    if (isNaN(val) || val < 1) {
        val = 1;
        input.value = val;
    }
    cart[index].qty = val;
    saveCart();
    updateCartUI();
};

function updateCartUIStateOnly() {
    const totalItems = cart.reduce((t, i) => t + i.qty, 0);
    if (elements.cartBadge) elements.cartBadge.textContent = totalItems;
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.qty;
    });
    if (elements.cartSubtotal) elements.cartSubtotal.textContent = formatPrice(subtotal);
}

// ==========================================
// 14. BOOT — single DOMContentLoaded entry point
// Bug fix: merged 3 separate DOMContentLoaded listeners into init() to avoid
// redundancy and ensure consistent execution order.
// ==========================================
document.addEventListener('DOMContentLoaded', init);

// ==========================================
// 15. ADMIN LOGIN FROM STOREFRONT (moved into init())
// ==========================================

// ==========================================
// 16. BUY NOW & ANIMATIONS
// ==========================================
window.buyNow = function(productId) {
    const product = allItems.find(p => p.id === productId);
    if (!product) return;
    openProductModal(productId);
};

// Intersection Observer for scroll reveals
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function observeElements() {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Re-observe when grid changes
const originalRenderGrid = renderGrid;
window.renderGrid = function(items, container) {
    if(originalRenderGrid) originalRenderGrid(items, container);
    observeElements();
};

const originalRenderPaginatedGrid = renderPaginatedGrid;
window.renderPaginatedGrid = function() {
    if(originalRenderPaginatedGrid) originalRenderPaginatedGrid();
    observeElements();
};
// Note: observeElements() is also called inside init() with a 500ms delay.
// The standalone DOMContentLoaded listener has been removed as it's now redundant.
