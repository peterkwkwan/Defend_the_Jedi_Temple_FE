let canvas;
let ctx;
let canvasWidth;
let canvasHeight;
let keys = [];
let stormtroopers = [];
let sithLords = [];
let jedi;
let score = 0;

document.addEventListener("DOMContentLoaded", SetupCanvas);

function SetupCanvas() {
  let H = document.documentElement;
  canvasWidth = Math.max(H.clientWidth, H.scrollWidth, H.offsetWidth);
  canvasHeight = Math.max(H.clientHeight, H.scrollHeight, H.offsetHeight);

  canvas = document.getElementById("my-canvas");
  ctx = canvas.getContext("2d");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  jedi = new Jedi();

  document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
  });
  document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
  });
  Render();
}

class Jedi {}
