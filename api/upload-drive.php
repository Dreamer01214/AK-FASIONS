<?php
// api/upload-drive.php
require_once 'db.php';

ini_set('display_errors', 0);
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJson(['success' => false, 'message' => 'Invalid request'], 405);
}

// Credentials - use environment variables securely
$clientId = getenv('GOOGLE_CLIENT_ID');
$clientSecret = getenv('GOOGLE_CLIENT_SECRET');
$refreshToken = getenv('GOOGLE_REFRESH_TOKEN');
$folderId = getenv('GOOGLE_DRIVE_FOLDER_ID');

if (empty($refreshToken) || empty($folderId)) {
    sendJson(['success' => false, 'message' => 'Google Drive configuration missing (Refresh Token or Folder ID).'], 500);
}

if (!isset($_FILES['pdf_file']) || $_FILES['pdf_file']['error'] !== UPLOAD_ERR_OK) {
    sendJson(['success' => false, 'message' => 'PDF file not uploaded properly.'], 400);
}

$pdfPath = $_FILES['pdf_file']['tmp_name'];
$pdfName = $_FILES['pdf_file']['name'];
$pdfSize = filesize($pdfPath);

if ($pdfSize <= 0) {
    sendJson(['success' => false, 'message' => 'PDF file is empty.'], 400);
}

// 1. Get Access Token
$tokenUrl = 'https://oauth2.googleapis.com/token';
$tokenPost = [
    'client_id' => $clientId,
    'client_secret' => $clientSecret,
    'refresh_token' => $refreshToken,
    'grant_type' => 'refresh_token'
];

$ch = curl_init($tokenUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($tokenPost));
$tokenResponse = curl_exec($ch);
curl_close($ch);

$tokenData = json_decode($tokenResponse, true);
if (!isset($tokenData['access_token'])) {
    sendJson(['success' => false, 'message' => 'Failed to obtain Google access token.', 'error' => $tokenData], 500);
}
$accessToken = $tokenData['access_token'];

// 2. Upload File metadata & content (Multipart)
$boundary = uniqid('----GoogleDriveUpload');
$metadata = [
    'name' => $pdfName,
    'parents' => [$folderId]
];

$postData = "--$boundary\r\n";
$postData .= "Content-Type: application/json; charset=UTF-8\r\n\r\n";
$postData .= json_encode($metadata) . "\r\n";
$postData .= "--$boundary\r\n";
$postData .= "Content-Type: application/pdf\r\n\r\n";
$postData .= file_get_contents($pdfPath) . "\r\n";
$postData .= "--$boundary--\r\n";

$uploadUrl = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink';
$ch2 = curl_init($uploadUrl);
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch2, CURLOPT_POST, true);
curl_setopt($ch2, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch2, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $accessToken",
    "Content-Type: multipart/related; boundary=$boundary",
    "Content-Length: " . strlen($postData)
]);
$uploadResponse = curl_exec($ch2);
$uploadHttpCode = curl_getinfo($ch2, CURLINFO_HTTP_CODE);
curl_close($ch2);

$uploadData = json_decode($uploadResponse, true);

if ($uploadHttpCode !== 200 || !isset($uploadData['id'])) {
    sendJson(['success' => false, 'message' => 'Failed to upload to Google Drive.', 'error' => $uploadData], 500);
}
$fileId = $uploadData['id'];

// 3. Set Permissions (anyone, reader)
$permUrl = "https://www.googleapis.com/drive/v3/files/{$fileId}/permissions";
$permPost = json_encode(['type' => 'anyone', 'role' => 'reader']);

$ch3 = curl_init($permUrl);
curl_setopt($ch3, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch3, CURLOPT_POST, true);
curl_setopt($ch3, CURLOPT_POSTFIELDS, $permPost);
curl_setopt($ch3, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $accessToken",
    "Content-Type: application/json"
]);
$permResponse = curl_exec($ch3);
$permHttpCode = curl_getinfo($ch3, CURLINFO_HTTP_CODE);
curl_close($ch3);

if ($permHttpCode !== 200) {
    error_log("Failed to set drive permissions for file $fileId");
}

sendJson([
    'success' => true,
    'file_id' => $fileId,
    'url' => "https://drive.google.com/file/d/{$fileId}/view"
]);
?>
