const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.height = 450;
canvas.width = window.innerWidth - 60;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

let draw_color = 'black';
let draw_width = 5;
let is_drawing = false;

canvas.addEventListener('touchstart', start, false);
canvas.addEventListener('touchmove', draw, false);
canvas.addEventListener('touchend', stop, false);
canvas.addEventListener('mousedown', start, false);
canvas.addEventListener('mousemove', draw, false);
canvas.addEventListener('mouseup', stop, false);
canvas.addEventListener('mouseout', stop, false);

function start(event) {
  is_drawing = true;
  const x = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX;
  const y = event.type === 'touchstart' ? event.touches[0].clientY : event.clientY;
  ctx.beginPath();
  ctx.moveTo(x - canvas.offsetLeft, y - canvas.offsetTop);
  event.preventDefault();
}

function draw(event) {
  if (is_drawing) {
    const x = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
    const y = event.type === 'touchmove' ? event.touches[0].clientY : event.clientY;
    ctx.lineTo(x - canvas.offsetLeft, y - canvas.offsetTop);
    ctx.strokeStyle = draw_color;
    ctx.lineWidth = draw_width;
    ctx.stroke();
  }
}

function stop(event) {
  if (is_drawing) {
    ctx.stroke();
    ctx.closePath();
    is_drawing = false;
  }
  event.preventDefault();
}
