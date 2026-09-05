/* ==========================================================
   PÁGINA ROMÁNTICA - SCRIPT INTERACTIVO
   ========================================================== */

// --- CONFIGURACIÓN PERSONALIZABLE ---
// Fecha en que comenzó su historia: 10 de Enero (Año 2026 por defecto, adaptable si fue antes)
// Nota: En JavaScript los meses van de 0 a 11 (Enero = 0)
const FECHA_INICIO = new Date(2026, 0, 10, 0, 0, 0); // 10 de Enero de 2026

document.addEventListener('DOMContentLoaded', () => {
  initHeartCanvas();
  initEnvelope();
  initLoveCounter();
  initFirstDateMap();
  initLoveMeter();
  initSurpriseQuotes();
  initModalAndPromises();
  initRomanticMusic();
  initClickHearts();
  cleanServiceWorkerCache();
});

/* ==========================================================
   1. CANVAS DE CORAZONES FLOTANTES DE FONDO
   ========================================================== */
function initHeartCanvas() {
  const canvas = document.getElementById('heartCanvas');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const hearts = [];
  const heartColors = [
    'rgba(239, 35, 60, 0.45)',
    'rgba(217, 4, 41, 0.40)',
    'rgba(255, 77, 109, 0.45)',
    'rgba(255, 117, 143, 0.50)',
    'rgba(255, 255, 255, 0.65)'
  ];

  class FloatingHeart {
    constructor() {
      this.reset();
      this.y = Math.random() * height; // dispersión inicial
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + 30;
      this.size = Math.random() * 16 + 10;
      this.speedY = Math.random() * 1.2 + 0.6;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.color = heartColors[Math.floor(Math.random() * heartColors.length)];
      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = (Math.random() - 0.5) * 0.02;
    }

    update() {
      this.y -= this.speedY;
      this.x += Math.sin(this.angle) * 0.5 + this.speedX;
      this.angle += this.angleSpeed;

      if (this.y < -40 || this.x < -40 || this.x > width + 40) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      
      const s = this.size / 15;
      // Dibujar forma de corazón con curvas Bezier
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-10 * s, -10 * s, -20 * s, 5 * s, 0, 20 * s);
      ctx.bezierCurveTo(20 * s, 5 * s, 10 * s, -10 * s, 0, 0);
      ctx.fill();
      ctx.restore();
    }
  }

  // Crear 45 corazones flotantes
  for (let i = 0; i < 45; i++) {
    hearts.push(new FloatingHeart());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    hearts.forEach(h => {
      h.update();
      h.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================
   2. CARTA Y SOBRE INTERACTIVO
   ========================================================== */
function initEnvelope() {
  const envelope = document.getElementById('envelope');
  const waxSeal = document.getElementById('waxSeal');
  const envelopeHint = document.getElementById('envelopeHint');
  const letter = document.getElementById('letter');

  let isOpen = false;

  function toggleEnvelope() {
    isOpen = !isOpen;
    if (isOpen) {
      envelope.classList.add('open');
      envelopeHint.innerHTML = '❤️ ¡Te amo con todo mi corazón! (Toca el sobre para cerrar) ❤️';
      // Lluvia de corazones festivos
      burstHeartsAtElement(waxSeal, 25);
    } else {
      envelope.classList.remove('open');
      envelopeHint.innerHTML = '✨ Haz clic en el sello para abrir la carta ✨';
    }
  }

  if (envelope) {
    envelope.addEventListener('click', (e) => {
      // Si la carta está abierta y tocan el texto para leer, no cerrar
      if (isOpen && e.target.closest('#letter')) {
        return;
      }
      toggleEnvelope();
    });
  }

  if (envelopeHint) {
    envelopeHint.style.cursor = 'pointer';
    envelopeHint.addEventListener('click', toggleEnvelope);
  }
}

/* ==========================================================
   3. CONTADOR DE TIEMPO JUNTOS
   ========================================================== */
function initLoveCounter() {
  const daysEl = document.getElementById('daysCount');
  const hoursEl = document.getElementById('hoursCount');
  const minutesEl = document.getElementById('minutesCount');
  const secondsEl = document.getElementById('secondsCount');

  function updateCounter() {
    const now = new Date();
    const diff = now - FECHA_INICIO;

    if (diff < 0) {
      // Si la fecha es futura
      daysEl.textContent = '0';
      hoursEl.textContent = '0';
      minutesEl.textContent = '0';
      secondsEl.textContent = '0';
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysEl.textContent = days.toLocaleString();
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
  }

  updateCounter();
  setInterval(updateCounter, 1000);
}

/* ==========================================================
   4. MEDIDOR DE AMOR INFINITO
   ========================================================== */
function initLoveMeter() {
  const boostBtn = document.getElementById('boostLoveBtn');
  const meterBar = document.getElementById('meterBar');
  const meterValue = document.getElementById('meterValue');
  const meterComment = document.getElementById('meterComment');

  const loveStages = [
    { percent: 100, text: '100%', comment: 'Amor certificado y con garantía de por vida ❤️' },
    { percent: 500, text: '500%', comment: '¡Mucho más de lo humanamente posible! 🥰' },
    { percent: 2500, text: '2,500%', comment: '¡Está subiendo la temperatura del corazón! 🔥' },
    { percent: 50000, text: '50,000%', comment: '¡Llega hasta la luna y da dos vueltas! 🌙✨' },
    { percent: 1000000, text: '1,000,000%', comment: '¡Más brillante que todas las galaxias juntas! 🌌' },
    { percent: 999999999, text: '∞ INFINITO %', comment: '💥 ¡ERROR! ¡No cabe tanto amor en este universo! TE AMO ❤️' }
  ];

  let currentStage = 0;

  if (boostBtn) {
    boostBtn.addEventListener('click', (e) => {
      currentStage++;
      if (currentStage >= loveStages.length) {
        currentStage = loveStages.length - 1;
      }

      const stage = loveStages[currentStage];
      meterValue.textContent = stage.text;
      meterComment.textContent = stage.comment;

      // Efecto de pulso en el texto
      meterValue.style.transform = 'scale(1.25)';
      setTimeout(() => {
        meterValue.style.transform = 'scale(1)';
      }, 200);

      // Explosión de corazones
      burstHeartsAtElement(boostBtn, currentStage === loveStages.length - 1 ? 40 : 15);
    });
  }
}

/* ==========================================================
   5. FRASES SORPRESA ALEATORIAS
   ========================================================== */
function initSurpriseQuotes() {
  const quotes = [
    "Te amo no solo por lo que eres, sino por lo que soy cuando estoy contigo.",
    "Si tuviera que elegir un solo lugar en el mundo para quedarme, siempre serían tus brazos.",
    "Eres mi pensamiento favorito al despertar y el último suspiro antes de dormir.",
    "No hay día ordinario si en él estás tú iluminándolo todo con tu sonrisa.",
    "Te quiero en las buenas, en las malas, en las risas y en los abrazos silenciosos.",
    "El amor no se cuenta en días, sino en todos los momentos mágicos que creamos juntos.",
    "Contigo aprendí que el amor de verdad es bonito, tranquilo y lleno de paz.",
    "No te quiero para un ratito, te quiero para siempre y mucho más allá.",
    "Haces que mi corazón lata con una emoción que jamás creí posible.",
    "Eres mi refugio favorito, mi risa favorita y mi persona favorita en todo el universo.",
    "Si volviera a nacer mil veces, las mil veces te buscaría y me volvería a enamorar de ti."
  ];

  const surpriseText = document.getElementById('surpriseText');
  const newSurpriseBtn = document.getElementById('newSurpriseBtn');

  let lastIndex = -1;

  if (newSurpriseBtn && surpriseText) {
    newSurpriseBtn.addEventListener('click', () => {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * quotes.length);
      } while (randomIndex === lastIndex);

      lastIndex = randomIndex;

      // Animación suave de transición
      surpriseText.style.opacity = '0';
      surpriseText.style.transform = 'translateY(8px)';

      setTimeout(() => {
        surpriseText.textContent = quotes[randomIndex];
        surpriseText.style.opacity = '1';
        surpriseText.style.transform = 'translateY(0)';
      }, 250);

      burstHeartsAtElement(newSurpriseBtn, 8);
    });
  }
}

/* ==========================================================
   6. MODAL Y PREGUNTAS FINALES
   ========================================================== */
function initModalAndPromises() {
  const btnYes = document.getElementById('btnYes');
  const btnYesAlso = document.getElementById('btnYesAlso');
  const loveModal = document.getElementById('loveModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  function openCelebration(e) {
    loveModal.classList.add('active');
    burstHeartsAtElement(e.target, 35);
  }

  if (btnYes) btnYes.addEventListener('click', openCelebration);
  if (btnYesAlso) btnYesAlso.addEventListener('click', openCelebration);

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      loveModal.classList.remove('active');
    });
  }

  // Cerrar al dar click fuera de la tarjeta
  if (loveModal) {
    loveModal.addEventListener('click', (e) => {
      if (e.target === loveModal) {
        loveModal.classList.remove('active');
      }
    });
  }
}

