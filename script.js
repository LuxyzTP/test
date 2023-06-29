const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

canvas.height = 450;
canvas.width = window.innerWidth - 60;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height)

let draw_color = "black";
let draw_width = "5";
let is_drawing = false;

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);

canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);


function start(event) {
    is_drawing = true;
    ctx.beginPath()
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    event.preventDefault();
}

function draw(event) {
    if (is_drawing) {
        ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
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