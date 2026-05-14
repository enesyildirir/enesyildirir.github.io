
/* TEMA DEĞİŞTİRME*/
function temaDegistir() {
  const body     = document.getElementById('pageBody');
  const btn      = document.getElementById('temaButon');
  const isDark   = body.classList.toggle('dark-theme');

  if (isDark) {
    btn.innerHTML = '<i class="bi bi-sun-fill me-1"></i>Açık Tema';
    localStorage.setItem('hafta7Tema', 'dark');
  } else {
    btn.innerHTML = '<i class="bi bi-moon-stars-fill me-1"></i>Koyu Tema';
    localStorage.setItem('hafta7Tema', 'light');
  }
}

/* Sayfa açılışında kayıtlı temayı uygula */
(function () {
  const kaydedilenTema = localStorage.getItem('hafta7Tema');
  if (kaydedilenTema === 'dark') {
    document.getElementById('pageBody').classList.add('dark-theme');
    const btn = document.getElementById('temaButon');
    if (btn) btn.innerHTML = '<i class="bi bi-sun-fill me-1"></i>Açık Tema';
  }
})();

/*  FORM ÖZET ÜRETME */
document.getElementById('kayitFormu').addEventListener('submit', function (event) {
  event.preventDefault();
  formGonder();
});

function formGonder() {
  const adSoyad    = document.getElementById('adSoyad').value.trim();
  const email      = document.getElementById('email').value.trim();
  const telefon    = document.getElementById('telefon').value.trim();
  const etkinlik   = document.getElementById('etkinlikSec').value;
  const mesaj      = document.getElementById('mesaj').value.trim();
  const kvkk       = document.getElementById('kvkk').checked;

  const uyariAlani = document.getElementById('uyariAlani');
  const uyariMesaj = document.getElementById('uyariMesaj');
  const sonucAlani = document.getElementById('sonucAlani');

  // Uyarıyı sıfırla
  uyariAlani.classList.add('d-none');
  sonucAlani.classList.add('d-none');

  // Alan Doğrulama 
  if (!adSoyad) {
    uyariMesaj.textContent = 'Lütfen ad soyad alanını doldurun.';
    uyariAlani.classList.remove('d-none');
    document.getElementById('adSoyad').focus();
    return;
  }

  if (!email || !email.includes('@')) {
    uyariMesaj.textContent = 'Lütfen geçerli bir e-posta adresi girin.';
    uyariAlani.classList.remove('d-none');
    document.getElementById('email').focus();
    return;
  }

  if (!etkinlik) {
    uyariMesaj.textContent = 'Lütfen katılmak istediğiniz etkinliği seçin.';
    uyariAlani.classList.remove('d-none');
    document.getElementById('etkinlikSec').focus();
    return;
  }

  if (!kvkk) {
    uyariMesaj.textContent = 'Devam etmek için kişisel verilerin işlenmesine onay vermeniz gerekiyor.';
    uyariAlani.classList.remove('d-none');
    return;
  }

  // ── Özet Kartı Oluştur ──
  const tarih = new Date().toLocaleDateString('tr-TR', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  sonucAlani.innerHTML = `
    <div class="sonuc-kart">
      <div class="d-flex align-items-center gap-2 mb-3">
        <i class="bi bi-check-circle-fill text-success fs-4"></i>
        <h5 class="mb-0">Başvurunuz Alındı!</h5>
      </div>
      <p class="text-muted small mb-3">Aşağıdaki bilgilerle kaydınız oluşturuldu. Onay e-postası gönderilecektir.</p>
      <div class="row g-2">
        <div class="col-sm-6">
          <div class="small text-muted mb-1">Ad Soyad</div>
          <div class="fw-600">${escapeHTML(adSoyad)}</div>
        </div>
        <div class="col-sm-6">
          <div class="small text-muted mb-1">E-posta</div>
          <div class="fw-600">${escapeHTML(email)}</div>
        </div>
        ${telefon ? `
        <div class="col-sm-6">
          <div class="small text-muted mb-1">Telefon</div>
          <div class="fw-600">${escapeHTML(telefon)}</div>
        </div>` : ''}
        <div class="col-sm-6">
          <div class="small text-muted mb-1">Seçilen Etkinlik</div>
          <div class="fw-600">${escapeHTML(etkinlik)}</div>
        </div>
        ${mesaj ? `
        <div class="col-12">
          <div class="small text-muted mb-1">Notunuz</div>
          <div class="fw-500">${escapeHTML(mesaj)}</div>
        </div>` : ''}
        <div class="col-12 mt-2">
          <div class="small text-muted">Başvuru Zamanı: ${tarih}</div>
        </div>
      </div>
    </div>
  `;
  sonucAlani.classList.remove('d-none');

  // Formu temizle
  document.getElementById('adSoyad').value    = '';
  document.getElementById('email').value      = '';
  document.getElementById('telefon').value    = '';
  document.getElementById('etkinlikSec').value = '';
  document.getElementById('mesaj').value      = '';
  document.getElementById('kvkk').checked     = false;

  // Sonuç alanına kaydır
  sonucAlani.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* XSS koruması için HTML escape */
function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