/* ==========================================================
   7. REPRODUCTOR DE MÚSICA ROMÁNTICA MULTICANCIONES
   ========================================================== */
function initRomanticMusic() {
  const musicWidget = document.getElementById('musicPlayerWidget');
  const musicToggle = document.getElementById('musicToggle');
  const playIcon = document.getElementById('playIcon');
  const currentTrackTitle = document.getElementById('currentTrackTitle');
  const nextTrackBtn = document.getElementById('nextTrackBtn');
  const trackChips = document.querySelectorAll('.track-chip');
  const audioElement = document.getElementById('audioElement');

  const tracks = [
    {
      id: 0,
      title: "Justin Bieber - One Less Lonely Girl",
      type: "audio"
    },
    {
      id: 1,
      title: "Melodía Dulce (Caja de Música)",
      type: "synth"
    }
  ];

  let currentTrackIdx = 0;
  let isPlaying = false;

  // Variables para la melodía sintetizada
  let audioCtx = null;
  let synthTimerId = null;
  const melody = [
    { note: 261.63, dur: 0.5 },
    { note: 329.63, dur: 0.5 },
    { note: 392.00, dur: 0.5 },
    { note: 523.25, dur: 0.8 },
    { note: 493.88, dur: 0.5 },
    { note: 392.00, dur: 0.5 },
    { note: 440.00, dur: 0.6 },
    { note: 523.25, dur: 0.5 },
    { note: 659.25, dur: 0.9 },
    { note: 587.33, dur: 0.5 },
    { note: 493.88, dur: 0.5 },
    { note: 392.00, dur: 0.7 }
  ];
  let synthNoteIdx = 0;

  function playTone(freq, duration) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration * 1.4);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration * 1.5);
    } catch (err) {
      console.warn('Audio playback error', err);
    }
  }

  function scheduleNextSynthNote() {
    if (!isPlaying || tracks[currentTrackIdx].type !== 'synth') return;
    const step = melody[synthNoteIdx];
    playTone(step.note, step.dur);
    synthNoteIdx = (synthNoteIdx + 1) % melody.length;
    synthTimerId = setTimeout(scheduleNextSynthNote, step.dur * 750);
  }

  function playCurrentTrack() {
    const track = tracks[currentTrackIdx];
    isPlaying = true;

    if (track.type === 'audio' && audioElement) {
      clearTimeout(synthTimerId);
      audioElement.play().catch(err => {
        console.warn('Error al reproducir audio:', err);
      });
    } else if (track.type === 'synth') {
      if (audioElement) audioElement.pause();
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      scheduleNextSynthNote();
    }

    if (musicWidget) musicWidget.classList.add('playing');
    if (playIcon) playIcon.textContent = '⏸';
  }

  function pauseCurrentTrack() {
    isPlaying = false;
    if (audioElement) audioElement.pause();
    clearTimeout(synthTimerId);

    if (musicWidget) musicWidget.classList.remove('playing');
    if (playIcon) playIcon.textContent = '▶';
  }

  function togglePlay() {
    if (isPlaying) {
      pauseCurrentTrack();
    } else {
      playCurrentTrack();
    }
  }

  function selectTrack(idx) {
    if (idx === currentTrackIdx && isPlaying) return;

    const wasPlaying = isPlaying;
    pauseCurrentTrack();

    currentTrackIdx = idx;
    const track = tracks[currentTrackIdx];

    if (currentTrackTitle) currentTrackTitle.textContent = track.title;

    trackChips.forEach((chip, i) => {
      chip.classList.toggle('active', i === currentTrackIdx);
    });

    if (wasPlaying) {
      playCurrentTrack();
    }
  }

  if (musicToggle) {
    musicToggle.addEventListener('click', togglePlay);
  }

  if (nextTrackBtn) {
    nextTrackBtn.addEventListener('click', () => {
      const nextIdx = (currentTrackIdx + 1) % tracks.length;
      selectTrack(nextIdx);
      if (!isPlaying) {
        playCurrentTrack();
      }
    });
  }

  trackChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      const targetIdx = Number(e.currentTarget.dataset.track);
      selectTrack(targetIdx);
      if (!isPlaying) {
        playCurrentTrack();
      }
    });
  });
}

