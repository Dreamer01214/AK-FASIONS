<?php
// api/create-order.php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJson(['success' => false, 'message' => 'Invalid request method'], 405);
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    sendJson(['success' => false, 'message' => 'Invalid JSON input'], 400);
}

$cart = $data['cart'] ?? [];
$customer = $data['customer'] ?? [];

if (empty($cart) || empty($customer)) {
    sendJson(['success' => false, 'message' => 'Missing cart or customer details'], 400);
}

try {
    $pdo->beginTransaction();

    $subtotal = 0;
    $orderItems = [];

    // Verify stock and calculate total
    foreach ($cart as $item) {
        $productId = $item['id'];
        $size = $item['size'];
        $color = $item['color'] ?? '';
        $qty = (int)$item['qty'];

        // Get product and verify it's active
        $stmt = $pdo->prepare("SELECT id, name, price, active FROM products WHERE id = ? FOR UPDATE");
        $stmt->execute([$productId]);
        $product = $stmt->fetch();

        if (!$product || !$product['active']) {
            throw new Exception("Product {$productId} is not available");
        }

        // Get variant stock
        $stmt = $pdo->prepare("SELECT id, stock FROM product_variants WHERE product_id = ? AND size = ? AND color = ? FOR UPDATE");
        $stmt->execute([$productId, $size, $color]);
        $variant = $stmt->fetch();

        if (!$variant || $variant['stock'] < $qty) {
            throw new Exception("Insufficient stock for {$product['name']} (Size: {$size}, Color: {$color})");
        }

        // Update stock
        $newStock = $variant['stock'] - $qty;
        $stmt = $pdo->prepare("UPDATE product_variants SET stock = ? WHERE id = ?");
        $stmt->execute([$newStock, $variant['id']]);

        $itemTotal = $qty * $product['price'];
        $subtotal += $itemTotal;

        $orderItems[] = [
            'product_id' => $productId,
            'variant_id' => $variant['id'],
            'product_name' => $product['name'],
            'size' => $size,
            'color' => $color,
            'quantity' => $qty,
            'unit_price' => $product['price'],
            'total_price' => $itemTotal
        ];
    }

    $deliveryCharge = 0;
    $discount = 0;
    $total = $subtotal + $deliveryCharge - $discount;

    // Generate Order ID
    $orderId = 'AKF-' . date('Y') . '-' . substr(str_shuffle("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 6);

    // Insert Order
    $stmt = $pdo->prepare("INSERT INTO orders (id, customer_name, customer_phone, customer_email, delivery_address, district, pincode, subtotal, delivery_charge, discount, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $orderId,
        $customer['name'],
        $customer['phone'],
        $customer['email'] ?? null,
        $customer['address'],
        $customer['district'] ?? null,
        $customer['pincode'] ?? null,
        $subtotal,
        $deliveryCharge,
        $discount,
        $total
    ]);

    // Insert Order Items
    $stmt = $pdo->prepare("INSERT INTO order_items (order_id, product_id, variant_id, product_name, size, color, quantity, unit_price, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    
    foreach ($orderItems as $item) {
        $stmt->execute([
            $orderId,
            $item['product_id'],
            $item['variant_id'],
            $item['product_name'],
            $item['size'],
            $item['color'],
            $item['quantity'],
            $item['unit_price'],
            $item['total_price']
        ]);
    }

    $pdo->commit();

    sendJson([
        'success' => true,
        'orderId' => $orderId,
        'total' => $total,
        'message' => 'Order placed successfully'
    ]);

} catch (Exception $e) {
    $pdo->rollBack();
    sendJson(['success' => false, 'message' => $e->getMessage()], 400);
}
?>
