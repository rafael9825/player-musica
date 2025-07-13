function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

const audio = document.getElementById('audio');
const playlistEl = document.getElementById('playlist');
const playPauseBtn = document.getElementById('playPause');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const currentTrackName = document.getElementById('current-track');
const btnCantadas = document.getElementById('btnCantadas');
const btnPlaybacks = document.getElementById('btnPlaybacks');
const toggleThemeBtn = document.getElementById('toggleTheme');
const repeatBtn = document.getElementById('repeat');
const coverImg = document.getElementById('coverImg');

// Playlist com imagens reais ou exemplos fictícios
const playlistCantadas = [
  {
    nome: "Acredito No Nome (Prisma Brasil)",
    arquivo: "musicas/hinos-do-deje-cantado/Acredito No Nome (Prisma Brasil).mp3",
    imagem: "imagens/prisma.jpg"
  },
  
  {
    nome: "Ao olhar pra Cruz (Adoradores)",
    arquivo: "musicas/hinos-do-deje-cantado/Ao olhar pra Cruz Adoradores.mp3",
    imagem: "imagens/adoradores.jpg"
  },
  {
    nome: "Autor da Vida (Aline Barros)",
    arquivo: "musicas/hinos-do-deje-cantado/Autor da Vida.mp3",
    imagem: "imagens/autor.jpg"
  },
  {
    nome: "Deus de Obras Completas (Kemilly Santos)",
    arquivo: "musicas/hinos-do-deje-cantado/Deus de Obras Completas-Kemilly Santos.mp3",
    imagem: "imagens/kemilly.jpg"
  },
  {
    nome: "Deus Vai Na Frente (Wilian Nascimento)",
    arquivo: "musicas/hinos-do-deje-cantado/Deus Vai Na Frente (Wilian Nascimento).mp3",
    imagem: "imagens/wilian.jpg"
  },
  {
    nome: "Ele é o Senhor Jeová (Coral Jovem)",
    arquivo: "musicas/hinos-do-deje-cantado/Ele Jeová.mp3",
    imagem: "imagens/elejeova.jpg"
  },

  {
      nome: "Escape (Renascer Praise)", 
      arquivo: "musicas/hinos-do-deje-cantado/Escape.mp3",
      imagem: "imagens/escape.jpg"
  },

  {
    nome: "Ele Vem (Coral Kemuel)",
    arquivo: "musicas/hinos-do-deje-cantado/Ele Vem.mp3",
    imagem: "imagens/elevem.jpg"
  },

  {
    nome: "Olharei Para o Alto (Midian Lima)",
    arquivo: "musicas/hinos-do-deje-cantado/Olharei Para o Alto.mp3",
    imagem: "imagens/olhareialto.jpg"
  },

  {
    nome: "Maranata (Joyce Carnassale)",
    arquivo: "musicas/hinos-do-deje-cantado/Joyce Carnassale, Riane Junqueira e Marcel Freire-Maranata.mp3",
    imagem: "imagens/maranata.jpg"
  },

  {
    nome: "Salmos 24 (Canção e Louvor)",
    arquivo: "musicas/hinos-do-deje-cantado/Salmos 24. Canção e Louvor.mp3",
    imagem: "imagens/cancaoelouvor.jpg"
  },

];

const playlistPlaybacks = [
  {
    nome: "Acredito No Nome (Prisma Brasil) Playback",
    arquivo: "musicas/hino-do-deje-playback/Acredito No Nome (Prisma Brasil) Playback Legendado(MP3_160K).mp3",
    imagem: "imagens/prisma.jpg"
  },

  {
    nome: "Ao olhar pra Cruz (Playback)",
    arquivo: "musicas/hino-do-deje-playback/Ao olhar pra Cruz Adoradores Playback (MP3_160K).mp3",
    imagem: "imagens/adoradores.jpg"
    },

  {
    nome: "Autor da Vida (Playback)",
    arquivo: "musicas/hino-do-deje-playback/Autor da Vida (PLAYBACK ) (MP3_160K).mp3",
    imagem: "imagens/autor.jpg"
  },

  {
    nome: "Deus de Obras Completas (Playback)",
    arquivo: "musicas/hino-do-deje-playback/Deus de Obras Completas (Playback)(MP3_160K).mp3",
    imagem: "imagens/kemilly.jpg"
  },

  {
    nome: "Deus Vai na Frente (Playback)",
    arquivo: "musicas/hino-do-deje-playback/Deus Vai na Frente (Playback)(MP3_160K).mp3",
    imagem: "imagens/wilian.jpg"
  },

  {
    nome: "Ele é o Senhor Jeová (Playback)",
    arquivo: "musicas/hino-do-deje-playback/Ele é o Senhor Jeová - Playback(MP3_160K).mp3",
    imagem: "imagens/elejeova.jpg"
  },

  {
    nome: "Escape (Playback)",
    arquivo: "musicas/hino-do-deje-playback/Escape - Renascer Praise (Playback Oficial Com Letra)(MP3_160K).mp3",
    imagem: "imagens/escape.jpg"
  },

  {
    nome: "Ele Vem (Playback)",
    arquivo: "musicas/hino-do-deje-playback/Ele Vem (Playback)(MP3_160K).mp3",
    imagem: "imagens/elevem.jpg"
  },

  {
    nome: "Olharei Para o Alto (Playback)",
    arquivo: "musicas/hino-do-deje-playback/Olharei Para o Alto (Playback)(MP3_160K).mp3",
    imagem: "imagens/olhareialto.jpg"
  },

  {
    nome: "Maranata (Playback)",
    arquivo: "musicas/hino-do-deje-playback/Joyce Carnassale, Riane Junqueira e Marcel Freire-Maranata Playback (MP3_160K).mp3",
    imagem: "imagens/maranata.jpg"
  },

  {
    nome: "Salmo 24 (PlayBack)",
    arquivo: "musicas/hino-do-deje-playback/Canção e Louvor - Salmo 24  (PlayBack)(MP3_160K).mp3",
    imagem: "imagens/cancaoelouvor.jpg"
  },

   // ...adicione quantas quiser, sempre com "imagem"
];

