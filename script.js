// Elemen utama
const body = document.body;
const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const menuLinks = document.querySelectorAll(".menu-link");

// Dark mode
function setTheme(mode) {
  if (mode === "dark") {
    body.classList.add("dark");
    themeToggle.textContent = "☀️";
  } else {
    body.classList.remove("dark");
    themeToggle.textContent = "🌙";
  }
  localStorage.setItem("theme", mode);
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  setTheme("dark");
} else {
  setTheme("light");
}

themeToggle.addEventListener("click", function () {
  setTheme(body.classList.contains("dark") ? "light" : "dark");
});

// Menu mobile
menuToggle.addEventListener("click", function () {
  menu.classList.toggle("open");
});

menuLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("open");
  });
});

// Menu aktif saat scroll
const sections = document.querySelectorAll("main section");

window.addEventListener("scroll", function () {
  let current = "home";
  sections.forEach(function (section) {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute("id");
    }
  });
  menuLinks.forEach(function (link) {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Progress bar skill
const barFills = document.querySelectorAll(".bar-fill");

const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.level + "%";
      }
    });
  },
  { threshold: 0.4 }
);

barFills.forEach(function (bar) {
  observer.observe(bar);
});

// Foto profil cadangan jika foto.jpg tidak ditemukan
const foto = document.getElementById("foto-profil");
foto.addEventListener("error", function () {
  const placeholder = document.createElement("div");
  placeholder.className = "photo-placeholder";
  placeholder.textContent = "SL";
  foto.replaceWith(placeholder);
});

// Validasi form
const form = document.getElementById("contact-form");
const inputNama = document.getElementById("nama");
const inputEmail = document.getElementById("email");
const inputPesan = document.getElementById("pesan");
const successMessage = document.getElementById("success-message");
const hasilForm = document.getElementById("hasil-form");

function showError(input, errorId, message) {
  input.classList.add("invalid");
  document.getElementById(errorId).textContent = message;
}

function clearError(input, errorId) {
  input.classList.remove("invalid");
  document.getElementById(errorId).textContent = "";
}

function isEmailValid(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return pattern.test(email);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  successMessage.textContent = "";

  const nama = inputNama.value.trim();
  const email = inputEmail.value.trim();
  const pesan = inputPesan.value.trim();
  let valid = true;

  if (nama === "") {
    showError(inputNama, "error-nama", "Nama tidak boleh kosong.");
    valid = false;
  } else {
    clearError(inputNama, "error-nama");
  }

  if (email === "") {
    showError(inputEmail, "error-email", "Email tidak boleh kosong.");
    valid = false;
  } else if (!isEmailValid(email)) {
    showError(inputEmail, "error-email", "Format email tidak valid. Contoh: nama@email.com");
    valid = false;
  } else {
    clearError(inputEmail, "error-email");
  }

  if (pesan === "") {
    showError(inputPesan, "error-pesan", "Pesan tidak boleh kosong.");
    valid = false;
  } else {
    clearError(inputPesan, "error-pesan");
  }

  if (!valid) {
    hasilForm.classList.add("hidden");
    return;
  }

  successMessage.textContent = "Pesan berhasil dikirim. Terima kasih, " + nama + "!";

  document.getElementById("out-nama").textContent = nama;
  document.getElementById("out-email").textContent = email;
  document.getElementById("out-pesan").textContent = pesan;
  hasilForm.classList.remove("hidden");

  form.reset();
});