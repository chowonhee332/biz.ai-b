import re

with open('src/context/platform/platform-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the full set of keys based on the interface
required_keys = [
    '타이틀', '설명', '주요고객군', '핵심가치', '주요기능', '주요특징이미지', '메인이미지', 
    '특장점', '주요활용시나리오', '고객사례', '소개영상', '노출뉴스', '다운로드', 
    '오퍼링', '제품상세문의', '관련리소스'
]

# Function to ensure all keys exist in an object string
def ensure_keys(obj_str):
    # Regex to extract key-value pairs
    # This is a bit naive but should work for this specific file structure
    keys_found = re.findall(r'^\s*([a-zA-Z가-힣]+):', obj_str, re.MULTILINE)
    
    missing = [k for k in required_keys if k not in keys_found]
    
    if not missing:
        return obj_str
    
    # Add missing keys before the closing brace
    new_lines = []
    for k in missing:
        if k in ['핵심가치', '주요기능', '주요특징이미지', '특장점', '주요활용시나리오', '고객사례', '소개영상', '노출뉴스', '다운로드', '오퍼링', '관련리소스']:
            val = '[]'
        elif k == '제품상세문의':
            val = "{ 이메일: '', 전화번호: '' }"
        elif k == '메인이미지':
            val = '"/works.png"'
        else:
            val = '""'
        new_lines.append(f'            {k}: {val},')
    
    # Insert before the last closing brace
    lines = obj_str.splitlines()
    for i in range(len(lines)-1, -1, -1):
        if lines[i].strip() == '}':
            # Add a comma to the previous line if it doesn't have one
            # Find the last non-empty line before this one
            for j in range(i-1, -1, -1):
                if lines[j].strip() and not lines[j].strip().endswith('{') and not lines[j].strip().endswith(','):
                    lines[j] = lines[j] + ','
                    break
            
            lines[i:i] = new_lines
            break
    
    return '\n'.join(lines)

# Find the products object content
match = re.search(r'products: \{(.*)\}\s*as Record', content, re.DOTALL)
if match:
    products_content = match.group(1)
    
    # Split by product names
    # Example: "AI Portal": { ... },
    product_blocks = re.findall(r'"([^"]+)": \{(.*?)\n\s*\},', products_content, re.DOTALL)
    
    fixed_blocks = []
    for name, block_content in product_blocks:
        fixed_content = ensure_keys('{' + block_content + '\n        }')
        fixed_blocks.append(f'        "{name}": {fixed_content}')
    
    new_products_str = ',\n'.join(fixed_blocks)
    
    # Replace in original content
    new_content = content[:match.start(1)] + new_products_str + '\n    ' + content[match.end(1):]
    
    with open('src/context/platform/platform-data.ts', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully updated platform-data.ts")
else:
    print("Could not find products object")
