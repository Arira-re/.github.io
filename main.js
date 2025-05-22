function adjustLinks(prefix, selector) {
    // aタグのhref属性を修正
    document.querySelectorAll(`${selector} a`).forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith(prefix)) {
            link.setAttribute('href', prefix + href);
        }
    });
    // imgタグのsrc属性を修正
    document.querySelectorAll(`${selector} img`).forEach(img => {
        const src = img.getAttribute('src');
        if (src && !src.startsWith('http') && !src.startsWith(prefix)) {
            img.setAttribute('src', prefix + src);
        }
    });
}

// 共通のfetch処理
function fetchWithFallback(primary, fallback, targetSelector, adjustPrefix) {
    fetch(primary)
        .then(response => {
            if (!response.ok) throw new Error();
            return response.text();
        })
        .then(data => {
            document.getElementById(targetSelector).innerHTML = data;
        })
        .catch(() => {
            fetch(fallback)
                .then(response => {
                    if (!response.ok) throw new Error();
                    return response.text();
                })
                .then(data => {
                    document.getElementById(targetSelector).innerHTML = data;
                    if (adjustPrefix) adjustLinks(adjustPrefix, `#${targetSelector}`);
                });
        });
}

// ヘッダーとフッターを読み込む
fetchWithFallback('header.html', '../header.html', 'header', '../');
fetchWithFallback('footer.html', '../footer.html', 'footer', '../');