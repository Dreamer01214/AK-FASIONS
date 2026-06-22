/* =========================================
   AK FASHIONS - ADMIN PORTAL JS
   ========================================= */

const ADMIN_PASSCODE = "akadmin123";

// DOM Elements
const adminLoginScreen = document.getElementById('admin-login-screen');
const adminLoginForm = document.getElementById('admin-login-form');
const adminPasswordInput = document.getElementById('admin-password');
const loginErrorMsg = document.getElementById('login-error-msg');
const adminMainInterface = document.getElementById('admin-main-interface');
const adminLogoutBtn = document.getElementById('admin-logout-btn');
const tabTitle = document.getElementById('tab-title');
const tabSubtitle = document.getElementById('tab-subtitle');
const navItems = document.querySelectorAll('.nav-item');
const tabPanels = document.querySelectorAll('.tab-panel');

// Charts references
let revenueChart = null;
let categoryChart = null;

// ==========================================
// 1. AUTHENTICATION & INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Check session
    if (sessionStorage.getItem('ak_admin_logged_in') === 'true') {
        showAdminInterface();
    } else {
        adminLoginScreen.style.display = 'flex';
        adminMainInterface.style.display = 'none';
    }

    // Login Form Submit
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const passcode = adminPasswordInput.value.trim();
            
            if (passcode === ADMIN_PASSCODE) {
                sessionStorage.setItem('ak_admin_logged_in', 'true');
                showAdminInterface();
                showAdminToast("Authenticated Successfully", "success");
            } else {
                loginErrorMsg.textContent = "Invalid passcode. Please try again.";
                adminPasswordInput.value = "";
                adminPasswordInput.focus();
            }
        });
    }

    // Logout
    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('ak_admin_logged_in');
            adminLoginScreen.style.display = 'flex';
            adminMainInterface.style.display = 'none';
            showAdminToast("Signed out successfully", "success");
        });
    }

    // Nav / Tab switcher
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTab = item.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
});

function showAdminInterface() {
    adminLoginScreen.style.display = 'none';
    adminMainInterface.style.display = 'flex';
    
    // Load dashboard stats & tabs
    initAdminData();
    switchTab('dashboard');
}

function switchTab(tabId) {
    navItems.forEach(nav => {
        if (nav.getAttribute('data-tab') === tabId) {
            nav.classList.add('active');
        } else {
            nav.classList.remove('active');
        }
    });

    tabPanels.forEach(panel => {
        if (panel.id === `tab-${tabId}`) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });

    // Update Header Text & Load Tab Data
    switch (tabId) {
        case 'dashboard':
            tabTitle.textContent = "Dashboard";
            tabSubtitle.textContent = "Real-time statistics & business insights.";
            renderDashboardStats();
            break;
        case 'orders':
            tabTitle.textContent = "Orders List";
            tabSubtitle.textContent = "Manage customer orders and status updates.";
            renderOrdersList();
            break;
        case 'stock':
            tabTitle.textContent = "Stock Manager";
            tabSubtitle.textContent = "Update stock quantities for each clothing size.";
            renderStockManager();
            break;
        case 'billing':
            tabTitle.textContent = "Bill Generator";
            tabSubtitle.textContent = "Select completed orders to print invoices.";
            renderBillingPanel();
            break;
        case 'reports':
            tabTitle.textContent = "Reports & Alerts";
            tabSubtitle.textContent = "Low stock warnings and category performance analytics.";
            renderReportsPanel();
            break;
    }
}

// ==========================================
// 2. DATA UTILITIES
// ==========================================
function getOrders() {
    return JSON.parse(localStorage.getItem('ak_order_history_v2')) || [];
}

function updateOrderStatus(orderId, newStatus) {
    const orders = getOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex > -1) {
        orders[orderIndex].status = newStatus;
        localStorage.setItem('ak_order_history_v2', JSON.stringify(orders));
        showAdminToast(`Order ${orderId} updated to ${newStatus}`, 'success');
        return true;
    }
    return false;
}

