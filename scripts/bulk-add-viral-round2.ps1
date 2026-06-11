# Bulk add viral products - Round 2 (from web research)
# Usage: $env:ADMIN_SECRET="xxx"; .\scripts\bulk-add-viral-round2.ps1

$API_URL = "http://localhost:3001/api/admin/viral-products"
$ADMIN_SECRET = $env:ADMIN_SECRET

$products = @(
    # === Web App / SaaS (10) ===
    @{ url = "https://lovable.dev"; category = "web_app" },
    @{ url = "https://bolt.new"; category = "web_app" },
    @{ url = "https://cursor.com"; category = "web_app" },
    @{ url = "https://framer.com"; category = "web_app" },
    @{ url = "https://linear.app"; category = "web_app" },
    @{ url = "https://postiz.com"; category = "web_app" },
    @{ url = "https://attio.com"; category = "web_app" },
    @{ url = "https://amie.so"; category = "web_app" },
    @{ url = "https://mintlify.com"; category = "web_app" },
    @{ url = "https://polar.sh"; category = "web_app" },

    # === Content Site (10) ===
    @{ url = "https://beehiiv.com"; category = "content_site" },
    @{ url = "https://substack.com"; category = "content_site" },
    @{ url = "https://stratechery.com"; category = "content_site" },
    @{ url = "https://platformer.news"; category = "content_site" },
    @{ url = "https://bytes.dev"; category = "content_site" },
    @{ url = "https://ui.dev"; category = "content_site" },
    @{ url = "https://smashingmagazine.com"; category = "content_site" },
    @{ url = "https://css-tricks.com"; category = "content_site" },
    @{ url = "https://a16z.com"; category = "content_site" },
    @{ url = "https://firstround.com/review"; category = "content_site" },

    # === Directory / Marketplace (10) ===
    @{ url = "https://g2.com"; category = "directory" },
    @{ url = "https://caperra.com"; category = "directory" },
    @{ url = "https://stackshare.io"; category = "directory" },
    @{ url = "https://saasworthy.com"; category = "directory" },
    @{ url = "https://topai.tools"; category = "directory" },
    @{ url = "https://aiprm.com"; category = "directory" },
    @{ url = "https://tinywow.com"; category = "directory" },
    @{ url = "https://toolify.ai"; category = "directory" },
    @{ url = "https://aitoolnet.com"; category = "directory" },
    @{ url = "https://microacquire.com"; category = "directory" },

    # === Mobile App (10) ===
    @{ url = "https://lapsecamera.com"; category = "mobile_app" },
    @{ url = "https://noteit.app"; category = "mobile_app" },
    @{ url = "https://photomath.com"; category = "mobile_app" },
    @{ url = "https://capcut.com"; category = "mobile_app" },
    @{ url = "https://reminimobileapp.com"; category = "mobile_app" },
    @{ url = "https://widgetable.net"; category = "mobile_app" },
    @{ url = "https://wombo.ai"; category = "mobile_app" },
    @{ url = "https://winds.app"; category = "mobile_app" },
    @{ url = "https://opalcamera.com"; category = "mobile_app" },
    @{ url = "https://dopple.ai"; category = "mobile_app" },

    # === Chrome Extension (10) ===
    @{ url = "https://darkreader.org"; category = "chrome_extension" },
    @{ url = "https://vimium.github.io"; category = "chrome_extension" },
    @{ url = "https://tango.us"; category = "chrome_extension" },
    @{ url = "https://monica.im"; category = "chrome_extension" },
    @{ url = "https://sidebar.io"; category = "chrome_extension" },
    @{ url = "https://heyday.xyz"; category = "chrome_extension" },
    @{ url = "https://memex.garden"; category = "chrome_extension" },
    @{ url = "https://webbrain.com"; category = "chrome_extension" },
    @{ url = "https://onetab.com"; category = "chrome_extension" },
    @{ url = "https://sessionbuddy.com"; category = "chrome_extension" }
)

$total = $products.Count
$success = 0
$failed = 0
$failedUrls = @()

Write-Host "Starting bulk viral product analysis (Round 2)..." -ForegroundColor Cyan
Write-Host "Total products to process: $total" -ForegroundColor Cyan
Write-Host ""

for ($i = 0; $i -lt $total; $i++) {
    $p = $products[$i]
    $num = $i + 1
    Write-Host "[$num/$total] Analyzing: $($p.url) ($($p.category))" -ForegroundColor Yellow -NoNewline

    try {
        $body = @{ url = $p.url } | ConvertTo-Json
        $headers = @{
            "Authorization" = "Bearer $ADMIN_SECRET"
            "Content-Type" = "application/json"
        }

        $response = Invoke-RestMethod -Uri $API_URL -Method Post -Headers $headers -Body $body -TimeoutSec 300

        if ($response.product) {
            Write-Host " -> OK: $($response.product.name)" -ForegroundColor Green
            $success++
        } else {
            Write-Host " -> Unexpected response" -ForegroundColor Red
            $failed++
            $failedUrls += $p.url
        }
    } catch {
        $errMsg = $_.Exception.Message
        if ($errMsg -match "429") {
            Write-Host " -> Rate limited, waiting 30s..." -ForegroundColor Magenta
            Start-Sleep -Seconds 30
            try {
                $response = Invoke-RestMethod -Uri $API_URL -Method Post -Headers $headers -Body $body -TimeoutSec 300
                if ($response.product) {
                    Write-Host " -> OK (retry): $($response.product.name)" -ForegroundColor Green
                    $success++
                } else {
                    Write-Host " -> Failed (retry)" -ForegroundColor Red
                    $failed++
                    $failedUrls += $p.url
                }
            } catch {
                Write-Host " -> Failed (retry): $($_.Exception.Message)" -ForegroundColor Red
                $failed++
                $failedUrls += $p.url
            }
        } else {
            Write-Host " -> Error: $errMsg" -ForegroundColor Red
            $failed++
            $failedUrls += $p.url
        }
    }

    if ($i -lt ($total - 1)) {
        Start-Sleep -Seconds 2
    }
}

Write-Host ""
Write-Host "=== COMPLETE ===" -ForegroundColor Cyan
Write-Host "Success: $success / $total" -ForegroundColor Green
Write-Host "Failed: $failed / $total" -ForegroundColor Red
if ($failedUrls.Count -gt 0) {
    Write-Host ""
    Write-Host "Failed URLs:" -ForegroundColor Red
    foreach ($u in $failedUrls) {
        Write-Host "  - $u" -ForegroundColor Red
    }
}
