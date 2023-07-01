const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth - 60;
    canvas.height = window.innerHeight - 60;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let draw_color = 'black';
let draw_width = 1;
let is_drawing = false;
let objects = [];
let index = -1;

function changeColor(element) {
    draw_color = element.style.background;
}

canvas.addEventListener('touchstart', start, false);
canvas.addEventListener('touchmove', draw, false);
canvas.addEventListener('touchend', stop, false);
canvas.addEventListener('mousedown', start, false);
canvas.addEventListener('mousemove', draw, false);
canvas.addEventListener('mouseup', stop, false);
canvas.addEventListener('mouseout', stop, false);

function start(event) {
    is_drawing = true;
    const rect = canvas.getBoundingClientRect();
    const x = event.type === 'touchstart' ? event.touches[0].clientX - rect.left : event.clientX - rect.left;
    const y = event.type === 'touchstart' ? event.touches[0].clientY - rect.top : event.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
    event.preventDefault();
}

function draw(event) {
    if (is_drawing) {
        const rect = canvas.getBoundingClientRect();
        const x = event.type === 'touchmove' ? event.touches[0].clientX - rect.left : event.clientX - rect.left;
        const y = event.type === 'touchmove' ? event.touches[0].clientY - rect.top : event.clientY - rect.top;
        ctx.lineTo(x, y);
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

    if (event.type != 'mouseout') {
        objects.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    objects = [];
    index = -1;
}

function undoLast() {
    if (index <= 0) {
        clearCanvas();
    } else {
        index -= 1;
        objects.pop();
        ctx.putImageData(objects[index], 0, 0);
    }
}