function getStockData() {
    return JSON.parse(localStorage.getItem('ak_stock_v2')) || {};
}

function saveStockData(stock) {
    localStorage.setItem('ak_stock_v2', JSON.stringify(stock));
}

// Format Price
function formatPrice(number) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(number);
}

// ==========================================
// 3. DASHBOARD TAB
// ==========================================
function initAdminData() {
    // Inject mock orders if none exist
    const orders = getOrders();
    if (orders.length === 0) {
        const mockOrders = [
            {
                id: "ORD-1718000000000",
                timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
                customer: { name: "Anand Kumar", phone: "+91 9361438664", address: "45, Gandhi Nagar, Chennai - 600020" },
                items: [
                    { name: "Adidas T-Shirt", size: "M", qty: 2, price: 350, color: "Beige" },
                    { name: "Tactical Black Cargo Pants", size: "32", qty: 1, price: 899 }
                ],
                total: 1599,
                status: 'pending'
            },
            {
                id: "ORD-1717900000000",
                timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
                customer: { name: "Vijay Raj", phone: "+91 9876543210", address: "12, 1st Cross Street, OMR, Chennai - 600096" },
                items: [
                    { name: "Casual Checkered Shirt", size: "L", qty: 1, price: 430, color: "Red/Black" }
                ],
                total: 430,
                status: 'completed'
            }
        ];
        localStorage.setItem('ak_order_history_v2', JSON.stringify(mockOrders));
    }
}

function renderDashboardStats() {
    const orders = getOrders();
    const stock = getStockData();
    
    // Pending Orders count
    const pendingOrders = orders.filter(o => o.status === 'pending');
    document.getElementById('stat-pending-orders').textContent = pendingOrders.length;
    
    // Pending badge in sidebar
    const pendingBadge = document.getElementById('pending-badge');
    if (pendingBadge) {
        if (pendingOrders.length > 0) {
            pendingBadge.textContent = pendingOrders.length;
            pendingBadge.style.display = 'inline-flex';
        } else {
            pendingBadge.style.display = 'none';
        }
    }

    // Total sales
    const completedOrders = orders.filter(o => o.status === 'completed');
    const totalSales = completedOrders.reduce((sum, o) => sum + o.total, 0);
    document.getElementById('stat-total-sales').textContent = formatPrice(totalSales);

    // Total Orders count
    document.getElementById('stat-total-orders').textContent = orders.length;

    // Low stock warnings
    let lowStockCount = 0;
    Object.values(stock).forEach(prodStock => {
        Object.values(prodStock).forEach(qty => {
            if (qty <= 3) lowStockCount++;
        });
    });
    document.getElementById('stat-low-stock').textContent = lowStockCount;

    // Render Charts
    setTimeout(() => {
        buildCharts(orders);
    }, 100);
}

