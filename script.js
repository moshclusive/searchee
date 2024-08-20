const categoryWebsites = {
    course: [
        "https://softarchive.is/full/",
        "https://gfxdomain.co/",
        "https://vfxdownload.net/",
        "https://persiangfx.com/",
        "https://cgdownload.ru/",
        "https://babiato.co/",
        "https://hot4share.com/",
        "https://usersdrive.com/",
        "https://www.avaxbb.com/",
        "vk.cm",
        "https://tut4u.com/",
        "https://downloadlynet.ir/",
        "https://www.1377x.to/",
        "https://vk.com/",
        "https://p30download.ir/",
        "https://www.luckystudio4u.com/",
        "https://thepiratebay.org/",
        "https://www.gfxtra31.com/",
        "https://godownloads.org/",
        "https://onehack.us/",
        "https://www.blackhatworld.com/",
        "https://gift4designer.net/"
    ],
    font: [
        "https://www.dafontfree.net/",
        "https://www.fontshare.com/",
        "https://www.cufonfonts.com/",
        "https://fontsgeek.com/",
        "https://freefontsvault.com/",
        "https://www.fontsquirrel.com/",
        "https://befonts.com/",
        "https://www.dafont.com/",
        "https://ifonts.xyz/",
        "https://www.cdnfonts.com/",
        "https://en.fontsloader.com/types",
        "https://fontshub.pro/",
        "https://graphicex.com/",
        "vk.com",
        "https://www.luckystudio4u.com/",
        "https://www.gfxtra31.com/",
        "https://freepreset.net/",
        "https://gift4designer.net/"
    ],
    png: [
        "https://www.cleanpng.com/",
"https://www.anyrgb.com/",
"https://www.hiclipart.com/",
"https://www.klipartz.com/en",
"https://www.pngfind.com/",
"https://toppng.com/",
"https://www.pngwing.com/",
"https://clipart.info/",
"https://www.footyrenders.com/",
"https://pngimg.com/"
    ],
    gfx: [
        "https://vk.com/",
        "https://www.blackhatworld.com/",
        "https://www.luckystudio4u.com/",
        "https://www.gfxtra31.com/",
        "https://freepreset.net/",
        "https://onehack.us/",
        "https://www.1377x.to/",
        "https://p30download.ir/",
        "https://thepiratebay.org/",
        "https://www.gfxtra31.com/",
        "https://godownloads.org/",
        "https://onehack.us/",
        "https://www.blackhatworld.com/",
        "https://persiangfx.com/",
        "https://cgdownload.ru/",
        "https://downloadlynet.ir/",
        "https://graphicex.com/",
        "https://freepsdvn.com/",
        "https://picgiraffe.com/",
        "https://freepreset.net/",
        "https://gift4designer.net/"
    ]
};

let selectedEngine = 'google';

document.querySelectorAll('.search-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.search-option').forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
    });
});

document.querySelectorAll('.search-engine').forEach(engine => {
    engine.addEventListener('click', function() {
        document.querySelectorAll('.search-engine').forEach(eng => eng.classList.remove('active'));
        this.classList.add('active');
        selectedEngine = this.getAttribute('data-engine');
    });
});

// Set the default search engine to Google when the page loads
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.search-engine[data-engine="google"]').classList.add('active');
});

document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const query = document.getElementById('search-query').value;
    const category = document.getElementById('category-select').value;
    const searchType = document.querySelector('.search-option.active').getAttribute('data-type');

    let sitesToSearch = [];
    
    if (category !== 'all' && categoryWebsites[category]) {
        sitesToSearch = categoryWebsites[category].map(site => `site:${site}`).join(' OR ');
    }
    
    let searchUrl = '';

    switch (selectedEngine) {
        case 'google':
            searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            break;
        case 'duckduckgo':
            searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
            break;
        case 'bing':
            searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
            break;
        case 'yandex':
            searchUrl = `https://yandex.com/search/?text=${encodeURIComponent(query)}`;
            break;
    }

    if (sitesToSearch) {
        searchUrl += ` ${encodeURIComponent(sitesToSearch)}`;
    }

    if (searchType === 'images') {
        if (selectedEngine === 'google') {
            searchUrl += '&tbm=isch';
        } else if (selectedEngine === 'duckduckgo') {
            searchUrl += '&iax=images&ia=images';
        } else if (selectedEngine === 'bing') {
            searchUrl = `https://www.bing.com/images/search?q=${encodeURIComponent(query)}&form=HDRSC3&first=1`;
        } else if (selectedEngine === 'yandex') {
            searchUrl = `https://yandex.com/images/search?from=tabbar&text=${encodeURIComponent(query)}`;
        }
    } else if (searchType === 'videos') {
        if (selectedEngine === 'google') {
            searchUrl += '&tbm=vid';
        } else if (selectedEngine === 'duckduckgo') {
            searchUrl += '&iax=videos&ia=videos';
        } else if (selectedEngine === 'bing') {
            searchUrl = `https://www.bing.com/videos/search?q=${encodeURIComponent(query)}&FORM=HDRSC4`;
        } else if (selectedEngine === 'yandex') {
            searchUrl = `https://yandex.com/video/search?text=${encodeURIComponent(query)}&from=tabbar`;
        }
    }

    window.location.href = searchUrl;
});
