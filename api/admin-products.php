<?php
// api/admin-products.php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJson(['success' => false, 'message' => 'Invalid request method'], 405);
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['id'])) {
    sendJson(['success' => false, 'message' => 'Invalid product data'], 400);
}

try {
    $pdo->beginTransaction();

    // Check if product exists
    $stmt = $pdo->prepare("SELECT id FROM products WHERE id = ?");
    $stmt->execute([$data['id']]);
    $exists = $stmt->fetch();

    if ($exists) {
        $stmt = $pdo->prepare("UPDATE products SET name=?, description=?, category=?, price=?, original_price=?, active=?, updated_at=CURRENT_TIMESTAMP WHERE id=?");
        $stmt->execute([
            $data['name'], 
            $data['description'] ?? '', 
            $data['category'], 
            $data['price'], 
            $data['originalPrice'] ?? null, 
            isset($data['active']) ? $data['active'] : true,
            $data['id']
        ]);
    } else {
        $stmt = $pdo->prepare("INSERT INTO products (id, name, description, category, price, original_price) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['id'], 
            $data['name'], 
            $data['description'] ?? '', 
            $data['category'], 
            $data['price'], 
            $data['originalPrice'] ?? null
        ]);
    }

    // Process images
    if (isset($data['images']) && is_array($data['images'])) {
        $pdo->prepare("DELETE FROM product_images WHERE product_id = ?")->execute([$data['id']]);
        $imgStmt = $pdo->prepare("INSERT INTO product_images (product_id, image_url, is_primary) VALUES (?, ?, ?)");
        foreach ($data['images'] as $index => $img) {
            $imgStmt->execute([$data['id'], $img, $index === 0]);
        }
    }

    // Process variants (Sizes, Colors, Stock)
    if (isset($data['sizes']) && is_array($data['sizes'])) {
        // Simplified approach: Clear existing variants and recreate
        // In a strict production env, we would update existing to preserve order history joins
        $colors = $data['colors'] ?? [''];
        if (empty($colors)) $colors = [''];

        // Note: For real integration, we should map existing variants. 
        // Here we just insert missing ones or update stock.
        
        foreach ($data['sizes'] as $size) {
            $stock = $data['defaultStock'][$size] ?? 0;
            // Distribute stock across colors evenly or assign to first color for this simplified example
            foreach ($colors as $cIdx => $color) {
                $cStock = ($cIdx === 0) ? $stock : 0; // Assign all size stock to first color 

                $vStmt = $pdo->prepare("INSERT INTO product_variants (product_id, size, color, stock) VALUES (?, ?, ?, ?) ON CONFLICT (product_id, size, color) DO UPDATE SET stock = EXCLUDED.stock, updated_at = CURRENT_TIMESTAMP");
                $vStmt->execute([$data['id'], $size, $color, $cStock]);
            }
        }
    }

    $pdo->commit();
    sendJson(['success' => true, 'message' => 'Product saved successfully']);

} catch (Exception $e) {
    $pdo->rollBack();
    sendJson(['success' => false, 'message' => $e->getMessage()], 500);
}
?>