/* ==========================================================
   8. EFECTO DE CORAZONES AL HACER CLIC
   ========================================================== */
function initClickHearts() {
  window.addEventListener('click', (e) => {
    // Evitar generar en clicks de botones grandes que ya tienen su propio efecto
    if (e.target.closest('#boostLoveBtn') || e.target.closest('#envelope')) return;
    spawnHeart(e.clientX, e.clientY);
  });
}

function spawnHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'particle-heart';
  const symbols = ['❤️', '💖', '💕', '🤍', '✨', '🌹'];
  heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

  const randomTx = (Math.random() - 0.5) * 80;
  const randomTy = -(Math.random() * 80 + 60);
  const randomRot = (Math.random() - 0.5) * 60;
  const size = Math.random() * 10 + 16;

  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.fontSize = `${size}px`;
  heart.style.setProperty('--tx', `${randomTx}px`);
  heart.style.setProperty('--ty', `${randomTy}px`);
  heart.style.setProperty('--rot', `${randomRot}deg`);

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1800);
}

function burstHeartsAtElement(element, count = 15) {
  if (!element) return;
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      spawnHeart(
        centerX + (Math.random() - 0.5) * 50,
        centerY + (Math.random() - 0.5) * 30
      );
    }, i * 35);
  }
}

function cleanServiceWorkerCache() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister();
      }
    });
  }
  if ('caches' in window) {
    caches.keys().then((keys) => {
      keys.forEach((key) => caches.delete(key));
    });
  }
}

