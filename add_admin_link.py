import glob
import re

html_files = glob.glob('*.html')

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the Quick Links UL
    # Pattern: <h4>Quick Links</h4>\s*<ul>
    
    if '<li><a href="admin/login.html">Admin Portal</a></li>' not in content:
        new_content = re.sub(
            r'(<h4>Quick Links</h4>\s*<ul>)',
            r'\1\n                        <li><a href="admin/login.html">Admin Portal</a></li>',
            content
        )
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filepath}")