function buildCharts(orders) {
    const ctxRevenue = document.getElementById('revenueChart');
    const ctxCategory = document.getElementById('categoryChart');
    
    if (!ctxRevenue || !ctxCategory) return;

    // Destroy existing chart instances if they exist
    if (revenueChart) revenueChart.destroy();
    if (categoryChart) categoryChart.destroy();

    // 1. Revenue Chart data (Last 5 orders)
    const recentCompleted = orders.filter(o => o.status === 'completed').slice(0, 5).reverse();
    const revenueLabels = recentCompleted.map(o => o.id.substring(4, 12));
    const revenueData = recentCompleted.map(o => o.total);

    revenueChart = new Chart(ctxRevenue, {
        type: 'line',
        data: {
            labels: revenueLabels.length > 0 ? revenueLabels : ['No Data'],
            datasets: [{
                label: 'Order Total (₹)',
                data: revenueData.length > 0 ? revenueData : [0],
                borderColor: '#d4af37',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#a0aab2' } },
                x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#a0aab2' } }
            },
            plugins: { legend: { display: false } }
        }
    });

    // 2. Category Sales Chart Data
    let shirtSales = 0;
    let tshirtSales = 0;
    let jeansSales = 0;
    let comboSales = 0;

    orders.filter(o => o.status === 'completed').forEach(o => {
        (o.items || []).forEach(item => {
            const name = item.name.toLowerCase();
            if (name.includes('combo')) comboSales += item.qty;
            else if (name.includes('jeans') || name.includes('pants') || name.includes('cargo')) jeansSales += item.qty;
            else if (name.includes('t-shirt') || name.includes('tee') || name.includes('tshirt')) tshirtSales += item.qty;
            else if (name.includes('shirt')) shirtSales += item.qty;
            else shirtSales += item.qty; // fallback
        });
    });

    categoryChart = new Chart(ctxCategory, {
        type: 'doughnut',
        data: {
            labels: ['Shirts', 'T-Shirts', 'Jeans', 'Combos'],
            datasets: [{
                data: [shirtSales, tshirtSales, jeansSales, comboSales],
                backgroundColor: ['#d4af37', '#93c5fd', '#60a5fa', '#f59e0b'],
                borderColor: '#181b21',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: '#f8f9fa' } }
            }
        }
    });
}

// ==========================================
// 4. ORDERS LIST TAB
// ==========================================
function renderOrdersList() {
    const orders = getOrders();
    const tableBody = document.getElementById('orders-table-body');
    const filterVal = document.getElementById('order-status-filter').value;
    
    if (!tableBody) return;
    tableBody.innerHTML = '';

    const filtered = orders.filter(o => filterVal === 'all' || o.status === filterVal);

    if (filtered.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:30px;">No orders found matching the filter.</td></tr>`;
        return;
    }

    filtered.forEach(order => {
        const date = new Date(order.timestamp).toLocaleDateString('en-IN', { hour: '2-digit', minute: '2-digit' });
        
        let actionButtons = '';
        if (order.status === 'pending') {
            actionButtons = `
                <button class="btn btn-action-completed" onclick="changeStatus('${order.id}', 'completed')" title="Mark Completed" style="background:#22c55e;color:#000;padding:6px 10px;font-size:0.8rem;margin-right:5px;border-radius:4px;border:none;cursor:pointer;">
                    <i class="fa-solid fa-check"></i>
                </button>
                <button class="btn btn-action-cancelled" onclick="changeStatus('${order.id}', 'cancelled')" title="Cancel Order" style="background:#ef4444;color:#fff;padding:6px 10px;font-size:0.8rem;border-radius:4px;border:none;cursor:pointer;">
                    <i class="fa-solid fa-times"></i>
                </button>
            `;
        } else {
            actionButtons = `<span style="font-size:0.85rem;color:var(--text-muted)">No actions available</span>`;
        }

        const itemsSummary = order.items.map(i => `${i.name} (${i.size} x ${i.qty})`).join(', ');

        tableBody.innerHTML += `
            <tr>
                <td style="font-family:monospace;font-weight:600;color:var(--primary-color);">${order.id.substring(4, 12)}</td>
                <td>${date}</td>
                <td>
                    <div style="font-weight:600;">${order.customer.name}</div>
                    <div style="font-size:0.8rem;color:var(--text-muted);">${order.customer.phone}</div>
                </td>
                <td style="max-width:200px;font-size:0.85rem;" title="${order.customer.address}">${order.customer.address}</td>
                <td style="font-size:0.85rem;">${itemsSummary}</td>
                <td><strong style="color:#fff;">${formatPrice(order.total)}</strong></td>
                <td>
                    <span class="stock-total-label ${order.status === 'completed' ? 'stock-good' : order.status === 'pending' ? 'stock-medium' : 'stock-low'}" style="font-size:0.75rem;padding:3px 10px;border-radius:20px;font-weight:600;">
                        ${order.status.toUpperCase()}
                    </span>
                </td>
                <td>${actionButtons}</td>
            </tr>
        `;
    });
}

