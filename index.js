let canvas;
let ctx;
let canvasWidth;
let canvasHeight;
let stormtroopers = [];
let sithLords = [];
let yoda = document.querySelector("#yoda");
let yodaLeft = parseInt(window.getComputedStyle(yoda).getPropertyValue("left"));
let score = 0;

const moveYodaLeft = () => {
  yodaLeft -= 10;
  yoda.style.left = yodaLeft + "px";
};
const moveYodaRight = () => {
  yodaLeft += 10;
  yoda.style.left = yodaLeft + "px";
};

document.body.addEventListener("keydown", (e) => {
  keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", (e) => {
  keys[e.keyCode] = false;
});
