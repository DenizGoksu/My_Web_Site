const projectData = {
    'log-analiz-sistemi': { 
        title: "Gerçek Zamanlı Log Analiz ve Uyarı Sistemi", 
        tag: "SOC Otomasyonu", 
        desc: "MacOS/Linux loglarını anlık izleyen, kritik ihlalleri SMTP üzerinden raporlayan SOC çözümüdür.", 
        details: `
            <strong>📋 Proje Genel Bakışı:</strong><br>
            Sistem; <b>Brute Force</b> ve <b>Yetki Yükseltme</b> gibi şüpheli aktiviteleri yakalar. Tespit edilen olaylar Splunk SIEM platformuna aktarılmaya hazır hale getirilir ve SMTP üzerinden anlık bildirim iletilir.<br><br>
            <strong>✨ Temel Özellikler:</strong><br>
            • <b>Gerçek Zamanlı İzleme:</b> tail -f mantığıyla çalışan, gecikmesiz log takibi.<br>
            • <b>Akıllı Filtreleme:</b> Log gürültüsünü minimize eden Regex tabanlı eşleştirme.<br><br>
            <strong>🎯 Siber Güvenlik Kazanımları:</strong><br>
            • <b>MTTD & MTTR:</b> Tehdidi fark etme ve müdahale süresini saniyelere indirerek veri sızıntısı riskini azaltır.
        ` 
    },
    'port-scanner-v2': { 
        title: "Port Tarama ve Servis Tespit Etme v2.0", 
        tag: "Network Sec", 
        desc: "Dockerize edilmiş, multi-threading destekli ve Banner Grabbing özellikli gelişmiş port analizörü.", 
        details: "Python Socket kütüphanesi ile servislerin versiyon bilgilerini yakalar. Tamamen <b>Dockerize</b> edilmiş yapısı ile her ortamda (Linux, macOS, Windows) saniyeler içinde ayağa kaldırılabilir." 
    },
    'dosya-sifreleme': { 
        title: "XOR-Vault: C++ Dosya Şifreleme Uygulaması", 
        tag: "Cryptography", 
        desc: "Bit düzeyinde (XOR) işlem yapan yüksek performanslı binary dosya güvenlik aracı.", 
        details: "Düşük seviyeli bellek yönetimi ve <b>fstream binary</b> mod kullanımı ile büyük dosyaları RAM dostu bir performansla şifreler. C++ ile sistem seviyesi kodlama yeteneğini gösterir." 
    },
    'link-analiz': { 
        title: "URL Güvenlik Analiz ve İstihbarat Aracı", 
        tag: "OSINT & Web Sec", 
        desc: "Rich kütüphanesi kullanan, oltalama analizi ve sunucu istihbaratı toplayan terminal aracı.", 
        details: "Target IP, Ülke ve ISP bilgilerini sorgular; URL yapısındaki phishing paternlerini analiz ederek detaylı tablolar sunar." 
    },
    'ag-kesif': { 
        title: "Python Ağ Keşif Aracı", 
        tag: "Network Security", 
        desc: "Multi-threading ile optimize edilmiş, yüksek performanslı ağ haritalama aracı.", 
        details: "Python threading ve <b>thread.join()</b> yapısı ile 254 IP adresini saniyeler içinde tarayıp canlı cihaz haritası çıkarır." 
    },
    'sifre-yonetim': { 
        title: "Password Vault", 
        tag: "Application Sec", 
        desc: "C# ve SQLite kullanılarak geliştirilmiş, XOR şifreleme destekli profesyonel bir şifre yönetim panelidir.", 
        details: "Microsoft.Data.Sqlite ile verilerin yerel veritabanında saklanması ve XOR algoritmasıyla şifrelerin maskelenmesini sağlar." 
    },
    'kripto-takip': { 
        title: "Crypto Tracker - Real Time Dashboard", 
        tag: "C# & API Data", 
        desc: "CoinGecko API üzerinden canlı kripto verisi çeken asenkron terminal uygulaması.", 
        details: "Task.Delay ve <b>async/await</b> mimarisi ile donma yapmayan, 10 saniyede bir güncellenen canlı fiyat dashboard'udur." 
    }
};

function navigateTo(pageId, projectId = null) {
    const state = { pageId, projectId };
    const url = projectId ? `#${pageId}/${projectId}` : `#${pageId}`;
    window.history.pushState(state, "", url);
    renderPage(state);
}

function renderPage(state) {
    const { pageId, projectId } = state;
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));

    if (pageId === 'detail' && projectId) {
        const data = projectData[projectId];
        document.getElementById('detail-content').innerHTML = `
            <h1 style="color:#fff; font-size:2.1rem; margin-bottom:10px;">${data.title}</h1>
            <p style="color:var(--green); font-weight:bold; letter-spacing:1px; margin-bottom:25px;">[ ${data.tag} ]</p>
            <div style="font-size:1.05rem; line-height:1.8; color:var(--text);">
                ${data.details}
            </div>
        `;
        document.getElementById('detail-page').classList.remove('hidden');
    } else {
        const target = document.getElementById(`${pageId}-page`);
        if (target) target.classList.remove('hidden');
    }
    window.scrollTo(0,0);
}

window.onpopstate = (event) => {
    if (event.state) renderPage(event.state);
    else renderPage({ pageId: 'home' });
};

function renderGrids() {
    const fGrid = document.getElementById('featured-grid');
    const aGrid = document.getElementById('all-grid');
    const keys = Object.keys(projectData);
    
    keys.forEach((key, index) => {
        const p = projectData[key];
        const html = `<div class="p-card" onclick="navigateTo('detail', '${key}')">
                        <div class="p-tag">${p.tag}</div>
                        <h3>${p.title}</h3>
                        <p>${p.desc}</p>
                      </div>`;
        if (index < 3) fGrid.innerHTML += html;
        aGrid.innerHTML += html;
    });
}

const welcomeText = "system@mdd_researcher:~# initialize_dashboard...";
let i = 0;
function typeWelcome() {
    if (i < welcomeText.length) {
        document.getElementById("typing-text").innerHTML += welcomeText.charAt(i);
        i++; setTimeout(typeWelcome, 50);
    }
}

function startSite() {
    document.getElementById("welcome-screen").classList.add("screen-hidden");
    document.body.style.overflow = "auto";
    window.history.replaceState({ pageId: 'home' }, "", "#home");
}

window.onload = () => {
    typeWelcome();
    renderGrids();
    document.body.style.overflow = "hidden";
};