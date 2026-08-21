import requests

url = 'http://localhost:8080/api/send-whatsapp-document.php'
with open('dummy.pdf', 'wb') as f:
    f.write(b'%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n>>\nendobj\n')

files = {'pdf_file': ('AK_Fashions_Order_Test_ORD-123.pdf', open('dummy.pdf', 'rb'), 'application/pdf')}
data = {'recipient_phone': '919361438664', 'message': 'Test message'}

try:
    response = requests.post(url, files=files, data=data)
    print("Status Code:", response.status_code)
    print("Response Body:", response.text)
except Exception as e:
    print("Error:", e)
