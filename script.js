// Background music
const musicPlayer = document.getElementById("music-player");
const bgMusic = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");

bgMusic.volume = 0.45;

function setPlayingState(isPlaying) {
  musicPlayer.classList.toggle("is-playing", isPlaying);
  musicToggle.setAttribute(
    "aria-label",
    isPlaying ? "Pause background music" : "Play background music"
  );
}

async function toggleMusic() {
  try {
    if (bgMusic.paused) {
      await bgMusic.play();
      setPlayingState(true);
    } else {
      bgMusic.pause();
      setPlayingState(false);
    }
  } catch {
    setPlayingState(false);
  }
}

musicToggle.addEventListener("click", toggleMusic);

// Gerbera flower garden
const gerberaGarden = document.querySelector(".gerbera-garden");
const gerberaColors = [
  { petals: "#ff9eb5", inner: "#ffb8ca", center: "#5c3d2e" },
  { petals: "#ff8a7a", inner: "#ffa898", center: "#6b4226" },
  { petals: "#ffb997", inner: "#ffd0b0", center: "#5c3d2e" },
  { petals: "#ffd166", inner: "#ffe08a", center: "#6b4e2e" },
  { petals: "#ffc8d8", inner: "#ffe0ea", center: "#5c3d2e" },
  { petals: "#ffab73", inner: "#ffc299", center: "#6b4226" },
  { petals: "#fff0f5", inner: "#ffe8ef", center: "#5c3d2e" },
];

function createGerberaSVG(petalColor, innerColor, centerColor, size) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);

  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const gradId = `center-${Math.random().toString(36).slice(2, 8)}`;
  const grad = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
  grad.setAttribute("id", gradId);

  const stops = [
    ["0%", "#8b5a3c"],
    ["60%", centerColor],
    ["100%", "#3d2518"],
  ];
  stops.forEach(([offset, color]) => {
    const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop.setAttribute("offset", offset);
    stop.setAttribute("stop-color", color);
    grad.appendChild(stop);
  });

  defs.appendChild(grad);
  svg.appendChild(defs);

  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

  for (let i = 0; i < 14; i++) {
    const petal = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    petal.setAttribute("cx", "50");
    petal.setAttribute("cy", "18");
    petal.setAttribute("rx", "9");
    petal.setAttribute("ry", "20");
    petal.setAttribute("fill", petalColor);
    petal.setAttribute("transform", `rotate(${i * (360 / 14)} 50 50)`);
    petal.classList.add("gerbera-petal");
    group.appendChild(petal);
  }

  for (let i = 0; i < 10; i++) {
    const petal = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    petal.setAttribute("cx", "50");
    petal.setAttribute("cy", "24");
    petal.setAttribute("rx", "7");
    petal.setAttribute("ry", "14");
    petal.setAttribute("fill", innerColor);
    petal.setAttribute("transform", `rotate(${i * 36 + 18} 50 50)`);
    group.appendChild(petal);
  }

  const center = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  center.setAttribute("cx", "50");
  center.setAttribute("cy", "50");
  center.setAttribute("r", "13");
  center.setAttribute("fill", `url(#${gradId})`);
  group.appendChild(center);

  for (let i = 0; i < 18; i++) {
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const angle = (i / 18) * Math.PI * 2;
    dot.setAttribute("cx", String(50 + Math.cos(angle) * 7));
    dot.setAttribute("cy", String(50 + Math.sin(angle) * 7));
    dot.setAttribute("r", "1.2");
    dot.setAttribute("fill", "#2d1810");
    dot.setAttribute("opacity", "0.5");
    group.appendChild(dot);
  }

  svg.appendChild(group);
  return svg;
}

