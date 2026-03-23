const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
const display = document.getElementById('lyric-display');
const main = document.getElementById('main');
const sub = document.getElementById('sub');
const btn = document.getElementById('btn-play');

// Sincronización refinada: Texto principal y subtítulo
const letras = [
  { t: 2, m: "Tiempo de cambios", s: "Everything is different now" },
  { t: 6, m: "Pero algo no cambia", s: "My mind still thinks of you" },
  { t: 10, m: "🌻 Girasoles para ti 🌻", s: "Porque es 21 de Marzo" },
  { t: 14, m: "Eres especial", s: "Gracias por estar aquí" },
  { t: 18, m: "Disfruta el día", s: "Ready to shine? ✨" }
];

function createParticle() {
  const p = document.createElement('div');
  p.className = 'particle';
  p.innerText = Math.random() > 0.5 ? '🌻' : '🤍';
  p.style.left = Math.random() * 100 + 'vw';
  p.style.top = '-50px';
  p.style.fontSize = (Math.random() * 15 + 10) + 'px';
  p.style.opacity = Math.random() * 0.6 + 0.2;
  p.style.animationDuration = (Math.random() * 4 + 3) + 's';
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 6000);
}

btn.onclick = () => {
  btn.style.display = 'none';
  audio.play();
  setInterval(createParticle, 200);

  audio.addEventListener('timeupdate', () => {
    const tiempo = audio.currentTime;
    const frase = letras.find(l => tiempo >= l.t && tiempo < l.t + 4);

    if (frase) {
      if (main.innerText !== frase.m) {
        display.classList.remove('active');
        setTimeout(() => {
          main.innerText = frase.m;
          sub.innerText = frase.s;
          display.classList.add('active');
        }, 200);
      }
    } else {
      display.classList.remove('active');
    }
  });
};
