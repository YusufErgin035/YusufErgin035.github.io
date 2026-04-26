// Hafta 7 Ödev - JavaScript (Sayfa Spesifik)

console.log("hafta7.js yukleniyor...");

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM yuklendi, script calisiyyor...");

  const form = document.getElementById("registrationForm");
  const navThemeInputs = document.querySelectorAll('input[name="navTheme"]');
  const fullnameInput = document.getElementById("fullname");
  const emailInput = document.getElementById("email");
  const workshopSelect = document.getElementById("workshop");
  const warningsDiv = document.getElementById("warnings");
  const warningList = document.getElementById("warningList");
  const resultArea = document.getElementById("resultArea");
  const resultContent = document.getElementById("resultContent");
  const notesInput = document.getElementById("notes");

  // 1. Tema Degistirme Fonksiyonu
  function changeTheme(theme) {
    if (theme === "dark") {
      document.documentElement.style.colorScheme = "dark";
      document.body.style.backgroundColor = "#1a1a2e";
      document.body.style.color = "#e4e4e4";

      const main = document.querySelector("main");
      if (main) {
        main.style.backgroundColor = "#1a1a2e";
      }

      const navbar = document.querySelector(".navbar");
      if (navbar) {
        navbar.classList.remove("navbar-light");
        navbar.classList.add("navbar-dark");
        navbar.style.backgroundColor = "#0f0f1e";
      }

      document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((heading) => {
        heading.style.color = "#ffffff";
      });

      document.querySelectorAll("p").forEach((para) => {
        if (para.classList.contains("text-secondary")) {
          para.style.color = "#a0a0a0";
        } else {
          para.style.color = "#e4e4e4";
        }
      });

      document.querySelectorAll(".card").forEach((card) => {
        card.style.backgroundColor = "#16213e";
        card.style.color = "#e4e4e4";
        card.style.borderColor = "#2d4563";
      });

      document.querySelectorAll(".card-header").forEach((header) => {
        const bgClass = header.className;
        if (bgClass.includes("bg-primary")) {
          header.style.backgroundColor = "#1e5ba8";
        } else if (bgClass.includes("bg-success")) {
          header.style.backgroundColor = "#1a6c4c";
        } else if (bgClass.includes("bg-info")) {
          header.style.backgroundColor = "#0d8299";
        }
      });

      document
        .querySelectorAll(".form-control, .form-select")
        .forEach((input) => {
          input.style.backgroundColor = "#1e1e2e";
          input.style.color = "#e4e4e4";
          input.style.borderColor = "#3d3d5c";
        });

      document.querySelectorAll(".form-label").forEach((label) => {
        label.style.color = "#ffffff";
      });

      document.querySelectorAll(".alert").forEach((alert) => {
        alert.style.backgroundColor = "#1e1e2e";
        alert.style.color = "#e4e4e4";
        alert.style.borderColor = "#3d3d5c";

        const heading = alert.querySelector(".alert-heading, h5, h6");
        if (heading) {
          heading.style.color = "#ffffff";
        }
      });

      document.querySelectorAll(".list-group-item").forEach((item) => {
        item.style.backgroundColor = "#16213e";
        item.style.color = "#e4e4e4";
        item.style.borderColor = "#2d4563";
      });

      document.querySelectorAll(".btn-light").forEach((btn) => {
        btn.style.backgroundColor = "#2d2d44";
        btn.style.color = "#ffffff";
        btn.style.borderColor = "#3d3d5c";
      });

      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.style.colorScheme = "light";
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#212529";

      const main = document.querySelector("main");
      if (main) {
        main.style.backgroundColor = "#ffffff";
      }

      const navbar = document.querySelector(".navbar");
      if (navbar) {
        navbar.classList.add("navbar-dark");
        navbar.classList.remove("navbar-light");
        navbar.style.backgroundColor = "#212529";
      }

      document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((heading) => {
        heading.style.color = "#212529";
      });

      document.querySelectorAll("p").forEach((para) => {
        if (para.classList.contains("text-secondary")) {
          para.style.color = "#6c757d";
        } else {
          para.style.color = "#212529";
        }
      });

      document.querySelectorAll(".card").forEach((card) => {
        card.style.backgroundColor = "#ffffff";
        card.style.color = "#212529";
        card.style.borderColor = "#dee2e6";
      });

      document.querySelectorAll(".card-header").forEach((header) => {
        if (!header.className.includes("bg-")) {
          header.style.backgroundColor = "#f8f9fa";
        }
      });

      document
        .querySelectorAll(".form-control, .form-select")
        .forEach((input) => {
          input.style.backgroundColor = "#ffffff";
          input.style.color = "#212529";
          input.style.borderColor = "#dee2e6";
        });

      document.querySelectorAll(".form-label").forEach((label) => {
        label.style.color = "#212529";
      });

      document.querySelectorAll(".alert").forEach((alert) => {
        alert.style.backgroundColor = "transparent";
        alert.style.color = "#212529";
      });

      document.querySelectorAll(".list-group-item").forEach((item) => {
        item.style.backgroundColor = "#ffffff";
        item.style.color = "#212529";
        item.style.borderColor = "#dee2e6";
      });

      document.querySelectorAll(".btn-light").forEach((btn) => {
        btn.style.backgroundColor = "#f8f9fa";
        btn.style.color = "#212529";
        btn.style.borderColor = "#dee2e6";
      });

      localStorage.setItem("theme", "light");
    }
  }

  const savedTheme = localStorage.getItem("theme") || "light";
  changeTheme(savedTheme);
  document.querySelector(
    `input[name="navTheme"][value="${savedTheme}"]`,
  ).checked = true;

  navThemeInputs.forEach((input) => {
    input.addEventListener("change", function () {
      changeTheme(this.value);
    });
  });

  // 2. Form Validasyonu
  function validateForm() {
    const warnings = [];

    if (fullnameInput.value.trim() === "") {
      warnings.push("Ad Soyad bos birakilamaz");
    } else if (fullnameInput.value.trim().length < 3) {
      warnings.push("Ad Soyad en az 3 karakter olmalidir");
    }

    if (emailInput.value.trim() === "") {
      warnings.push("E-posta adresi bos birakilamaz");
    } else if (!emailInput.value.includes("@")) {
      warnings.push("Gecerli bir e-posta adresi girin");
    }

    if (workshopSelect.value === "") {
      warnings.push("Lutfen bir atolye seciniz");
    }

    const agreeCheckbox = document.getElementById("agree");
    if (!agreeCheckbox.checked) {
      warnings.push("Sartlari kabul etmelisiniz");
    }

    return warnings;
  }

  function showWarnings(warnings) {
    if (warnings.length > 0) {
      warningList.innerHTML = "";
      warnings.forEach((warning) => {
        const li = document.createElement("li");
        li.textContent = warning;
        warningList.appendChild(li);
      });
      warningsDiv.classList.remove("d-none");
    } else {
      warningsDiv.classList.add("d-none");
    }
  }

  // 3. Form Gonderimi
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const warnings = validateForm();
    showWarnings(warnings);

    if (warnings.length === 0) {
      displayResult();
      document
        .getElementById("result-section")
        .scrollIntoView({ behavior: "smooth" });
    }
  });

  // 4. Sonuc Sayfasi
  function displayResult() {
    const workshopLabels = {
      bootstrap: "Bootstrap Temelleri",
      javascript: "JavaScript Etkilesimleri",
      responsive: "Responsive Tasarim",
    };

    const currentTheme = document.querySelector(
      'input[name="navTheme"]:checked',
    ).value;

    const notesDisplay = notesInput.value.trim()
      ? `<li class="list-group-item"><strong>Notlar:</strong> ${notesInput.value}</li>`
      : "";

    resultContent.innerHTML = `
      <ul class="list-group list-group-flush mt-3">
        <li class="list-group-item"><strong>Ad Soyad:</strong> ${fullnameInput.value}</li>
        <li class="list-group-item"><strong>E-posta:</strong> ${emailInput.value}</li>
        <li class="list-group-item"><strong>Secilen Atolye:</strong> ${
          workshopLabels[workshopSelect.value]
        }</li>
        <li class="list-group-item"><strong>Basvuru Tarihi:</strong> ${new Date().toLocaleDateString("tr-TR")}</li>
        ${notesDisplay}
      </ul>
      <div class="alert alert-success mt-3">
        Basvurunuz basariyla kaydedilmistir. En kisa zamanda sizinle iletisime gececegiz.
      </div>
    `;

    resultArea.classList.remove("d-none");
  }

  // 5. Real-time validation
  [fullnameInput, emailInput, workshopSelect].forEach((input) => {
    input.addEventListener("input", function () {
      if (warningsDiv.classList.contains("d-none") === false) {
        const warnings = validateForm();
        showWarnings(warnings);
      }
    });
  });

  document.getElementById("agree").addEventListener("change", function () {
    if (warningsDiv.classList.contains("d-none") === false) {
      const warnings = validateForm();
      showWarnings(warnings);
    }
  });
});
