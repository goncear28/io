// ------------------ Particles Background ------------------
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 400;
let mouse = { x: window.innerWidth/2, y: window.innerHeight/2 };
let dissolve = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
canvas.addEventListener('click', () => {
  dissolve = true;
  setTimeout(() => { dissolve = false; }, 2000);
});

class Particle {
  constructor() {
    this.initX = Math.random() * canvas.width;
    this.initY = Math.random() * canvas.height;
    this.x = this.initX;
    this.y = this.initY;
    this.size = Math.random()*3+1.5;
    this.speedX = Math.random()*1-0.5;
    this.speedY = Math.random()*1-0.5;
    this.opacity = 1;
    this.color = `rgba(255,121,198,${this.opacity})`;
  }
  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    this.x += dx*0.005 + this.speedX;
    this.y += dy*0.005 + this.speedY;

    if(dissolve){
      this.opacity -= 0.03;
      if(this.opacity < 0) this.opacity = 0;
    } else {
      if(this.opacity < 0.8) this.opacity += 0.03;
      this.x += (this.initX - this.x)*0.01;
      this.y += (this.initY - this.y)*0.01;
    }

    if(this.x>canvas.width) this.x=0;
    if(this.x<0) this.x=canvas.width;
    if(this.y>canvas.height) this.y=0;
    if(this.y<0) this.y=canvas.height;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,121,198,${this.opacity})`;
    ctx.fill();
  }
}

particles = [];
for(let i=0;i<particleCount;i++){
  particles.push(new Particle());
}

function animate() {
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(0,0,canvas.width,canvas.height);

  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ------------------ Fancy Text Generator ------------------
const fancyStyles = [
  text => text.split('').map(c => c+'̶').join(''),
  text => text.split('').map(c => c+'★').join(''),
  text => text.split('').map(c => c+'✿').join(''),
  text => text.toUpperCase(),
  text => text.toLowerCase()
];

function generateFancyText(){
  const input = document.getElementById('inputText').value;
  if(!input) return;
  const outputDiv = document.getElementById('outputText');
  outputDiv.innerHTML = '';
  fancyStyles.forEach(f => {
    const div = document.createElement('div');
    div.textContent = f(input);
    outputDiv.appendChild(div);
  });
}

// ------------------ Nickname Generator ------------------
function generateNickname(){
  const keyword = document.getElementById('nicknameKeyword').value;
  if(!keyword) return;
  const outputDiv = document.getElementById('nicknameOutput');
  outputDiv.innerHTML = '';
  for(let i=0;i<5;i++){
    const div = document.createElement('div');
    div.textContent = keyword + Math.floor(Math.random()*1000);
    outputDiv.appendChild(div);
  }
}

// ------------------ Language Switch ------------------
function changeLanguage(){
  const lang = document.getElementById('languageSelect').value;
  const titles = {
    en: { output: 'Results:', nickname: 'Generated Nicknames:' },
    ro: { output: 'Rezultate:', nickname: 'Nickname generate:' },
    ru: { output: 'Результаты:', nickname: 'Сгенерированные ники:' },
    es: { output: 'Resultados:', nickname: 'Apodos generados:' },
    fr: { output: 'Résultats:', nickname: 'Pseudos générés:' }
  };
  document.getElementById('outputTitle').textContent = titles[lang].output;
  document.getElementById('nicknameTitle').textContent = titles[lang].nickname;
}
