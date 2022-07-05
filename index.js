let stormtroopers = [];
let sithLords = [];
let yoda = document.querySelector(".yoda");
let container = document.querySelector("#container");
let maxWidth = parseInt(
  window.getComputedStyle(container).getPropertyValue("width")
);
let yodaLeft = parseInt(window.getComputedStyle(yoda).getPropertyValue("left"));
let score = 0;

const moveYodaLeft = () => {
  if (yodaLeft > 0) {
    yodaLeft -= 20;
    yoda.style.left = yodaLeft + "px";
  }
};
const moveYodaRight = () => {
  const widthOfYoda = 200;
  if (yodaLeft < maxWidth - widthOfYoda) {
    yodaLeft += 20;
    yoda.style.left = yodaLeft + "px";
  }
};

const handleKeyPress = (e) => {
  console.log(yodaLeft);
  if (e.key === "ArrowLeft") {
    moveYodaLeft();
  }
  if (e.key === "ArrowRight") {
    moveYodaRight();
  }
};

document.addEventListener("keydown", handleKeyPress);
