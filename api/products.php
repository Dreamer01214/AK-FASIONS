<?php
// api/products.php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendJson(['success' => false, 'message' => 'Invalid request method'], 405);
}

try {
    // Get all active products
    $stmt = $pdo->query("SELECT * FROM products WHERE active = TRUE ORDER BY created_at DESC");
    $products = $stmt->fetchAll();

    // Get all images
    $imgStmt = $pdo->query("SELECT product_id, image_url, is_primary FROM product_images");
    $images = $imgStmt->fetchAll();

    // Get all variants
    $varStmt = $pdo->query("SELECT product_id, size, color, stock FROM product_variants");
    $variants = $varStmt->fetchAll();

    // Structure the data
    foreach ($products as &$product) {
        $product['images'] = [];
        $product['image'] = null;
        $product['sizes'] = [];
        $product['colors'] = [];
        $product['defaultStock'] = [];
        
        foreach ($images as $img) {
            if ($img['product_id'] === $product['id']) {
                $product['images'][] = $img['image_url'];
                if ($img['is_primary'] || $product['image'] === null) {
                    $product['image'] = $img['image_url'];
                }
            }
        }
        
        foreach ($variants as $var) {
            if ($var['product_id'] === $product['id']) {
                if (!in_array($var['size'], $product['sizes'])) {
                    $product['sizes'][] = $var['size'];
                }
                if ($var['color'] && !in_array($var['color'], $product['colors'])) {
                    $product['colors'][] = $var['color'];
                }
                // Store stock per size for simple frontend compatibility
                // Note: Frontend uses a flat stock format per size, but this logic can handle full size+color if updated
                if (!isset($product['defaultStock'][$var['size']])) {
                    $product['defaultStock'][$var['size']] = 0;
                }
                $product['defaultStock'][$var['size']] += $var['stock'];
            }
        }
    }

    sendJson([
        'success' => true,
        'products' => $products
    ]);

} catch (Exception $e) {
    sendJson(['success' => false, 'message' => $e->getMessage()], 500);
}
?>
