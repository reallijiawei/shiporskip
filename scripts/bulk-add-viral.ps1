# Bulk add viral products to knowledge base
# Usage: .\scripts\bulk-add-viral.ps1

$API_URL = "http://localhost:3001/api/admin/viral-products"
$ADMIN_SECRET = $env:ADMIN_SECRET

$products = @(
    # === Web App / SaaS ===
    # gamma.app and screen.studio already added
    @{ url = "https://typefully.com"; category = "web_app" },
    @{ url = "https://tally.so"; category = "web_app" },
    @{ url = "https://dub.co"; category = "web_app" },
    @{ url = "https://resend.com"; category = "web_app" },
    @{ url = "https://cal.com"; category = "web_app" },
    @{ url = "https://lemonsqueezy.com"; category = "web_app" },
    @{ url = "https://carrd.co"; category = "web_app" },
    # notion.so already added

    # === Content Site ===
    @{ url = "https://explodingtopics.com"; category = "content_site" },
    @{ url = "https://chartr.co"; category = "content_site" },
    @{ url = "https://tldrnewsletter.com"; category = "content_site" },
    @{ url = "https://1440.com"; category = "content_site" },
    @{ url = "https://morningbrew.com"; category = "content_site" },
    @{ url = "https://thehustle.co"; category = "content_site" },
    @{ url = "https://swipefiles.com"; category = "content_site" },
    @{ url = "https://growth.design"; category = "content_site" },
    @{ url = "https://every.to"; category = "content_site" },
    @{ url = "https://read.cv"; category = "content_site" },

    # === Directory / Marketplace ===
    @{ url = "https://producthunt.com"; category = "directory" },
    @{ url = "https://acquire.com"; category = "directory" },
    @{ url = "https://theresanaiforthat.com"; category = "directory" },
    @{ url = "https://futurepedia.io"; category = "directory" },
    @{ url = "https://betalist.com"; category = "directory" },
    @{ url = "https://alternativeto.net"; category = "directory" },
    @{ url = "https://uneed.best"; category = "directory" },
    @{ url = "https://toools.design"; category = "directory" },
    @{ url = "https://remoteok.com"; category = "directory" },
    @{ url = "https://wellfound.com"; category = "directory" },

    # === Mobile App ===
    @{ url = "https://bereal.com"; category = "mobile_app" },
    @{ url = "https://locket.app"; category = "mobile_app" },
    @{ url = "https://duolingo.com"; category = "mobile_app" },
    @{ url = "https://perplexity.ai"; category = "mobile_app" },
    @{ url = "https://calm.com"; category = "mobile_app" },
    @{ url = "https://todoist.com"; category = "mobile_app" },
    @{ url = "https://bear.app"; category = "mobile_app" },
    @{ url = "https://sparkmailapp.com"; category = "mobile_app" },
    @{ url = "https://rize.io"; category = "mobile_app" },
    @{ url = "https://habitica.com"; category = "mobile_app" },

    # === Chrome Extension ===
    @{ url = "https://scribehow.com"; category = "chrome_extension" },
    @{ url = "https://merlin.chat"; category = "chrome_extension" },
    @{ url = "https://glasp.co"; category = "chrome_extension" },
    @{ url = "https://getliner.com"; category = "chrome_extension" },
    @{ url = "https://grammarly.com"; category = "chrome_extension" },
    @{ url = "https://loom.com"; category = "chrome_extension" },
    @{ url = "https://1password.com"; category = "chrome_extension" },
    @{ url = "https://momentumdash.com"; category = "chrome_extension" },
    @{ url = "https://www.wappalyzer.com"; category = "chrome_extension" },
    @{ url = "https://www.similarweb.com"; category = "chrome_extension" }
)

$total = $products.Count
$success = 0
$failed = 0
$failedUrls = @()

Write-Host "Starting bulk viral product analysis..." -ForegroundColor Cyan
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
            # Retry
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

    # Small delay between requests to avoid rate limiting
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
