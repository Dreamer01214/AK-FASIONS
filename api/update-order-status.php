<?php
// api/update-order-status.php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJson(['success' => false, 'message' => 'Invalid request method'], 405);
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!isset($data['orderId']) || !isset($data['status'])) {
    sendJson(['success' => false, 'message' => 'Missing order ID or status'], 400);
}

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("SELECT status FROM orders WHERE id = ? FOR UPDATE");
    $stmt->execute([$data['orderId']]);
    $order = $stmt->fetch();

    if (!$order) {
        throw new Exception("Order not found");
    }

    // If changing to rejected, return stock
    if ($data['status'] === 'rejected' && $order['status'] !== 'rejected') {
        $itemsStmt = $pdo->prepare("SELECT variant_id, quantity FROM order_items WHERE order_id = ?");
        $itemsStmt->execute([$data['orderId']]);
        $items = $itemsStmt->fetchAll();

        foreach ($items as $item) {
            $updStmt = $pdo->prepare("UPDATE product_variants SET stock = stock + ? WHERE id = ?");
            $updStmt->execute([$item['quantity'], $item['variant_id']]);
        }
    }

    $stmt = $pdo->prepare("UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
    $stmt->execute([$data['status'], $data['orderId']]);

    $pdo->commit();

    sendJson(['success' => true, 'message' => 'Order status updated']);

} catch (Exception $e) {
    $pdo->rollBack();
    sendJson(['success' => false, 'message' => $e->getMessage()], 500);
}
?>
