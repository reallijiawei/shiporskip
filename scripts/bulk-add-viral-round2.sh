#!/bin/bash
# Bulk add viral products - Round 2 (from web research)

API_URL="http://localhost:3001/api/admin/viral-products"
ADMIN_SECRET="admin_5f82982c71d06b6c8cd093fdc1f2f59a"

urls=(
    "https://lovable.dev|web_app"
    "https://bolt.new|web_app"
    "https://cursor.com|web_app"
    "https://framer.com|web_app"
    "https://linear.app|web_app"
    "https://postiz.com|web_app"
    "https://attio.com|web_app"
    "https://amie.so|web_app"
    "https://mintlify.com|web_app"
    "https://polar.sh|web_app"
    "https://beehiiv.com|content_site"
    "https://substack.com|content_site"
    "https://stratechery.com|content_site"
    "https://platformer.news|content_site"
    "https://bytes.dev|content_site"
    "https://ui.dev|content_site"
    "https://smashingmagazine.com|content_site"
    "https://css-tricks.com|content_site"
    "https://a16z.com|content_site"
    "https://firstround.com/review|content_site"
    "https://g2.com|directory"
    "https://capterra.com|directory"
    "https://stackshare.io|directory"
    "https://saasworthy.com|directory"
    "https://topai.tools|directory"
    "https://aiprm.com|directory"
    "https://tinywow.com|directory"
    "https://toolify.ai|directory"
    "https://aitoolnet.com|directory"
    "https://microacquire.com|directory"
    "https://lapsecamera.com|mobile_app"
    "https://noteit.app|mobile_app"
    "https://photomath.com|mobile_app"
    "https://capcut.com|mobile_app"
    "https://remini.ai|mobile_app"
    "https://widgetable.net|mobile_app"
    "https://wombo.ai|mobile_app"
    "https://winds.app|mobile_app"
    "https://opalcamera.com|mobile_app"
    "https://dopple.ai|mobile_app"
    "https://darkreader.org|chrome_extension"
    "https://vimium.github.io|chrome_extension"
    "https://tango.us|chrome_extension"
    "https://monica.im|chrome_extension"
    "https://sidebar.io|chrome_extension"
    "https://heyday.xyz|chrome_extension"
    "https://memex.garden|chrome_extension"
    "https://webbrain.com|chrome_extension"
    "https://onetab.com|chrome_extension"
    "https://sessionbuddy.com|chrome_extension"
)

total=${#urls[@]}
success=0
failed=0
failed_urls=()

echo "Starting bulk viral product analysis (Round 2)..."
echo "Total products to process: $total"
echo ""

for i in "${!urls[@]}"; do
    IFS='|' read -r url category <<< "${urls[$i]}"
    num=$((i + 1))
    printf "[%d/%d] Analyzing: %s (%s) " "$num" "$total" "$url" "$category"

    response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
        -H "Authorization: Bearer $ADMIN_SECRET" \
        -H "Content-Type: application/json" \
        -d "{\"url\": \"$url\"}" \
        --max-time 300 2>&1)

    http_code=$(echo "$response" | tail -1)
    body=$(echo "$response" | sed '$d')

    if [ "$http_code" = "200" ]; then
        name=$(echo "$body" | python -c "import sys,json; print(json.load(sys.stdin).get('product',{}).get('name','Unknown'))" 2>/dev/null)
        echo "-> OK: $name"
        success=$((success + 1))
    else
        echo "-> Error (HTTP $http_code)"
        failed=$((failed + 1))
        failed_urls+=("$url")
    fi

    sleep 2
done

echo ""
echo "=== COMPLETE ==="
echo "Success: $success / $total"
echo "Failed: $failed / $total"

if [ ${#failed_urls[@]} -gt 0 ]; then
    echo ""
    echo "Failed URLs:"
    for u in "${failed_urls[@]}"; do
        echo "  - $u"
    done
fi
