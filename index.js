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

function Render() {
  jedi.movingLeft = keys[37];
  jedi.movingRight = keys[39];

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ctx.fillStyle = "white";
  ctx.font = "21px Arial";
  ctx.fillText(`SCORE: ${score.toString()}`, 20, 35);

  ship.Update();
  ship.Draw();

  if (stormtroopers.length > 0) {
    for (let i = 0; i < bullets.length; i++) {
      bullets[i].Update();
      bullets[i].Draw();
    }
  }
  if (sithLords.length > 0) {
    for (let i = 0; i < asteroids.length; i++) {
      asteroids[i].Update();
      asteroids[i].Draw();
    }
  }

  requestAnimationFrame(Render);
}
