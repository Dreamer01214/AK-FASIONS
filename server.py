import os
import uvicorn
from fastapi import FastAPI, File, UploadFile, Request, Form
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
import requests
import json

app = FastAPI()

def load_env():
    env_file = ".env"
    if os.path.exists(env_file):
        with open(env_file, 'r') as f:
            for line in f:
                if '=' in line and not line.strip().startswith('#'):
                    key, value = line.strip().split('=', 1)
                    os.environ[key] = value

# Load environment variables on startup
load_env()

@app.get("/auth/login")
def login():
    load_env()
    client_id = os.environ.get('GOOGLE_CLIENT_ID')
    redirect_uri = "http://localhost:8080/auth/callback"
    scope = "https://www.googleapis.com/auth/drive.file"
    url = f"https://accounts.google.com/o/oauth2/auth?client_id={client_id}&redirect_uri={redirect_uri}&scope={scope}&response_type=code&access_type=offline&prompt=consent"
    return RedirectResponse(url)

@app.get("/auth/callback")
def auth_callback(code: str):
    load_env()
    client_id = os.environ.get('GOOGLE_CLIENT_ID')
    client_secret = os.environ.get('GOOGLE_CLIENT_SECRET')
    redirect_uri = "http://localhost:8080/auth/callback"
    
    token_url = 'https://oauth2.googleapis.com/token'
    data = {
        'code': code,
        'client_id': client_id,
        'client_secret': client_secret,
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code'
    }
    
    response = requests.post(token_url, data=data)
    token_json = response.json()
    
    if 'refresh_token' in token_json:
        # Save refresh token to .env
        with open(".env", "a") as f:
            f.write(f"\nGOOGLE_REFRESH_TOKEN={token_json['refresh_token']}\n")
        return "SUCCESS! The Refresh token was obtained and automatically saved to your .env file. You can now close this tab."
    elif 'access_token' in token_json and 'refresh_token' not in token_json:
        return "Error: No refresh token returned. This usually happens if you have already authorized this app in the past without revoking permissions first. Go to your Google Account > Security > Connections to third-party apps, remove this app, and try again."
    else:
        return f"Failed to get refresh token: {token_json}"

@app.post("/api/upload-drive.php")
async def upload_drive(pdf_file: UploadFile = File(...)):
    load_env()
    client_id = os.environ.get('GOOGLE_CLIENT_ID')
    client_secret = os.environ.get('GOOGLE_CLIENT_SECRET')
    refresh_token = os.environ.get('GOOGLE_REFRESH_TOKEN')
    folder_id = os.environ.get('GOOGLE_DRIVE_FOLDER_ID')

    if not all([client_id, client_secret, refresh_token, folder_id]) or folder_id == 'YOUR_FOLDER_ID_HERE':
        return JSONResponse(status_code=500, content={
            'success': False, 
            'message': 'Google Drive configuration missing. Please ensure your .env file has GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, and a valid GOOGLE_DRIVE_FOLDER_ID.'
        })

    pdf_content = await pdf_file.read()
    if not pdf_content:
        return JSONResponse(status_code=400, content={'success': False, 'message': 'PDF file is empty.'})

    # 1. Get Access Token
    token_url = 'https://oauth2.googleapis.com/token'
    token_data = {
        'client_id': client_id,
        'client_secret': client_secret,
        'refresh_token': refresh_token,
        'grant_type': 'refresh_token'
    }
    
    try:
        token_response = requests.post(token_url, data=token_data)
        token_json = token_response.json()
    except Exception as e:
        return JSONResponse(status_code=500, content={'success': False, 'message': f'Failed to request access token: {str(e)}'})

    if 'access_token' not in token_json:
        return JSONResponse(status_code=500, content={
            'success': False, 
            'message': 'Failed to obtain Google access token.', 
            'error': token_json
        })
        
    access_token = token_json['access_token']

    # 2. Upload File metadata & content
    upload_url = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink'
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    
    metadata = {
        'name': pdf_file.filename,
        'parents': [folder_id]
    }
    
    files = {
        'metadata': ('metadata', json.dumps(metadata), 'application/json; charset=UTF-8'),
        'file': (pdf_file.filename, pdf_content, 'application/pdf')
    }

    try:
        upload_response = requests.post(upload_url, headers=headers, files=files)
        upload_json = upload_response.json()
    except Exception as e:
        return JSONResponse(status_code=500, content={'success': False, 'message': f'Failed to upload to Google Drive: {str(e)}'})

    if upload_response.status_code != 200 or 'id' not in upload_json:
        return JSONResponse(status_code=500, content={
            'success': False, 
            'message': 'Failed to upload to Google Drive.', 
            'error': upload_json
        })

    file_id = upload_json['id']

    # 3. Set Permissions (anyone, reader)
    perm_url = f'https://www.googleapis.com/drive/v3/files/{file_id}/permissions'
    perm_headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    perm_data = {
        'type': 'anyone',
        'role': 'reader'
    }
    
    try:
        requests.post(perm_url, headers=perm_headers, json=perm_data)
    except Exception as e:
        print(f"Failed to set permissions: {e}")

    return JSONResponse(content={
        'success': True,
        'file_id': file_id,
        'url': f'https://drive.google.com/file/d/{file_id}/view'
    })

# Serve all static files from the current directory
app.mount("/", StaticFiles(directory=".", html=True), name="static")

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8080)
