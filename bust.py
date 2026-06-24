import glob
import re
files = glob.glob('*.html') + glob.glob('admin/*.html')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    content = re.sub(r'href="style\.css(\?v=[\d\.]+)?', 'href="style.css?v=2.7', content)
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
print("Updated all html files")
