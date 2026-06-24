import glob
for f in glob.glob('*.html') + glob.glob('admin/*.html'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    content = content.replace('Group Orders', 'Bulk Orders')
    content = content.replace('openGroupOrderSizeSelector', 'openBulkOrderFlow')
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
