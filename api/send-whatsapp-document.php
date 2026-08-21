<?php
// api/send-whatsapp-document.php
require_once 'db.php';

ini_set('display_errors', 0);
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJson(['success' => false, 'message' => 'Invalid request'], 405);
}

// Check for configured tokens, else use dummy or error out
$token = getenv('WHATSAPP_TOKEN');
$phoneId = getenv('WHATSAPP_PHONE_ID');
$recipientPhone = $_POST['recipient_phone'] ?? '';
$messageText = $_POST['message'] ?? '';

if (empty($token) || empty($phoneId)) {
    sendJson(['success' => false, 'message' => 'WhatsApp API credentials not configured on the server. Please set WHATSAPP_TOKEN and WHATSAPP_PHONE_ID.'], 500);
}

if (!isset($_FILES['pdf_file']) || $_FILES['pdf_file']['error'] !== UPLOAD_ERR_OK) {
    sendJson(['success' => false, 'message' => 'PDF file not uploaded properly. Error code: ' . ($_FILES['pdf_file']['error'] ?? 'Unknown')], 400);
}

$pdfPath = $_FILES['pdf_file']['tmp_name'];
$pdfName = $_FILES['pdf_file']['name'];

// 1. Upload to Media API
$mediaFile = new CURLFile($pdfPath, 'application/pdf', $pdfName);
$uploadUrl = "https://graph.facebook.com/v17.0/{$phoneId}/media";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $uploadUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer {$token}"]);
curl_setopt($ch, CURLOPT_POSTFIELDS, [
    'file' => $mediaFile,
    'messaging_product' => 'whatsapp'
]);

$uploadResponse = curl_exec($ch);
$uploadHttpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$uploadData = json_decode($uploadResponse, true);

if ($uploadHttpCode !== 200 || !isset($uploadData['id'])) {
    sendJson([
        'success' => false, 
        'message' => 'Failed to upload media to WhatsApp API.', 
        'api_response' => $uploadData, 
        'http_code' => $uploadHttpCode,
        'filename' => $pdfName,
        'size' => filesize($pdfPath)
    ], 500);
}

$mediaId = $uploadData['id'];

// 2. Send Document Message using Media ID
$sendUrl = "https://graph.facebook.com/v17.0/{$phoneId}/messages";
$payload = [
    'messaging_product' => 'whatsapp',
    'recipient_type' => 'individual',
    'to' => $recipientPhone,
    'type' => 'document',
    'document' => [
        'id' => $mediaId,
        'caption' => $messageText,
        'filename' => $pdfName
    ]
];

$ch2 = curl_init();
curl_setopt($ch2, CURLOPT_URL, $sendUrl);
curl_setopt($ch2, CURLOPT_POST, true);
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch2, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer {$token}",
    "Content-Type: application/json"
]);
curl_setopt($ch2, CURLOPT_POSTFIELDS, json_encode($payload));

$sendResponse = curl_exec($ch2);
$sendHttpCode = curl_getinfo($ch2, CURLINFO_HTTP_CODE);
curl_close($ch2);

$sendData = json_decode($sendResponse, true);

if ($sendHttpCode !== 200) {
    sendJson([
        'success' => false, 
        'message' => 'Document send API request failed.', 
        'upload_response' => $uploadData,
        'send_response' => $sendData,
        'http_code' => $sendHttpCode,
        'media_id' => $mediaId
    ], 500);
}

sendJson([
    'success' => true,
    'message' => 'Document sent successfully via WhatsApp API.',
    'media_id' => $mediaId,
    'upload_response' => $uploadData,
    'send_response' => $sendData
]);
?>
