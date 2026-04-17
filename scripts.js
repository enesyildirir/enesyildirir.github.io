// ------------------------------
// UYGULAMA 1 - Öğrenci Not Hesaplama
// ------------------------------
const form1 = document.getElementById("notForm");

if (form1) {
    const adSoyadInput = document.getElementById("adSoyad");
    const vizeInput = document.getElementById("vize");
    const finalInput = document.getElementById("final");

    const errorMesaji = document.getElementById("errorMesaji");
    const sonucKutusu = document.getElementById("sonucKutusu");
    const ogrenciAdi = document.getElementById("ogrenciAdi");
    const ortalamaYazisi = document.getElementById("ortalamaYazisi");
    const harfNotuYazisi = document.getElementById("harfNotuYazisi");
    const durumYazisi = document.getElementById("durumYazisi");

    form1.addEventListener("submit", function (e) {
        e.preventDefault();

        const adSoyad = adSoyadInput.value.trim();
        const vize = Number(vizeInput.value.trim());
        const finalNotu = Number(finalInput.value.trim());

        errorMesaji.textContent = "";
        sonucKutusu.style.display = "none";

        if (adSoyad === "" || vizeInput.value.trim() === "" || finalInput.value.trim() === "") {
            errorMesaji.textContent = "Lütfen tüm alanları doldurunuz.";
            return;
        }

        if (isNaN(vize) || isNaN(finalNotu)) {
            errorMesaji.textContent = "Vize ve final alanlarına sayısal değer giriniz.";
            return;
        }

        if (vize < 0 || vize > 100 || finalNotu < 0 || finalNotu > 100) {
            errorMesaji.textContent = "Notlar 0 ile 100 arasında olmalıdır.";
            return;
        }

        const ortalama = (vize * 0.4) + (finalNotu * 0.6);
        const harfNotu = harfNotuHesapla(ortalama);
        const durum = ortalama >= 50 ? "Geçti" : "Kaldı";

        ogrenciAdi.textContent = adSoyad;
        ortalamaYazisi.textContent = "Ortalama: " + ortalama.toFixed(2);
        harfNotuYazisi.textContent = "Harf Notu: " + harfNotu;
        durumYazisi.textContent = "Durum: " + durum;

        sonucKutusu.style.display = "block";
    });

    function harfNotuHesapla(not) {
        if (not >= 90) return "AA";
        if (not >= 80) return "BA";
        if (not >= 70) return "BB";
        if (not >= 60) return "CB";
        if (not >= 50) return "CC";
        if (not >= 40) return "DC";
        if (not >= 30) return "DD";
        if (not >= 20) return "FD";
        return "FF";
    }
}

// ------------------------------
// UYGULAMA 2 - Birim Dönüştürücü
// ------------------------------
const form2 = document.getElementById("donusumForm");

if (form2) {
    const degerInput = document.getElementById("deger");
    const donusumTipi = document.getElementById("donusumTipi");
    const errorMesaji2 = document.getElementById("errorMesaji2");
    const sonucKutusu2 = document.getElementById("sonucKutusu2");
    const sonucYazisi = document.getElementById("sonucYazisi");

    form2.addEventListener("submit", function (e) {
        e.preventDefault();

        const deger = Number(degerInput.value.trim());
        const secilenDonusum = donusumTipi.value;

        errorMesaji2.textContent = "";
        sonucKutusu2.style.display = "none";

        if (degerInput.value.trim() === "") {
            errorMesaji2.textContent = "Lütfen bir değer giriniz.";
            return;
        }

        if (isNaN(deger)) {
            errorMesaji2.textContent = "Lütfen sayısal bir değer giriniz.";
            return;
        }

        let sonuc = 0;
        let birimSonuc = "";

        switch (secilenDonusum) {
            case "metre-kilometre":
                sonuc = deger / 1000;
                birimSonuc = "km";
                break;

            case "kilometre-metre":
                sonuc = deger * 1000;
                birimSonuc = "m";
                break;

            case "celsius-fahrenheit":
                sonuc = (deger * 9 / 5) + 32;
                birimSonuc = "°F";
                break;

            case "fahrenheit-celsius":
                sonuc = (deger - 32) * 5 / 9;
                birimSonuc = "°C";
                break;

            case "kilogram-gram":
                sonuc = deger * 1000;
                birimSonuc = "g";
                break;

            case "gram-kilogram":
                sonuc = deger / 1000;
                birimSonuc = "kg";
                break;

            default:
                errorMesaji2.textContent = "Geçersiz dönüşüm tipi.";
                return;
        }

        sonucYazisi.textContent = "Sonuç: " + sonuc.toFixed(3) + " " + birimSonuc;
        sonucKutusu2.style.display = "block";
    });
}