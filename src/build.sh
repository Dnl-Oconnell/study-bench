#!/bin/bash
# Builds both versions from the source files in this folder.
#   ./build.sh          -> src/study-bench.html  (Claude artifact, images inlined)
#   ./build.sh web      -> ../index.html         (GitHub Pages app, images from img/)
set -e
cd "$(dirname "$0")"
MODE=${1:-artifact}
ART=art.js; [ "$MODE" = web ] && ART=art_web.js
# Content order: registry, figures, MSP files, then every mod_*.js (alphabetical), then art and the app.
CONTENT="registry.js figs.js msp_a.js msp_b.js msp_mcq.js msp_tut.js msp_see.js $(ls mod_*.js 2>/dev/null | sort | tr '\n' ' ') $ART app.js"
body(){
cat shell_head.html
cat <<'H'
<div id="app"></div>
<script>
window.MathJax = { tex:{ inlineMath:[["$","$"]], displayMath:[["$$","$$"]] }, svg:{ fontCache:"global" },
  startup:{ typeset:false, pageReady(){ return MathJax.startup.defaultPageReady().then(()=>{ window.__onMathReady && window.__onMathReady(); }); } } };
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg.min.js" async></script>
<script>
H
cat $CONTENT
echo '["docket","tile","head","bay"].forEach(k => document.documentElement.style.setProperty("--img-"+k, "url(" + STUDY.art[k] + ")"));'
echo "</script>"
}
if [ "$MODE" != web ]; then body > study-bench.html; wc -c study-bench.html; exit 0; fi
{
cat <<'H'
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#121211">
<meta name="description" content="Study Bench: exam revision platform for DCU Year 3 engineering modules.">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icons/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Study Bench">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}</style>
</head>
<body>
H
body
cat <<'H'
<script>
if ("serviceWorker" in navigator) { window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(()=>{})); }
</script>
</body>
</html>
H
} > ../index.html
wc -c ../index.html