// Carregar último tema/categoria/música
let playlistAtual = playlistCantadas;
let currentTrack = 0;
let isRepeating = false;

const categoriaSalva = localStorage.getItem("categoria");
if (categoriaSalva === "playbacks") {
  playlistAtual = playlistPlaybacks;
  btnCantadas.classList.remove('ativo');
  btnPlaybacks.classList.add('ativo');
} else {
  playlistAtual = playlistCantadas;
  btnCantadas.classList.add('ativo');
  btnPlaybacks.classList.remove('ativo');
}
if (localStorage.getItem("trackIndex")) {
  currentTrack = parseInt(localStorage.getItem("trackIndex")) || 0;
}

function updateCategoriaBotao(tipo) {
  if (tipo === 'cantadas') {
    btnCantadas.classList.add('ativo');
    btnPlaybacks.classList.remove('ativo');
  } else {
    btnCantadas.classList.remove('ativo');
    btnPlaybacks.classList.add('ativo');
  }
}

function loadTrack(index, autoPlay = false) {
  const track = playlistAtual[index];
  if (track) {
    audio.src = track.arquivo;
    currentTrackName.textContent = "Tocando: " + track.nome;
    coverImg.src = track.imagem || "imagens/default.jpg";
    highlightActiveTrack();
    localStorage.setItem("trackIndex", index);

    if (autoPlay) {
      audio.load();
      audio.oncanplay = () => {
        audio.play().catch(() => {});
        audio.oncanplay = null;
      };
    }
  } else {
    audio.src = "";
    currentTrackName.textContent = "Tocando: Nenhuma música";
    coverImg.src = "imagens/default.jpg";
  }
}

function renderPlaylist() {
  playlistEl.innerHTML = '';
  playlistAtual.forEach((track, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img class="playlist-img" src="${track.imagem || 'imagens/default.jpg'}" alt="Artista">
      <span>${track.nome}</span>
    `;
    li.className = i === currentTrack ? 'active' : '';
    li.setAttribute('role', 'option');
    li.setAttribute('tabindex', '0');
    li.setAttribute('aria-selected', i === currentTrack ? "true" : "false");
    li.onclick = () => {
      currentTrack = i;
      loadTrack(currentTrack, true);
    };
    li.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        currentTrack = i;
        loadTrack(currentTrack, true);
      }
    }
    playlistEl.appendChild(li);
  });
}

function highlightActiveTrack() {
  [...playlistEl.children].forEach((li, i) => {
    li.className = i === currentTrack ? 'active' : '';
    li.setAttribute('aria-selected', i === currentTrack ? "true" : "false");
  });
}

function updatePlayPauseIcon() {
  playPauseBtn.textContent = audio.paused ? '▶️' : '⏸️';
}

playPauseBtn.onclick = () => {
  if (audio.paused) audio.play();
  else audio.pause();
};

audio.addEventListener('play', updatePlayPauseIcon);
audio.addEventListener('pause', updatePlayPauseIcon);

nextBtn.onclick = () => {
  currentTrack = (currentTrack + 1) % playlistAtual.length;
  loadTrack(currentTrack, true);
};
prevBtn.onclick = () => {
  currentTrack = (currentTrack - 1 + playlistAtual.length) % playlistAtual.length;
  loadTrack(currentTrack, true);
};

repeatBtn.onclick = () => {
  isRepeating = !isRepeating;
  repeatBtn.classList.toggle('active', isRepeating);
};

audio.addEventListener('ended', () => {
  if (isRepeating) {
    audio.currentTime = 0;
    audio.play();
  } else {
    nextBtn.onclick();
  }
});

audio.addEventListener('error', function () {
  currentTrackName.textContent = "Erro ao carregar: " + playlistAtual[currentTrack].nome;
  coverImg.src = "imagens/default.jpg";
  setTimeout(() => {
    nextBtn.onclick();
  }, 1600);
});

function updateProgress() {
  const percent = (audio.currentTime / audio.duration) * 100 || 0;
  progress.style.width = percent + "%";
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
}
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', updateProgress);

progressBar.onclick = (e) => {
  const rect = progressBar.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  audio.currentTime = percent * audio.duration;
};

btnCantadas.onclick = () => {
  playlistAtual = playlistCantadas;
  currentTrack = 0;
  updateCategoriaBotao('cantadas');
  localStorage.setItem("categoria", "cantadas");
  renderPlaylist();
  loadTrack(currentTrack, true);
};
btnPlaybacks.onclick = () => {
  playlistAtual = playlistPlaybacks;
  currentTrack = 0;
  updateCategoriaBotao('playbacks');
  localStorage.setItem("categoria", "playbacks");
  renderPlaylist();
  loadTrack(currentTrack, true);
};

function setTheme(theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    toggleThemeBtn.textContent = "🌙";
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
    toggleThemeBtn.textContent = "🌗";
    localStorage.setItem("theme", "dark");
  }
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") setTheme("light");
else setTheme("dark");

document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.code === 'Space') {
    e.preventDefault();
    playPauseBtn.click();
  }
  if (e.code === 'ArrowRight') nextBtn.click();
  if (e.code === 'ArrowLeft') prevBtn.click();
});

toggleThemeBtn.onclick = () => {
  const theme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
  setTheme(theme);
};

renderPlaylist();
loadTrack(currentTrack, false);
updatePlayPauseIcon();