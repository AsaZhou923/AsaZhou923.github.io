const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function updatePointer(event) {
  root.style.setProperty("--cursor-x", `${event.clientX}px`);
  root.style.setProperty("--cursor-y", `${event.clientY}px`);
}

if (!reduceMotion) {
  window.addEventListener("pointermove", updatePointer, { passive: true });
}

const revealItems = document.querySelectorAll("[data-reveal]");
let revealObserver;

if ("IntersectionObserver" in window) {
  revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 40, 280)}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const navLinks = [...document.querySelectorAll(".main-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.35, 0.7] }
  );

  sections.forEach((section) => navObserver.observe(section));
}

const localTime = document.querySelector("#local-time");
function tickClock() {
  if (!localTime) {
    return;
  }

  localTime.textContent = new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tokyo"
  }).format(new Date());
}

tickClock();
setInterval(tickClock, 30_000);

const searchInput = document.querySelector("#post-search");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const postCards = [...document.querySelectorAll("[data-post-card]")];
const emptyState = document.querySelector("#empty-state");
let currentFilter = "all";

function normalize(value) {
  return value.trim().toLowerCase();
}

function applyPostFilters() {
  const query = normalize(searchInput?.value || "");
  let visibleCount = 0;

  for (const card of postCards) {
    const text = normalize(card.textContent || "");
    const tags = card.dataset.tags || "";
    const matchesQuery = !query || text.includes(query) || normalize(tags).includes(query);
    const matchesFilter = currentFilter === "all" || tags.includes(currentFilter);
    const visible = matchesQuery && matchesFilter;

    card.hidden = !visible;
    if (visible) {
      visibleCount += 1;
    }
  }

  if (emptyState) {
    emptyState.hidden = visibleCount > 0;
  }
}

searchInput?.addEventListener("input", applyPostFilters);
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter || "all";
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    applyPostFilters();
  });
});

const canvas = document.querySelector("#constellation");
const context = canvas?.getContext("2d");
const particles = [];

function resizeCanvas() {
  if (!canvas || !context) {
    return;
  }

  const rect = canvas.getBoundingClientRect();
  const scale = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(rect.width * scale);
  canvas.height = Math.floor(rect.height * scale);
  context.setTransform(scale, 0, 0, scale, 0, 0);
}

function seedParticles() {
  if (!canvas) {
    return;
  }

  particles.length = 0;
  const rect = canvas.getBoundingClientRect();
  const count = Math.max(34, Math.min(82, Math.floor(rect.width / 10)));

  for (let index = 0; index < count; index += 1) {
    particles.push({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      size: Math.random() * 1.6 + 0.6,
      hue: Math.random() > 0.78 ? "215, 166, 90" : "120, 230, 210"
    });
  }
}

function drawConstellation() {
  if (!canvas || !context) {
    return;
  }

  const rect = canvas.getBoundingClientRect();
  context.clearRect(0, 0, rect.width, rect.height);

  for (const particle of particles) {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > rect.width) {
      particle.vx *= -1;
    }
    if (particle.y < 0 || particle.y > rect.height) {
      particle.vy *= -1;
    }

    context.beginPath();
    context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    context.fillStyle = `rgba(${particle.hue}, 0.72)`;
    context.fill();
  }

  for (let a = 0; a < particles.length; a += 1) {
    for (let b = a + 1; b < particles.length; b += 1) {
      const first = particles[a];
      const second = particles[b];
      const distance = Math.hypot(first.x - second.x, first.y - second.y);

      if (distance < 112) {
        context.beginPath();
        context.moveTo(first.x, first.y);
        context.lineTo(second.x, second.y);
        context.strokeStyle = `rgba(120, 230, 210, ${0.16 * (1 - distance / 112)})`;
        context.lineWidth = 1;
        context.stroke();
      }
    }
  }

  if (!reduceMotion) {
    requestAnimationFrame(drawConstellation);
  }
}

if (canvas && context) {
  resizeCanvas();
  seedParticles();
  drawConstellation();
  window.addEventListener(
    "resize",
    () => {
      resizeCanvas();
      seedParticles();
    },
    { passive: true }
  );
}
