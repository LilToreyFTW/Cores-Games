const gamerProfiles = [
  {
    name: "NovaHex",
    age: 23,
    bio: "Valorant aimer with streamer energy and elite post-match debriefs.",
    games: ["Valorant", "Fortnite", "Marvel Rivals"],
    vibe: "Competitive + chaotic fun",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "PixelRush",
    age: 21,
    bio: "Fast-talking support main who keeps comms clean and vibes high.",
    games: ["Overwatch 2", "Apex Legends", "The Finals"],
    vibe: "Camera on, always down for a rematch",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "AstraVibe",
    age: 24,
    bio: "Late-night Warzone duo hunter with a neon setup and better playlists.",
    games: ["Warzone", "Helldivers 2", "GTA Online"],
    vibe: "Social first, sweaty second",
    image:
      "https://images.unsplash.com/photo-1603481546579-65d935ba9cdd?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "LunaXP",
    age: 22,
    bio: "Co-op queen who loves puzzle games, horror nights, and iconic reactions.",
    games: ["Phasmophobia", "It Takes Two", "Lethal Company"],
    vibe: "Funny, flirty, and clutch",
    image:
      "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "DriftByte",
    age: 26,
    bio: "Sim racer by day, ranked grinder by night, voice chat comedian always.",
    games: ["Rocket League", "EA FC", "Gran Turismo"],
    vibe: "Trash talk with consent",
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&q=80",
  },
];

const videoChatProfiles = [
  {
    name: "AstraVibe",
    meta: "Warzone duo hunter - camera on",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    opener: "Yo, what are you queuing tonight?",
  },
  {
    name: "PixelRush",
    meta: "Overwatch support main - chill energy",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
    opener: "I can lock mercy, but only if your comms are elite.",
  },
  {
    name: "LunaXP",
    meta: "Co-op chaos expert - horror nights",
    image:
      "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=900&q=80",
    opener: "Pick one: scary games or sweaty games?",
  },
];

const swipeStack = document.getElementById("swipe-stack");
const matchLog = document.getElementById("match-log");
const emptyState = document.getElementById("empty-state");
const acceptBtn = document.getElementById("accept-btn");
const rejectBtn = document.getElementById("reject-btn");
const resetDeckBtn = document.getElementById("reset-deck-btn");
const nextChatBtn = document.getElementById("next-chat-btn");
const remoteVideoImage = document.getElementById("remote-video-image");
const remoteVideoName = document.getElementById("remote-video-name");
const remoteVideoMeta = document.getElementById("remote-video-meta");
const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

let deck = [...gamerProfiles];
let currentVideoIndex = 0;
let activeChatProfile = videoChatProfiles[currentVideoIndex];

function renderDeck() {
  swipeStack.innerHTML = "";
  emptyState.classList.toggle("hidden", deck.length > 0);

  deck.forEach((profile, index) => {
    const card = document.createElement("article");
    card.className = "swipe-card";
    card.style.backgroundImage = `url('${profile.image}')`;
    card.style.zIndex = String(index + 1);
    card.style.transform = `scale(${1 - (deck.length - index - 1) * 0.04}) translateY(${(deck.length - index - 1) * 10}px)`;
    card.dataset.index = String(index);

    card.innerHTML = `
      <div class="card-stamp stamp-nope">PASS</div>
      <div class="card-stamp stamp-like">MATCH</div>
      <div class="swipe-card-content">
        <span class="swipe-badge">${profile.games[0]} Main</span>
        <h3>${profile.name}, ${profile.age}</h3>
        <p>${profile.bio}</p>
        <p><strong>Vibe:</strong> ${profile.vibe}</p>
        <div class="swipe-meta">
          ${profile.games.map((game) => `<span class="swipe-tag">${game}</span>`).join("")}
        </div>
      </div>
    `;

    addSwipeHandlers(card, profile);
    swipeStack.appendChild(card);
  });
}

