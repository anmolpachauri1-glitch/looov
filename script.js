const openBtn = document.getElementById('openBtn');
const box = document.getElementById('box');
const message = document.getElementById('message');
const apologyText = document.getElementById('apologyText');
const confettiCanvas = document.getElementById('confetti');

openBtn.addEventListener('click', () => {
  openBtn.disabled = true;
  box.classList.add('open');

  // small delay so lid starts moving before message
  setTimeout(() => revealMessage(), 700);
  setTimeout(() => startConfetti(), 900);
});

function revealMessage(){
  const full = 'I AM SORRY GOLU. MAAF KRDO';
  let i = 0;
  apologyText.textContent = '';
  message.classList.add('revealed');
  const iv = setInterval(() =>{
    apologyText.textContent += full[i];
    i++;
    if(i>=full.length){
      clearInterval(iv);
      // add emojis at the end for emphasis
      apologyText.textContent += '  😢 🥺';
    }
  }, 70);
}

// Simple confetti
function startConfetti(){
  const ctx = confettiCanvas.getContext('2d');
  let W = confettiCanvas.width = window.innerWidth;
  let H = confettiCanvas.height = window.innerHeight;
  const colors = ['#FFD166','#EF476F','#06D6A0','#118AB2','#8D99AE'];
  const pieces = [];
  const count = Math.floor(W/20);

  for(let i=0;i<count;i++){
    pieces.push({
      x: Math.random()*W,
      y: Math.random()*H - H,
      r: Math.random()*6 + 4,
      c: colors[Math.floor(Math.random()*colors.length)],
      tilt: Math.random()*10,
      vy: 2 + Math.random()*3
    });
  }

  let raf;
  function loop(){
    ctx.clearRect(0,0,W,H);
    for(let p of pieces){
      p.y += p.vy;
      p.x += Math.sin(p.y/20) * 1.2;
      p.tilt += 0.1;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.tilt*0.02);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r*1.6);
      ctx.restore();
      if(p.y > H + 20){
        p.y = -20;
        p.x = Math.random()*W;
      }
    }
    raf = requestAnimationFrame(loop);
  }
  loop();

  // auto-stop after 5s
  setTimeout(()=> cancelAnimationFrame(raf), 5000);

  // handle resize
  window.addEventListener('resize', ()=>{
    W = confettiCanvas.width = window.innerWidth;
    H = confettiCanvas.height = window.innerHeight;
  });
}