/* ==========================================================
   10. MAPA DE NUESTRA PRIMERA CITA (MALL SHOPPING QUILLOTA)
   ========================================================== */
function initFirstDateMap() {
  const mapElement = document.getElementById('firstDateMap');
  if (!mapElement || typeof L === 'undefined') return;

  // Coordenadas exactas de Mall Shopping Center Quillota: -32.8973898, -71.2440898
  const mallCoords = [-32.8973898, -71.2440898];

  const map = L.map('firstDateMap', {
    center: mallCoords,
    zoom: 16,
    scrollWheelZoom: false // Evita atrapar el desplazamiento vertical en móviles
  });

  // Capa base de mapas OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
  }).addTo(map);

  // Marcador en forma de corazón animado
  const heartIcon = L.divIcon({
    className: 'custom-heart-pin',
    html: `
      <div class="heart-pin-wrapper" title="Nuestra Primera Cita ❤️">
        <div class="heart-pin-pulse"></div>
        <div class="heart-pin-body">❤️</div>
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    popupAnchor: [0, -26]
  });

  const marker = L.marker(mallCoords, { icon: heartIcon }).addTo(map);

  // Popup con mensaje romántico
  marker.bindPopup(`
    <div class="map-popup-card">
      <h4>Mall Shopping Quillota</h4>
      <p>Nuestra Primera Cita ❤️</p>
      <span class="popup-badge">Donde comenzó nuestra historia ✨</span>
    </div>
  `).openPopup();
}
