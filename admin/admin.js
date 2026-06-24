document.addEventListener('DOMContentLoaded', () => {
    // Tab switching logic
    const navItems = document.querySelectorAll('.nav-item');
    const tabPanels = document.querySelectorAll('.tab-panel');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTab = item.getAttribute('data-tab');
            
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `tab-${targetTab}`) {
                    panel.classList.add('active');
                }
            });

            const headerTitle = document.getElementById('tab-title');
            if (headerTitle) {
                headerTitle.textContent = item.textContent.trim();
            }

            if(targetTab === 'dashboard') renderDashboard();
            if(targetTab === 'orders') renderOrders();
        });
    });

    // ==========================================
    // 1. PRODUCT MANAGEMENT
    // ==========================================
    
    // Colors Tag System
    let currentColors = [];
    const colorInput = document.getElementById('color-input');
    const addColorBtn = document.getElementById('add-color-btn');
    const colorTagsContainer = document.getElementById('color-tags-container');

    function renderColors() {
        if(!colorTagsContainer) return;
        colorTagsContainer.innerHTML = currentColors.map((color, index) => `
            <div class="color-tag">
                <span>${color}</span>
                <button type="button" onclick="removeColor(${index})">&times;</button>
            </div>
        `).join('');
    }

    window.removeColor = (index) => {
        currentColors.splice(index, 1);
        renderColors();
    };

    if(addColorBtn && colorInput) {
        addColorBtn.addEventListener('click', () => {
            const val = colorInput.value.trim();
            if(val && !currentColors.includes(val)) {
                currentColors.push(val);
                colorInput.value = '';
                renderColors();
            }
        });
        colorInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') {
                e.preventDefault();
                addColorBtn.click();
            }
        });
    }

    // Images Upload
    let currentImages = []; // base64 strings
    const imageInput = document.getElementById('new-prod-images');
    const imagePreviewContainer = document.getElementById('image-preview-container');

    function renderImages() {
        if(!imagePreviewContainer) return;
        imagePreviewContainer.innerHTML = currentImages.map((imgSrc, index) => `
            <div class="image-preview-item">
                <img src="${imgSrc}">
                <button type="button" onclick="removeImage(${index})">&times;</button>
            </div>
        `).join('');
    }

    window.removeImage = (index) => {
        currentImages.splice(index, 1);
        renderImages();
    };

    if(imageInput) {
        imageInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    currentImages.push(ev.target.result);
                    renderImages();
                };
                reader.readAsDataURL(file);
            });
            imageInput.value = ''; // Reset so the same file can be selected again
        });
    }

    // Size & Inventory System
    const addSizeBtn = document.getElementById('add-size-btn');
    const sizeInventoryContainer = document.getElementById('size-inventory-container');
    let sizeIndex = 0;

    function addSizeRow() {
        if(!sizeInventoryContainer) return;
        const row = document.createElement('div');
        row.className = 'size-stock-row';
        row.id = `size-row-${sizeIndex}`;
        row.innerHTML = `
            <input type="text" placeholder="Size (e.g. S, M, 32)" class="form-control size-input" required>
            <input type="number" placeholder="Stock Qty" class="form-control stock-input" required min="0">
            <button type="button" class="btn btn-danger" onclick="removeSizeRow(${sizeIndex})" style="padding: 10px; width: 42px;"><i class="fa-solid fa-trash"></i></button>
        `;
        sizeInventoryContainer.appendChild(row);
        sizeIndex++;
    }

    window.removeSizeRow = (id) => {
        const row = document.getElementById(`size-row-${id}`);
        if(row) row.remove();
    };

    if(addSizeBtn) {
        addSizeBtn.addEventListener('click', addSizeRow);
        addSizeRow(); // Start with one row
    }

    // Publish Product
    const addProductForm = document.getElementById('add-product-form');
    if (addProductForm) {
        addProductForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('new-prod-name').value.trim();
            const category = document.getElementById('new-prod-cat').value;
            const price = parseFloat(document.getElementById('new-prod-price').value);
            const discountInput = document.getElementById('new-prod-discount').value;
            const description = document.getElementById('new-prod-desc').value.trim();
            
            if(currentImages.length === 0) {
                showAdminToast('Please upload at least one product image.', 'error');
                return;
            }

            const sizeInputs = document.querySelectorAll('.size-input');
            const stockInputs = document.querySelectorAll('.stock-input');
            const sizes = [];
            const defaultStock = {};

            for(let i=0; i<sizeInputs.length; i++) {
                const s = sizeInputs[i].value.trim().toUpperCase();
                const q = parseInt(stockInputs[i].value);
                if(s) {
                    if(!sizes.includes(s)) {
                        sizes.push(s);
                        defaultStock[s] = q;
                    } else {
                        defaultStock[s] += q; // aggregate if duplicated
                    }
                }
            }

            if(sizes.length === 0) {
                showAdminToast('Please add at least one size with stock.', 'error');
                return;
            }

            const newProduct = {
                id: Date.now(),
                name,
                category,
                price,
                originalPrice: discountInput ? parseFloat(discountInput) : undefined,
                isOffer: !!discountInput,
                image: currentImages[0], // First image is main
                images: currentImages,
                description,
                sizes,
                colors: [...currentColors],
                defaultStock
            };

            const customProducts = JSON.parse(localStorage.getItem('ak_custom_products')) || [];
            customProducts.push(newProduct);
            localStorage.setItem('ak_custom_products', JSON.stringify(customProducts));

            // Set Initial Stock in Stock Manager
            if(typeof stockManager !== 'undefined') {
                sizes.forEach(size => {
                    stockManager.set(newProduct.id, size, defaultStock[size]);
                });
            }

            showAdminToast('Product Published! Successfully synced.', 'success');
            
            // Reset Form
            addProductForm.reset();
            currentColors = [];
            currentImages = [];
            if(sizeInventoryContainer) sizeInventoryContainer.innerHTML = '';
            addSizeRow();
            renderColors();
            renderImages();
        });
    }

    // ==========================================
    // 2. ORDER MANAGEMENT
    // ==========================================
    const filterSelect = document.getElementById('order-status-filter');
    if(filterSelect) {
        filterSelect.addEventListener('change', renderOrders);
    }

    function renderOrders() {
        const tbody = document.getElementById('orders-table-body');
        if(!tbody || typeof orderHistory === 'undefined') return;

        const orders = orderHistory.getAll();
        const filter = document.getElementById('order-status-filter').value;
        tbody.innerHTML = '';

        orders.forEach(order => {
            if(filter !== 'all' && order.status !== filter) return;

            let itemsHtml = order.items.map(item => 
                `<div class="order-item-summary">${item.qty}x ${item.name} <br><small>Size: ${item.size} ${item.color ? '| Color: '+item.color : ''}</small></div>`
            ).join('');

            let actionHtml = '';
            let statusBadge = '';
            
            if(order.status === 'pending') {
                statusBadge = `<span class="status-badge badge-pending-status">Pending</span>`;
                actionHtml = `
                    <div class="action-buttons-wrap">
                        <button class="btn btn-sm btn-success" onclick="updateOrderStatus('${order.id}', 'confirmed')">Confirm</button>
                        <button class="btn btn-sm btn-danger" onclick="updateOrderStatus('${order.id}', 'rejected')">Reject</button>
                    </div>
                `;
            } else if(order.status === 'confirmed') {
                statusBadge = `<span class="status-badge badge-completed-status">Confirmed</span>`;
                actionHtml = `<span style="color:var(--text-muted);font-size:0.8rem;">No actions</span>`;
            } else if(order.status === 'rejected') {
                statusBadge = `<span class="status-badge badge-cancelled-status">Rejected</span>`;
                actionHtml = `<span style="color:var(--text-muted);font-size:0.8rem;">No actions</span>`;
            }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <strong>${order.id}</strong><br>
                    <span style="font-size:0.8rem;color:var(--text-muted)">${new Date(order.timestamp).toLocaleString()}</span>
                </td>
                <td>
                    <div style="font-weight:600">${order.customer.name}</div>
                    <div style="font-size:0.9rem">${order.customer.phone}</div>
                    <div style="font-size:0.8rem;color:var(--text-muted);max-width:200px;">${order.customer.address}</div>
                </td>
                <td><div class="order-items-list">${itemsHtml}</div></td>
                <td><strong>₹${order.total.toLocaleString()}</strong></td>
                <td>${statusBadge}</td>
                <td>${actionHtml}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    window.updateOrderStatus = (orderId, newStatus) => {
        let orders = orderHistory.getAll();
        let orderIndex = orders.findIndex(o => o.id === orderId);
        if(orderIndex > -1) {
            let order = orders[orderIndex];
            order.status = newStatus;
            
            if(newStatus === 'rejected') {
                // Return reserved stock to inventory
                order.items.forEach(item => {
                    let currentStock = stockManager.get(item.id, item.size);
                    stockManager.set(item.id, item.size, currentStock + item.qty);
                });
                showAdminToast(`Order Rejected. Stock returned.`, 'success');
            } else {
                showAdminToast(`Order Confirmed successfully.`, 'success');
            }
            
            localStorage.setItem('ak_order_history_v2', JSON.stringify(orders));
            renderOrders();
            renderDashboard(); // Update analytics
        }
    };

    // ==========================================
    // 3. SALES ANALYTICS DASHBOARD
    // ==========================================
    let trendChartInstance = null;
    let categoryChartInstance = null;
    let productChartInstance = null;

    function renderDashboard() {
        if(typeof orderHistory === 'undefined') return;
        const orders = orderHistory.getAll();
        
        let totalOrders = orders.length;
        let confirmed = orders.filter(o => o.status === 'confirmed').length;
        let rejected = orders.filter(o => o.status === 'rejected').length;
        let revenue = orders.filter(o => o.status === 'confirmed').reduce((sum, o) => sum + o.total, 0);
        
        let now = new Date();
        let monthlyRevenue = orders.filter(o => {
            let d = new Date(o.timestamp);
            return o.status === 'confirmed' && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        }).reduce((sum, o) => sum + o.total, 0);

        let customProducts = JSON.parse(localStorage.getItem('ak_custom_products')) || [];
        let allProductsCount = typeof allItems !== 'undefined' ? allItems.length : customProducts.length;

        if(document.getElementById('stat-total-orders')) document.getElementById('stat-total-orders').textContent = totalOrders;
        if(document.getElementById('stat-confirmed-orders')) document.getElementById('stat-confirmed-orders').textContent = confirmed;
        if(document.getElementById('stat-rejected-orders')) document.getElementById('stat-rejected-orders').textContent = rejected;
        if(document.getElementById('stat-total-products')) document.getElementById('stat-total-products').textContent = allProductsCount;
        if(document.getElementById('stat-total-revenue')) document.getElementById('stat-total-revenue').textContent = `₹${revenue.toLocaleString()}`;
        if(document.getElementById('stat-monthly-sales')) document.getElementById('stat-monthly-sales').textContent = `₹${monthlyRevenue.toLocaleString()}`;

        // Charts Rendering
        const ctxTrend = document.getElementById('trendChart');
        const ctxCat = document.getElementById('categoryChart');
        const ctxProd = document.getElementById('productPerformanceChart');

        if(ctxTrend) {
            let dates = {};
            orders.filter(o => o.status === 'confirmed').forEach(o => {
                let d = new Date(o.timestamp).toLocaleDateString();
                if(!dates[d]) dates[d] = { orders: 0, revenue: 0 };
                dates[d].orders += 1;
                dates[d].revenue += o.total;
            });

            let sortedDates = Object.keys(dates).sort((a,b) => new Date(a) - new Date(b));
            
            if(trendChartInstance) trendChartInstance.destroy();
            trendChartInstance = new Chart(ctxTrend, {
                type: 'line',
                data: {
                    labels: sortedDates.length ? sortedDates : ['No Data'],
                    datasets: [
                        {
                            label: 'Revenue (₹)',
                            data: sortedDates.length ? sortedDates.map(d => dates[d].revenue) : [0],
                            borderColor: '#d4af37',
                            backgroundColor: 'rgba(212, 175, 55, 0.1)',
                            fill: true,
                            yAxisID: 'y'
                        },
                        {
                            label: 'Orders',
                            data: sortedDates.length ? sortedDates.map(d => dates[d].orders) : [0],
                            borderColor: '#3b82f6',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            type: 'bar',
                            yAxisID: 'y1'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: { type: 'linear', position: 'left' },
                        y1: { type: 'linear', position: 'right', grid: { drawOnChartArea: false } }
                    }
                }
            });
        }

        if(ctxCat || ctxProd) {
            let catSales = {};
            let prodSales = {};
            orders.filter(o => o.status === 'confirmed').forEach(o => {
                o.items.forEach(item => {
                    let product = typeof allItems !== 'undefined' ? allItems.find(p => p.id === item.id) : null;
                    let cat = product ? product.category : 'unknown';
                    if(!catSales[cat]) catSales[cat] = 0;
                    catSales[cat] += item.qty;

                    if(!prodSales[item.name]) prodSales[item.name] = 0;
                    prodSales[item.name] += item.qty;
                });
            });

            if(ctxCat) {
                if(categoryChartInstance) categoryChartInstance.destroy();
                categoryChartInstance = new Chart(ctxCat, {
                    type: 'doughnut',
                    data: {
                        labels: Object.keys(catSales).length ? Object.keys(catSales).map(c => c.toUpperCase()) : ['No Data'],
                        datasets: [{
                            data: Object.keys(catSales).length ? Object.values(catSales) : [1],
                            backgroundColor: ['#d4af37', '#3b82f6', '#10b981', '#f43f5e', '#8b5cf6']
                        }]
                    },
                    options: { responsive: true, maintainAspectRatio: false }
                });
            }

            if(ctxProd) {
                let sortedProds = Object.entries(prodSales).sort((a,b) => b[1] - a[1]).slice(0, 5);
                if(productChartInstance) productChartInstance.destroy();
                productChartInstance = new Chart(ctxProd, {
                    type: 'bar',
                    data: {
                        labels: sortedProds.length ? sortedProds.map(p => p[0]) : ['No Data'],
                        datasets: [{
                            label: 'Units Sold',
                            data: sortedProds.length ? sortedProds.map(p => p[1]) : [0],
                            backgroundColor: '#10b981'
                        }]
                    },
                    options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y' }
                });
            }
        }
    }

    // Initial renders
    renderDashboard();
    renderOrders();

    // Admin Logout Logic
    const adminLogoutBtn = document.getElementById('admin-logout-btn');
    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', () => {
            localStorage.removeItem('ak_admin_logged_in');
            window.location.href = 'login.html';
        });
    }
});

function showAdminToast(msg, type) {
    const toast = document.getElementById('admin-toast');
    if (!toast) return;
    toast.textContent = msg;
    
    // Add correct icon
    toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation'}"></i> ${msg}`;
    
    toast.className = `toast-notification ${type} show`;
    setTimeout(() => {
        toast.className = 'toast-notification';
    }, 3000);
}

// ==========================================
// LOGIN & LOGOUT LOGIC
// ==========================================
const loginForm = document.getElementById('admin-login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('admin-id').value;
        const pass = document.getElementById('admin-password').value;
        const errorMsg = document.getElementById('login-error-msg');
        
        if ((id === 'admin123' || id === 'admin') && pass === 'admin123') {
            localStorage.setItem("ak_admin_logged_in", "true");
            window.location.href = "index.html";
        } else {
            if (errorMsg) errorMsg.textContent = "Invalid Admin Credentials.";
            showAdminToast("Invalid Admin Credentials.", "error");
        }
    });
}

const logoutBtn = document.getElementById('admin-logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem("ak_admin_logged_in");
        window.location.href = "login.html";
    });
}
