import os
import requests
import json
import time

PHONE_ID = os.environ.get('WHATSAPP_PHONE_ID', '1234567890')
TOKEN = os.environ.get('WHATSAPP_TOKEN', 'dummy_token')
RECIPIENT = '919361438664'
ORDER_ID = 'ORD-' + str(int(time.time() * 1000))
CUSTOMER_NAME = 'Hari'

# 1. Generate dummy PDF
pdf_filename = f"AK_Fashions_Order_{CUSTOMER_NAME}_{ORDER_ID}.pdf"
pdf_path = os.path.join(os.getcwd(), pdf_filename)

with open(pdf_path, 'wb') as f:
    f.write(b'%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n>>\nendobj\n')

# 2. Check if file exists
file_exists = os.path.exists(pdf_path)

# 3. Size
file_size = os.path.getsize(pdf_path)

print(f"1. PDF file path being generated: {pdf_path}")
print(f"2. PDF file exists: {file_exists}")
print(f"3. PDF file size: {file_size} bytes")
print(f"4. PDF filename being used: {pdf_filename}")

# 5. POST to /media
upload_url = f"https://graph.facebook.com/v17.0/{PHONE_ID}/media"

files = {
    'file': (pdf_filename, open(pdf_path, 'rb'), 'application/pdf')
}
data = {
    'messaging_product': 'whatsapp'
}
headers = {
    'Authorization': f'Bearer {TOKEN}'
}

upload_response = requests.post(upload_url, headers=headers, files=files, data=data)

print(f"\n5. HTTP status code returned by POST {upload_url}: {upload_response.status_code}")
print(f"6. Complete response body from media upload request:")
print(upload_response.text)

if upload_response.status_code != 200:
    print("\n[ERROR] Media upload failed. Stopping as requested.")
    exit(1)

# 7. Media ID
media_data = upload_response.json()
media_id = media_data.get('id')
print(f"\n7. Media_id returned by Meta: {media_id}")

if not media_id:
    print("[ERROR] Media ID is missing in response.")
    exit(1)

# 8. POST to /messages
send_url = f"https://graph.facebook.com/v17.0/{PHONE_ID}/messages"
send_payload = {
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": RECIPIENT,
    "type": "document",
    "document": {
        "id": media_id,
        "filename": pdf_filename
    }
}

headers['Content-Type'] = 'application/json'

send_response = requests.post(send_url, headers=headers, json=send_payload)

print(f"\n8. HTTP status code returned by POST {send_url}: {send_response.status_code}")
print(f"9. Complete response body from document message request:")
print(send_response.text)