function placeGerbera(options) {
  const { x, y, size, type, delay = 0, duration = 18, driftX = 0 } = options;
  const colors = gerberaColors[Math.floor(Math.random() * gerberaColors.length)];
  const flower = document.createElement("div");
  flower.className = `gerbera gerbera--${type}`;
  flower.style.left = `${x}%`;
  flower.style.top = `${y}%`;
  flower.style.setProperty("--sway-duration", `${3.5 + Math.random() * 3}s`);
  flower.style.setProperty("--sway-delay", `${delay}s`);
  flower.style.setProperty("--float-duration", `${duration}s`);
  flower.style.setProperty("--float-delay", `${delay}s`);
  flower.style.setProperty("--drift-x", `${driftX}px`);
  flower.appendChild(createGerberaSVG(colors.petals, colors.inner, colors.center, size));
  gerberaGarden.appendChild(flower);
  return flower;
}

function initGerberaGarden() {
  const anchors = [
    { x: 4, y: 72, size: 72, type: "bloom", delay: 0.1 },
    { x: 12, y: 82, size: 48, type: "bloom", delay: 0.3 },
    { x: 88, y: 68, size: 80, type: "bloom", delay: 0.2 },
    { x: 92, y: 85, size: 52, type: "bloom", delay: 0.5 },
    { x: 78, y: 78, size: 44, type: "bloom", delay: 0.4 },
    { x: 22, y: 88, size: 38, type: "bloom", delay: 0.6 },
    { x: 6, y: 38, size: 56, type: "sway", delay: 0.2 },
    { x: 90, y: 32, size: 60, type: "sway", delay: 0.8 },
    { x: 2, y: 55, size: 42, type: "sway", delay: 1.1 },
    { x: 95, y: 52, size: 46, type: "sway", delay: 0.6 },
  ];

  anchors.forEach((cfg) => placeGerbera(cfg));

  for (let i = 0; i < 14; i++) {
    const sparkle = document.createElement("span");
    sparkle.className = "hero-sparkle";
    sparkle.style.left = `${8 + Math.random() * 84}%`;
    sparkle.style.top = `${10 + Math.random() * 80}%`;
    sparkle.style.animationDelay = `${Math.random() * 3}s`;
    sparkle.style.width = sparkle.style.height = `${4 + Math.random() * 5}px`;
    gerberaGarden.appendChild(sparkle);
  }
}

function spawnFloatingGerbera() {
  placeGerbera({
    x: 5 + Math.random() * 90,
    y: 100,
    size: 36 + Math.random() * 32,
    type: "float",
    delay: 0,
    duration: 14 + Math.random() * 12,
    driftX: -60 + Math.random() * 120,
  });
}

initGerberaGarden();
setInterval(spawnFloatingGerbera, 2800);
for (let i = 0; i < 4; i++) setTimeout(spawnFloatingGerbera, i * 700);

// Floating hearts
const heartsBg = document.querySelector(".hearts-bg");const heartChars = ["♥", "♡", "💕", "✦"];

function spawnHeart() {
  const heart = document.createElement("span");
  heart.className = "heart-float";
  heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${0.8 + Math.random() * 1.2}rem`;
  heart.style.animationDuration = `${8 + Math.random() * 10}s`;
  heartsBg.appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove());
}

setInterval(spawnHeart, 900);
for (let i = 0; i < 6; i++) setTimeout(spawnHeart, i * 300);

// Letter reveal on scroll
const letterParagraphs = document.querySelectorAll(".letter-body p");
const letterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const paragraphs = [...letterParagraphs];
        const index = paragraphs.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add("visible"), index * 120);
        letterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

letterParagraphs.forEach((p) => letterObserver.observe(p));

// Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("figcaption");
const galleryItems = [...document.querySelectorAll(".gallery-item")];
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const item = galleryItems[index];
  const img = item.querySelector("img");
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = item.dataset.caption || "";
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  openLightbox(currentIndex);
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  openLightbox(currentIndex);
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => openLightbox(index));
});

lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.querySelector(".lightbox-prev").addEventListener("click", showPrev);
lightbox.querySelector(".lightbox-next").addEventListener("click", showNext);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (lightbox.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showPrev();
  if (e.key === "ArrowRight") showNext();
});

// Gentle fade-in for gallery items
const galleryObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        galleryObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

galleryItems.forEach((item, i) => {
  item.style.opacity = "0";
  item.style.transform = "translateY(24px)";
  item.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s, box-shadow 0.35s ease, scale 0.35s ease`;
  galleryObserver.observe(item);
});