// Global scope status handler helper
window.changeStatus = function(orderId, status) {
    if (updateOrderStatus(orderId, status)) {
        renderOrdersList();
        renderDashboardStats();
    }
};

// Hook up order status filter dropdown
const orderFilterDropdown = document.getElementById('order-status-filter');
if (orderFilterDropdown) {
    orderFilterDropdown.addEventListener('change', renderOrdersList);
}

// ==========================================
// 5. STOCK MANAGER TAB
// ==========================================
function renderStockManager() {
    const tableBody = document.getElementById('stock-table-body');
    const searchVal = document.getElementById('stock-search').value.toLowerCase();
    const catVal = document.getElementById('stock-category-filter').value;
    
    if (!tableBody) return;
    tableBody.innerHTML = '';

    const stock = getStockData();

    // Filter items
    const filteredItems = allItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchVal);
        const matchesCat = catVal === 'all' || item.category === catVal;
        return matchesSearch && matchesCat;
    });

    if (filteredItems.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:30px;">No products found.</td></tr>`;
        return;
    }

    filteredItems.forEach(item => {
        const prodStock = stock[item.id] || {};
        
        let stockEditorHtml = '<div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;">';
        item.sizes.forEach(size => {
            const qty = prodStock[size] !== undefined ? prodStock[size] : 0;
            stockEditorHtml += `
                <div style="display:flex;align-items:center;background:rgba(255,255,255,0.03);border:1px solid var(--border-color);border-radius:6px;padding:4px 8px;gap:5px;">
                    <span style="font-weight:600;font-size:0.85rem;color:var(--primary-color);">${size}:</span>
                    <input type="number" id="input-stock-${item.id}-${size}" value="${qty}" min="0" style="width:50px;background:transparent;border:none;color:#fff;text-align:center;font-weight:600;padding:2px 0;">
                </div>
            `;
        });
        stockEditorHtml += '</div>';

        tableBody.innerHTML += `
            <tr>
                <td>#${item.id}</td>
                <td><img src="${item.image}" alt="${item.name}" style="width:45px;height:55px;object-fit:cover;border-radius:4px;"></td>
                <td style="font-weight:600;">${item.name}</td>
                <td><span style="text-transform:uppercase;font-size:0.8rem;color:var(--text-muted);">${item.category}</span></td>
                <td>${stockEditorHtml}</td>
                <td>
                    <button class="btn btn-primary" onclick="saveItemStock(${item.id})" style="padding:8px 15px;font-size:0.85rem;">
                        <i class="fa-solid fa-floppy-disk"></i> Save
                    </button>
                </td>
            </tr>
        `;
    });
}

window.saveItemStock = function(productId) {
    const item = allItems.find(p => p.id === productId);
    if (!item) return;

    const stock = getStockData();
    if (!stock[productId]) stock[productId] = {};

    item.sizes.forEach(size => {
        const input = document.getElementById(`input-stock-${productId}-${size}`);
        if (input) {
            stock[productId][size] = parseInt(input.value) || 0;
        }
    });

    saveStockData(stock);
    showAdminToast(`Stock updated for ${item.name}`, 'success');
    renderStockManager();
};

// Filter listeners for stock manager
const stockSearchInput = document.getElementById('stock-search');
if (stockSearchInput) {
    stockSearchInput.addEventListener('input', renderStockManager);
}
const stockCategoryFilter = document.getElementById('stock-category-filter');
if (stockCategoryFilter) {
    stockCategoryFilter.addEventListener('change', renderStockManager);
}

