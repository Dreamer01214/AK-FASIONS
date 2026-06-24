import os, glob, re

html_files = glob.glob('*.html') + glob.glob('admin/*.html')

new_html = '''<div class="form-group"><label for="cust-address">Delivery Address *</label><textarea id="cust-address" rows="2" required placeholder="Full street address"></textarea></div>
<div style="display: flex; gap: 15px;">
    <div class="form-group" style="flex: 1;"><label for="cust-pincode">Pincode *</label><input type="text" id="cust-pincode" required placeholder="e.g. 621216"></div>
    <div class="form-group" style="flex: 1;"><label for="cust-district">District *</label><input type="text" id="cust-district" required placeholder="e.g. Tiruchirappalli"></div>
</div>'''

pattern = re.compile(r'<div class="form-group">\s*<label for="cust-address">Delivery Address \*</label>\s*<textarea id="cust-address" rows="3" required placeholder="Full street address, city, pin code"></textarea>\s*</div>')

for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    new_content, count = pattern.subn(new_html, content)
    if count > 0:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Updated {f}")
