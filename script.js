// Ambil elemen yang akan digunakan
const cover = document.getElementById("cover");
const openButton = document.getElementById("open-invitation");
const invitationContent = document.getElementById("invitation-content");
const navbar = document.getElementById("main-nav");
const music = document.getElementById("bg-music");
const musicButton = document.getElementById("music-toggle");

// Buka undangan saat tombol pada sampul ditekan
openButton.addEventListener("click", async () => {
  cover.classList.add("cover-closing");
  cover.classList.add("d-none");
  invitationContent.classList.remove("d-none");
  navbar.classList.remove("d-none");
  musicButton.classList.remove("d-none");

  // Putar musik otomatis
  try {
    await music.play();
    musicIcon.className = "bi bi-pause-fill";
    musicButton.setAttribute("aria-label", "Jeda musik");
  } catch (error) {
    console.info("Musik belum dapat diputar. Tekan tombol musik untuk mencoba lagi.");
  }
  revealVisibleElements();
});

// Putar atau jeda musik
const musicIcon = document.getElementById("music-icon");

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicIcon.className = "bi bi-pause-fill";
      musicButton.setAttribute("aria-label", "Jeda musik");
    } catch (error) {
      alert("Musik belum dapat diputar. Pastikan file assets/musik.mp3 tersedia.");
    }
  } else {
    music.pause();
    musicIcon.className = "bi bi-play-fill";
    musicButton.setAttribute("aria-label", "Putar musik");
  }
});

// Animasi load elemen
const revealElements = document.querySelectorAll(".reveal");

function revealVisibleElements() {
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("show"));
    return;
  }

  if (window.revealObserver) {
    revealElements.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight) {
        element.classList.add("show");
      }
    });
  }
}

if ("IntersectionObserver" in window) {
  window.revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach((element) => window.revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("show"));
}