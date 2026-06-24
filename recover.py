import json
import sys

log_file = r"C:\Users\dream\.gemini\antigravity\brain\4e0ec1e4-5a8d-436e-80cb-faa1db523dc0\.system_generated\logs\overview.txt"

index_html = ""
shop_html = ""

with open(log_file, "r", encoding="utf-8") as f:
    for line in f:
        try:
            data = json.loads(line)
            if "tool_calls" in data:
                for call in data["tool_calls"]:
                    if call["name"] == "write_to_file":
                        args = call["args"]
                        target = args.get("TargetFile", "").strip('"')
                        if target.endswith("index.html") and "admin" not in target:
                            index_html = args.get("CodeContent", "").strip('"').encode().decode('unicode_escape')
                        elif target.endswith("shop.html"):
                            shop_html = args.get("CodeContent", "").strip('"').encode().decode('unicode_escape')
        except Exception as e:
            pass

if index_html:
    with open(r"e:\ak fasionns\index.html.recovered", "w", encoding="utf-8") as f:
        f.write(index_html)
    print("Recovered index.html")
if shop_html:
    with open(r"e:\ak fasionns\shop.html.recovered", "w", encoding="utf-8") as f:
        f.write(shop_html)
    print("Recovered shop.html")
