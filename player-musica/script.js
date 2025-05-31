// Função de utilidade para formatar tempo (segundos para mm:ss)
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

const audio = document.getElementById('audio');
const playlistEl = document.getElementById('playlist');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
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

const playlistCantadas = [
  { nome: "Deus Vai Na Frente - Wilian Nascimento", arquivo: "musicas/hinos-do-deje-cantado/Deus Vai Na Frente (Wilian Nascimento)(MP3_160K).mp3" },
  { nome: "Ele Jeová", arquivo: "musicas/hinos-do-deje-cantado/Ele Jeová(MP3_160K).mp3" },
  { nome: "Escape", arquivo: "musicas/hinos-do-deje-cantado/Escape(MP3_160K).mp3" },
  { nome: "Joyce Carnassale, Riane Junqueira, Marcel Freire - Maranata", arquivo: "musicas/hinos-do-deje-cantado/Joyce Carnassale_ Riane Junqueira e Marcel Freire - Maranata (Vídeo Oficial)(MP3_160K).mp3" },
  { nome: "Kemilly Santos - Deus de Obras Completas", arquivo: "musicas/hinos-do-deje-cantado/Kemilly Santos _ Deus de Obras Completas [Clipe Oficial](MP3_160K).mp3" },
  { nome: "Olharei Para o Alto", arquivo: "musicas/hinos-do-deje-cantado/Olharei Para o Alto(MP3_160K).mp3" },
  { nome: "Prisma Brasil - Acredito No Nome", arquivo: "musicas/hinos-do-deje-cantado/Prisma Brasil - Acredito No Nome(MP3_160K).mp3" },
  { nome: "Salmos 24 - Canção e Louvor", arquivo: "musicas/hinos-do-deje-cantado/Salmos 24. Canção e Louvor (Legendado)(MP3_160K).mp3" }
];

const playlistPlaybacks = [
  { nome: "Acredito No Nome (Prisma Brasil) - Playback", arquivo: "musicas/hino-do-deje-playback/Acredito No Nome (Prisma Brasil) Playback Legendado(MP3_160K).mp3" },
  { nome: "Canção e Louvor - Salmo 24 - Playback", arquivo: "musicas/hino-do-deje-playback/Canção e Louvor - Salmo 24  (PlayBack)(MP3_160K).mp3" },
  { nome: "Deus de Obras Completas - Playback", arquivo: "musicas/hino-do-deje-playback/Deus de Obras Completas (Playback)(MP3_160K).mp3" },
  { nome: "Deus Vai na Frente - Playback", arquivo: "musicas/hino-do-deje-playback/Deus Vai na Frente (Playback)(MP3_160K).mp3" },
  { nome: "Ele é o Senhor Jeová - Playback", arquivo: "musicas/hino-do-deje-playback/Ele é o Senhor Jeová - Playback(MP3_160K).mp3" },
  { nome: "Escape - Renascer Praise - Playback", arquivo: "musicas/hino-do-deje-playback/Escape - Renascer Praise (Playback Oficial Com Letra)(MP3_160K).mp3" },
  { nome: "MARANATA - JOYCE CARNASSALE, MARCEL FREIRE, RIANE JUNQUEIRA - Playback", arquivo: "musicas/hino-do-deje-playback/MARANATA _ JOYCE CARNASSALE_ MARCEL FREIRE E RIANE JUNQUEIRA _ PLAYBACK(MP3_160K).mp3" },
  { nome: "Olharei Para o Alto - Playback", arquivo: "musicas/hino-do-deje-playback/Olharei Para o Alto (Playback)(MP3_160K).mp3" }
];

let playlistAtual = playlistCantadas;
let currentTrack = 0;

function updateCategoriaBotao(tipo) {
  if (tipo === 'cantadas') {
    btnCantadas.classList.add('ativo');
    btnPlaybacks.classList.remove('ativo');
  } else {
    btnCantadas.classList.remove('ativo');
    btnPlaybacks.classList.add('ativo');
  }
}

function loadTrack(index) {
  const track = playlistAtual[index];
  if (track) {
    audio.src = track.arquivo;
    currentTrackName.textContent = "Tocando: " + track.nome;
    highlightActiveTrack();
  } else {
    audio.src = "";
    currentTrackName.textContent = "Tocando: Nenhuma música";
  }
}

function renderPlaylist() {
  playlistEl.innerHTML = '';
  playlistAtual.forEach((track, i) => {
    const li = document.createElement('li');
    li.textContent = track.nome;
    li.className = i === currentTrack ? 'active' : '';
    li.addEventListener('click', () => {
      currentTrack = i;
      loadTrack(currentTrack);
      audio.play();
    });
    playlistEl.appendChild(li);
  });
}

function highlightActiveTrack() {
  [...playlistEl.children].forEach((li, i) => {
    li.className = i === currentTrack ? 'active' : '';
  });
}

// CONTROLES
playBtn.onclick = () => audio.play();
pauseBtn.onclick = () => audio.pause();
nextBtn.onclick = () => {
  currentTrack = (currentTrack + 1) % playlistAtual.length;
  loadTrack(currentTrack);
  audio.play();
};
prevBtn.onclick = () => {
  currentTrack = (currentTrack - 1 + playlistAtual.length) % playlistAtual.length;
  loadTrack(currentTrack);
  audio.play();
};
audio.addEventListener('ended', () => {
  nextBtn.onclick();
});

// PROGRESSO DA MÚSICA
audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100 || 0;
  progress.style.width = percent + "%";
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});
progressBar.onclick = (e) => {
  const rect = progressBar.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  audio.currentTime = percent * audio.duration;
};

// TROCA PLAYLISTS
btnCantadas.onclick = () => {
  playlistAtual = playlistCantadas;
  currentTrack = 0;
  updateCategoriaBotao('cantadas');
  renderPlaylist();
  loadTrack(currentTrack);
};
btnPlaybacks.onclick = () => {
  playlistAtual = playlistPlaybacks;
  currentTrack = 0;
  updateCategoriaBotao('playbacks');
  renderPlaylist();
  loadTrack(currentTrack);
};

// TEMA ESCURO/CLARO
toggleThemeBtn.onclick = () => {
  const doc = document.documentElement;
  if (doc.getAttribute("data-theme") === "light") {
    doc.removeAttribute("data-theme");
    toggleThemeBtn.textContent = "🌗";
  } else {
    doc.setAttribute("data-theme", "light");
    toggleThemeBtn.textContent = "🌙";
  }
};

// Inicializa o player
renderPlaylist();
loadTrack(currentTrack);
