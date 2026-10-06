# Local preview server for SANS TOI MAMIE (no install required)
# Serves this folder at http://localhost:8000/  -  close this window to stop.
$ErrorActionPreference = 'Stop'
$root = [IO.Path]::GetFullPath((Split-Path -Parent $MyInvocation.MyCommand.Path))
if (-not $root.EndsWith('\')) { $root += '\' }

$types = @{
  '.html' = 'text/html; charset=utf-8'; '.css' = 'text/css; charset=utf-8'
  '.js'   = 'application/javascript; charset=utf-8'; '.json' = 'application/json; charset=utf-8'
  '.jpg'  = 'image/jpeg'; '.jpeg' = 'image/jpeg'; '.png' = 'image/png'; '.gif' = 'image/gif'
  '.webp' = 'image/webp'; '.svg' = 'image/svg+xml'; '.ico' = 'image/x-icon'
  '.md'   = 'text/plain; charset=utf-8'; '.txt' = 'text/plain; charset=utf-8'
}

$listener = $null
foreach ($p in 8000..8010) {
  try {
    $l = New-Object System.Net.HttpListener
    $l.Prefixes.Add("http://localhost:$p/")
    $l.Start()
    $listener = $l; $port = $p; break
  } catch { }
}
if (-not $listener) { Write-Host 'Could not start server (ports 8000-8010 are busy).'; exit 1 }

$url = "http://localhost:$port/"
Write-Host ''
Write-Host '  SANS TOI MAMIE - local preview'
Write-Host "  Open: $url"
Write-Host '  Close this window to stop the preview.'
Write-Host ''
Start-Process $url

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $res = $ctx.Response
  try {
    $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath)
    if ($path.EndsWith('/')) { $path += 'index.html' }
    $full = [IO.Path]::GetFullPath((Join-Path $root ($path.TrimStart('/') -replace '/', '\')))
    if ($full.StartsWith($root, [StringComparison]::OrdinalIgnoreCase) -and (Test-Path -LiteralPath $full -PathType Leaf)) {
      $bytes = [IO.File]::ReadAllBytes($full)
      $ext = [IO.Path]::GetExtension($full).ToLower()
      if ($types.ContainsKey($ext)) { $res.ContentType = $types[$ext] } else { $res.ContentType = 'application/octet-stream' }
      $res.AddHeader('Cache-Control', 'no-cache')
      $res.ContentLength64 = $bytes.Length
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
      Write-Host "200 $path"
    } else {
      $res.StatusCode = 404
      $b = [Text.Encoding]::UTF8.GetBytes('404 Not Found')
      $res.OutputStream.Write($b, 0, $b.Length)
      Write-Host "404 $path"
    }
  } catch {
    # browser closed the connection early - ignore
  } finally {
    try { $res.Close() } catch { }
  }
}
