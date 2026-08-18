<?php
// api/admin-orders.php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendJson(['success' => false, 'message' => 'Invalid request method'], 405);
}

try {
    // Get all orders
    $stmt = $pdo->query("SELECT * FROM orders ORDER BY created_at DESC");
    $orders = $stmt->fetchAll();

    // Get all items
    $itemStmt = $pdo->query("SELECT * FROM order_items");
    $items = $itemStmt->fetchAll();

    // Combine
    foreach ($orders as &$order) {
        $order['items'] = [];
        $order['customer'] = [
            'name' => $order['customer_name'],
            'phone' => $order['customer_phone'],
            'email' => $order['customer_email'],
            'address' => $order['delivery_address'],
            'district' => $order['district'],
            'pincode' => $order['pincode']
        ];
        // Ensure timestamp is present for frontend
        $order['timestamp'] = $order['created_at'];
        
        foreach ($items as $item) {
            if ($item['order_id'] === $order['id']) {
                $order['items'][] = [
                    'id' => $item['product_id'],
                    'name' => $item['product_name'],
                    'size' => $item['size'],
                    'color' => $item['color'],
                    'qty' => $item['quantity'],
                    'price' => $item['unit_price']
                ];
            }
        }
    }

    sendJson([
        'success' => true,
        'orders' => $orders
    ]);

} catch (Exception $e) {
    sendJson(['success' => false, 'message' => $e->getMessage()], 500);
}
?>