// ==========================================
// 6. BILL GENERATOR TAB
// ==========================================
function renderBillingPanel() {
    const orders = getOrders();
    const select = document.getElementById('billing-order-select');
    const printBtn = document.getElementById('print-bill-btn');
    
    if (!select) return;
    
    // Save current selection if any
    const currentSelection = select.value;

    select.innerHTML = '<option value="">-- Choose an Order --</option>';

    orders.forEach(order => {
        const customerText = `${order.id.substring(4, 12)} - ${order.customer.name} (${formatPrice(order.total)}) [${order.status}]`;
        select.innerHTML += `<option value="${order.id}">${customerText}</option>`;
    });

    // Restore selection
    if (currentSelection) select.value = currentSelection;

    // Handle change selection
    select.onchange = () => {
        const orderId = select.value;
        const previewContainer = document.getElementById('invoice-preview');
        
        if (!orderId) {
            previewContainer.innerHTML = `
                <div class="invoice-empty">
                    <i class="fa-solid fa-file-invoice" style="font-size:3rem;margin-bottom:15px;color:var(--text-muted)"></i>
                    <p>Select an order from the list to display invoice preview.</p>
                </div>
            `;
            printBtn.disabled = true;
            return;
        }

        const order = orders.find(o => o.id === orderId);
        if (!order) return;

        printBtn.disabled = false;

        const date = new Date(order.timestamp).toLocaleString('en-IN');
        
        let subtotal = 0;
        const itemsHtml = order.items.map((item, idx) => {
            const itemTotal = item.price * item.qty;
            subtotal += itemTotal;
            return `
                <tr>
                    <td style="padding:10px 5px;border-bottom:1px solid #ddd;">${idx + 1}</td>
                    <td style="padding:10px 5px;border-bottom:1px solid #ddd;font-weight:600;">${item.name} (${item.size}${item.color ? ` - ${item.color}` : ''})</td>
                    <td style="padding:10px 5px;border-bottom:1px solid #ddd;text-align:center;">${item.qty}</td>
                    <td style="padding:10px 5px;border-bottom:1px solid #ddd;text-align:right;">${formatPrice(item.price)}</td>
                    <td style="padding:10px 5px;border-bottom:1px solid #ddd;text-align:right;font-weight:600;">${formatPrice(itemTotal)}</td>
                </tr>
            `;
        }).join('');

        previewContainer.innerHTML = `
            <div style="background:#fff;color:#000;padding:40px;border-radius:8px;font-family:'Inter',sans-serif;box-shadow:0 4px 15px rgba(0,0,0,0.15);width:100%;max-width:700px;margin:0 auto;text-align:left;">
                <div style="display:flex;justify-content:between;align-items:center;border-bottom:3px solid #d4af37;padding-bottom:15px;margin-bottom:20px;flex-wrap:wrap;gap:15px;">
                    <div style="flex:1;">
                        <h2 style="font-family:'Outfit',sans-serif;font-weight:800;color:#000;margin:0;letter-spacing:1px;font-size:1.8rem;">AK FASHIONS</h2>
                        <p style="margin:5px 0 0;font-size:0.85rem;color:#666;">Redefining Premium Menswear</p>
                    </div>
                    <div style="text-align:right;">
                        <h3 style="margin:0;color:#d4af37;font-size:1.3rem;">INVOICE</h3>
                        <p style="margin:4px 0 0;font-size:0.85rem;font-family:monospace;font-weight:bold;">${order.id}</p>
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:30px;font-size:0.9rem;line-height:1.4;">
                    <div>
                        <strong style="color:#000;display:block;margin-bottom:5px;">Bill To:</strong>
                        <div style="font-weight:bold;color:#111;">${order.customer.name}</div>
                        <div style="color:#444;">Phone: ${order.customer.phone}</div>
                        <div style="color:#555;margin-top:4px;">Address: ${order.customer.address}</div>
                    </div>
                    <div style="text-align:right;">
                        <strong style="color:#000;display:block;margin-bottom:5px;">Invoice Info:</strong>
                        <div><strong>Date:</strong> ${date}</div>
                        <div><strong>Payment Method:</strong> UPI / Cash on Delivery</div>
                        <div style="margin-top:6px;"><span style="background:${order.status === 'completed' ? '#d4edda' : '#fff3cd'};color:${order.status === 'completed' ? '#155724' : '#856404'};padding:3px 10px;border-radius:20px;font-size:0.75rem;font-weight:bold;text-transform:uppercase;">${order.status}</span></div>
                    </div>
                </div>
                <table style="width:100%;border-collapse:collapse;margin-bottom:30px;font-size:0.9rem;">
                    <thead>
                        <tr style="background:#f4f4f4;color:#000;font-weight:700;">
                            <th style="padding:10px 5px;text-align:left;width:40px;">S.No</th>
                            <th style="padding:10px 5px;text-align:left;">Item Details</th>
                            <th style="padding:10px 5px;text-align:center;width:60px;">Qty</th>
                            <th style="padding:10px 5px;text-align:right;width:100px;">Rate</th>
                            <th style="padding:10px 5px;text-align:right;width:120px;">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                </table>
                <div style="display:flex;justify-content:end;text-align:right;font-size:0.95rem;">
                    <div style="width:250px;">
                        <div style="display:flex;justify-content:between;margin-bottom:8px;">
                            <span style="color:#666;flex:1;text-align:left;">Subtotal:</span>
                            <span style="font-weight:600;color:#111;">${formatPrice(subtotal)}</span>
                        </div>
                        <div style="display:flex;justify-content:between;margin-bottom:8px;">
                            <span style="color:#666;flex:1;text-align:left;">Shipping Charges:</span>
                            <span style="font-weight:600;color:#28a745;">FREE</span>
                        </div>
                        <div style="display:flex;justify-content:between;padding-top:10px;border-top:2px solid #000;font-size:1.2rem;font-weight:bold;">
                            <span style="color:#000;flex:1;text-align:left;">Total Amount:</span>
                            <span style="color:#d4af37;">${formatPrice(order.total)}</span>
                        </div>
                    </div>
                </div>
                <div style="margin-top:40px;border-top:1px solid #ddd;padding-top:20px;text-align:center;color:#777;font-size:0.8rem;line-height:1.4;">
                    <p style="margin:0;">Thank you for shopping at AK Fashions!</p>
                    <p style="margin:4px 0 0;">This is a computer-generated invoice. For support or questions, reach us on WhatsApp at +91 9361438664.</p>
                </div>
            </div>
        `;
    };

    // Print Invoice Button handler
    printBtn.onclick = () => {
        const preview = document.getElementById('invoice-preview');
        if (!preview) return;
        
        const invoiceContent = preview.innerHTML;
        const printWindow = window.open('', '_blank', 'width=800,height=900');
        printWindow.document.write(`
            <html>
            <head>
                <title>Print Invoice - AK Fashions</title>
                <style>
                    body { margin: 0; padding: 20px; font-family: 'Inter', sans-serif; background:#fff; }
                    @media print {
                        body { padding: 0; }
                    }
                </style>
            </head>
            <body>
                ${invoiceContent}
                <script>
                    window.onload = function() {
                        window.print();
                        setTimeout(function() { window.close(); }, 500);
                    };
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    };
}

// ==========================================
// 7. REPORTS TAB
// ==========================================
function renderReportsPanel() {
    const orders = getOrders();
    const stock = getStockData();
    const lowStockList = document.getElementById('low-stock-list');
    
    if (!lowStockList) return;
    lowStockList.innerHTML = '';

    // 1. Render Low Stock alert rows
    let hasAlerts = false;
    allItems.forEach(item => {
        const prodStock = stock[item.id] || {};
        item.sizes.forEach(size => {
            const qty = prodStock[size] !== undefined ? prodStock[size] : 0;
            if (qty <= 3) {
                hasAlerts = true;
                lowStockList.innerHTML += `
                    <div class="alert-item" style="display:flex;justify-content:between;align-items:center;padding:12px 15px;background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.2);border-radius:8px;margin-bottom:10px;gap:15px;flex-wrap:wrap;">
                        <div style="display:flex;align-items:center;gap:12px;flex:1;text-align:left;">
                            <i class="fa-solid fa-circle-exclamation" style="color:var(--stock-low);font-size:1.1rem;"></i>
                            <div>
                                <span style="font-weight:600;color:#fff;">${item.name}</span>
                                <span style="color:var(--text-muted);font-size:0.8rem;margin-left:8px;">Size: <strong style="color:var(--primary-color)">${size}</strong></span>
                            </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:15px;">
                            <span class="stock-total-label stock-low" style="font-size:0.75rem;padding:3px 8px;border-radius:12px;">Only ${qty} left</span>
                            <button class="btn btn-outline" onclick="switchTab('stock')" style="padding:5px 12px;font-size:0.8rem;border-radius:4px;">Restock</button>
                        </div>
                    </div>
                `;
            }
        });
    });

    if (!hasAlerts) {
        lowStockList.innerHTML = `
            <div style="text-align:center;padding:30px;color:var(--text-muted);">
                <i class="fa-solid fa-circle-check" style="font-size:2.5rem;color:var(--stock-good);margin-bottom:10px;"></i>
                <p>All stock levels are sufficient. No warning alerts.</p>
            </div>
        `;
    }

    // 2. Render performance report table
    const completedOrders = orders.filter(o => o.status === 'completed');
    
    // Average Order Value
    const totalSales = completedOrders.reduce((sum, o) => sum + o.total, 0);
    const avgOrder = completedOrders.length > 0 ? (totalSales / completedOrders.length) : 0;
    document.getElementById('report-avg-order').textContent = formatPrice(avgOrder);

    // Completion Rate
    const completionRate = orders.length > 0 ? Math.round((completedOrders.length / orders.length) * 100) : 0;
    document.getElementById('report-completion-rate').textContent = `${completionRate}%`;

    // Active Items & Total Units
    document.getElementById('report-active-items').textContent = allItems.length;
    
    let totalStockCount = 0;
    Object.values(stock).forEach(prodStock => {
        Object.values(prodStock).forEach(qty => {
            totalStockCount += qty;
        });
    });
    document.getElementById('report-total-stock').textContent = `${totalStockCount} units`;

    // 3. Category performance table rows
    const catReportBody = document.getElementById('category-report-body');
    if (catReportBody) {
        catReportBody.innerHTML = '';
        
        const categories = ['shirts', 'tshirts', 'jeans', 'combos'];
        categories.forEach(cat => {
            let itemsSold = 0;
            let revenue = 0;

            completedOrders.forEach(o => {
                (o.items || []).forEach(item => {
                    const matchedItem = allItems.find(prod => prod.name === item.name);
                    const itemCat = matchedItem ? matchedItem.category : '';
                    
                    if (itemCat === cat || (cat === 'combos' && item.name.toLowerCase().includes('combo'))) {
                        itemsSold += item.qty;
                        revenue += item.price * item.qty;
                    }
                });
            });

            catReportBody.innerHTML += `
                <tr>
                    <td style="text-transform:capitalize;font-weight:600;">${cat}</td>
                    <td>${itemsSold} units</td>
                    <td style="font-weight:600;color:var(--primary-color);">${formatPrice(revenue)}</td>
                </tr>
            `;
        });
    }
}

// ==========================================
// 8. ADMINISTRATIVE TOAST ALERTS
// ==========================================
function showAdminToast(message, type = 'success') {
    const toast = document.getElementById('admin-toast');
    if (!toast) return;

    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
        <span>${message}</span>`;

    toast.classList.add('toast-show');
    setTimeout(() => {
        toast.classList.remove('toast-show');
    }, 3000);
}
