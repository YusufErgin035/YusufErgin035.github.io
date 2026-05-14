function notHesapla() {
  const adSoyad = document.getElementById("adSoyad").value.trim();
  const vize = parseFloat(document.getElementById("vizeNotu").value);
  const final = parseFloat(document.getElementById("finalNotu").value);

  if (!adSoyad || isNaN(vize) || isNaN(final)) {
    alert("Lütfen tüm alanları doldurunuz.");
    return;
  }

  if (vize < 0 || vize > 100 || final < 0 || final > 100) {
    alert("Vize ve final notlari 0 ile 100 arasinda olmalidir.");
    return;
  }

  const ortalama = vize * 0.4 + final * 0.6;

  const durum = ortalama >= 50 ? "Geçti" : "Kaldı";

  let harfNotu = "";
  if (ortalama >= 90) harfNotu = "AA";
  else if (ortalama >= 80) harfNotu = "BA";
  else if (ortalama >= 70) harfNotu = "BB";
  else if (ortalama >= 60) harfNotu = "CB";
  else if (ortalama >= 50) harfNotu = "CC";
  else harfNotu = "FF";

  document.getElementById("sonucAd").innerText = adSoyad;
  document.getElementById("sonucOrt").innerText =
    "Ortalama: " + ortalama.toFixed(2);
  document.getElementById("sonucHarf").innerText = "Harf Notu: " + harfNotu;
  document.getElementById("sonucDurum").innerText = "Durum: " + durum;

  document.getElementById("sonucAlani").style.display = "block";
}

const degerInput = document.getElementById("deger");
const donusumTipiSelect = document.getElementById("donusumTipi");
const sonucDegeri = document.getElementById("sonucDegeri");
const sonucDetay = document.getElementById("sonucDetay");
const hesaplaBtn = document.getElementById("hesaplaBtn");

const donusumler = {
  c2f: {
    from: "C",
    to: "F",
    calc: (deger) => (deger * 9) / 5 + 32,
  },
  m2km: {
    from: "m",
    to: "km",
    calc: (deger) => deger / 1000,
  },
  kg2g: {
    from: "kg",
    to: "g",
    calc: (deger) => deger * 1000,
  },
};

function formatSayi(sayi, tip) {
  if (tip === "kg2g") {
    return sayi.toLocaleString("tr-TR", { maximumFractionDigits: 2 });
  }

  return sayi.toLocaleString("tr-TR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

function donustur() {
  const deger = parseFloat(degerInput.value);
  const tip = donusumTipiSelect.value;

  if (isNaN(deger)) {
    alert("Lutfen sayisal bir deger giriniz.");
    degerInput.focus();
    return;
  }

  const secim = donusumler[tip];
  if (!secim) {
    alert("Gecersiz donusum tipi secildi.");
    return;
  }

  const sonuc = secim.calc(deger);
  const yazdirilacakSonuc = formatSayi(sonuc, tip);

  sonucDegeri.innerText = yazdirilacakSonuc;
  sonucDetay.innerText =
    deger.toLocaleString("tr-TR") +
    " " +
    secim.from +
    " = " +
    yazdirilacakSonuc +
    " " +
    secim.to;

  document.getElementById("birimSonucAlani").style.display = "block";
}

if (hesaplaBtn) {
  hesaplaBtn.addEventListener("click", donustur);
  degerInput.addEventListener("input", donustur);
  donusumTipiSelect.addEventListener("change", donustur);
  donustur();
}

if (hesaplaBtn) {
  hesaplaBtn.addEventListener("click", donustur);
  degerInput.addEventListener("input", donustur);
  donusumTipiSelect.addEventListener("change", donustur);
  donustur();
}