function addSwipeHandlers(card, profile) {
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  const likeStamp = card.querySelector(".stamp-like");
  const nopeStamp = card.querySelector(".stamp-nope");

  const onPointerMove = (event) => {
    if (!isDragging) return;
    currentX = event.clientX - startX;
    const rotate = currentX * 0.05;
    card.style.transition = "none";
    card.style.transform = `translateX(${currentX}px) translateY(${Math.abs(currentX) * 0.05}px) rotate(${rotate}deg)`;

    const opacity = Math.min(Math.abs(currentX) / 120, 1);
    likeStamp.style.opacity = currentX > 0 ? opacity : 0;
    nopeStamp.style.opacity = currentX < 0 ? opacity : 0;
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    isDragging = false;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);

    const threshold = 110;
    if (currentX > threshold) {
      swipeCard(card, profile, "right");
    } else if (currentX < -threshold) {
      swipeCard(card, profile, "left");
    } else {
      card.style.transition = "transform 0.28s ease";
      card.style.transform = "";
      likeStamp.style.opacity = 0;
      nopeStamp.style.opacity = 0;
      requestAnimationFrame(renderDeck);
    }
  };

  card.addEventListener("pointerdown", (event) => {
    if (Number(card.dataset.index) !== deck.length - 1) return;
    isDragging = true;
    startX = event.clientX;
    currentX = 0;
    card.setPointerCapture(event.pointerId);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  });
}

function swipeCard(card, profile, direction) {
  card.style.transition = "transform 0.32s ease, opacity 0.32s ease";
  card.style.opacity = "0";
  card.style.transform =
    direction === "right"
      ? "translateX(140%) rotate(22deg)"
      : "translateX(-140%) rotate(-22deg)";

  addMatchLog(profile, direction);
  deck = deck.filter((item) => item.name !== profile.name);

  setTimeout(() => {
    renderDeck();
  }, 240);
}

function addMatchLog(profile, direction) {
  const item = document.createElement("li");
  item.className = "match-log-item";
  item.innerHTML = `
    <span>${direction === "right" ? "Matched with" : "Passed on"} <strong>${profile.name}</strong></span>
    <span>${direction === "right" ? "Squad ready" : "Keep scrolling"}</span>
  `;
  matchLog.prepend(item);

  while (matchLog.children.length > 4) {
    matchLog.removeChild(matchLog.lastElementChild);
  }
}

function triggerTopCard(direction) {
  const cards = swipeStack.querySelectorAll(".swipe-card");
  const topCard = cards[cards.length - 1];
  if (!topCard) return;

  const profile = deck[deck.length - 1];
  swipeCard(topCard, profile, direction);
}

function setActiveVideoProfile(profile) {
  activeChatProfile = profile;
  remoteVideoImage.src = profile.image;
  remoteVideoImage.alt = `${profile.name} video chat placeholder`;
  remoteVideoName.textContent = profile.name;
  remoteVideoMeta.textContent = profile.meta;
  chatMessages.innerHTML = "";
  appendChatMessage(profile.opener, "remote");
}

function appendChatMessage(message, sender) {
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${sender}`;
  bubble.textContent = message;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function cycleVideoChat() {
  currentVideoIndex = (currentVideoIndex + 1) % videoChatProfiles.length;
  setActiveVideoProfile(videoChatProfiles[currentVideoIndex]);
}

function setupParticles() {
  const canvas = document.getElementById("particle-canvas");
  const context = canvas.getContext("2d");
  const particles = [];
  const particleCount = 60;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const createParticle = () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2.2 + 0.3,
    speedX: (Math.random() - 0.5) * 0.45,
    speedY: (Math.random() - 0.5) * 0.45,
    color: Math.random() > 0.5 ? "55, 246, 255" : "255, 79, 216",
  });

  const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

      context.beginPath();
      context.fillStyle = `rgba(${particle.color}, 0.7)`;
      context.shadowBlur = 18;
      context.shadowColor = `rgba(${particle.color}, 0.8)`;
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    });

    requestAnimationFrame(draw);
  };

  resize();
  for (let index = 0; index < particleCount; index += 1) {
    particles.push(createParticle());
  }

  window.addEventListener("resize", resize);
  draw();
}

acceptBtn.addEventListener("click", () => triggerTopCard("right"));
rejectBtn.addEventListener("click", () => triggerTopCard("left"));

if (resetDeckBtn) {
  document.addEventListener("click", (event) => {
    if (event.target.id === "reset-deck-btn") {
      deck = [...gamerProfiles];
      renderDeck();
    }
  });
}

nextChatBtn.addEventListener("click", cycleVideoChat);

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;

  appendChatMessage(message, "self");
  chatInput.value = "";

  window.setTimeout(() => {
    appendChatMessage(`${activeChatProfile.name}: ${activeChatProfile.opener}`, "remote");
  }, 700);
});

menuToggle.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

renderDeck();
setActiveVideoProfile(activeChatProfile);
setupParticles();
