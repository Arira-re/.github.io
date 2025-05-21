function adjustLinks(prefix, selector) {
    // aタグのhref属性を修正
    document.querySelectorAll(selector + ' a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith(prefix)) {
            link.setAttribute('href', prefix + href);
        }
    });
    // imgタグのsrc属性を修正
    document.querySelectorAll(selector + ' img').forEach(img => {
        const src = img.getAttribute('src');
        if (src && !src.startsWith('http') && !src.startsWith(prefix)) {
            img.setAttribute('src', prefix + src);
        }
    });
}

// ヘッダーを読み込む
fetch('header.html')
    .then(response => {
        if (!response.ok) throw new Error();
        return response.text();
    })
    .then(data => document.getElementById('header').innerHTML = data)
    .catch(() => {
        fetch('../header.html')
            .then(response => {
                if (!response.ok) throw new Error();
                return response.text();
            })
            .then(data => {
                document.getElementById('header').innerHTML = data;
                adjustLinks('../', '#header');
            });
    });

// フッターを読み込む
fetch('footer.html')
    .then(response => {
        if (!response.ok) throw new Error();
        return response.text();
    })
    .then(data => document.getElementById('footer').innerHTML = data)
    .catch(() => {
        fetch('../footer.html')
            .then(response => {
                if (!response.ok) throw new Error();
                return response.text();
            })
            .then(data => {
                document.getElementById('footer').innerHTML = data;
                adjustLinks('../', '#footer');
            });
    });