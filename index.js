const sithLords = [];
const stormtroopers = [];
const stormtroopers_spawn = document.querySelector(".stormtroopers_spawn");

const yoda = document.querySelector(".yoda");
const widthOfYoda = 200;

const container = document.querySelector("#container");
const maxWidth = parseInt(
  window.getComputedStyle(container).getPropertyValue("width")
);
let yodaLeft = parseInt(window.getComputedStyle(yoda).getPropertyValue("left"));
const score = 0;

const moveYodaLeft = () => {
  if (yodaLeft > 0) {
    yodaLeft -= 15;
    yoda.style.left = `${yodaLeft}px`;
  }
};
const moveYodaRight = () => {
  if (yodaLeft < maxWidth - widthOfYoda) {
    yodaLeft += 15;
    yoda.style.left = `${yodaLeft}px`;
  }
};

const handleKeyPress = (e) => {
  if (e.key === "ArrowLeft") {
    moveYodaLeft();
  }
  if (e.key === "ArrowRight") {
    moveYodaRight();
  }
};

const spawnStormtrooper = () => {
  let stormtrooperBottom = 140;
  const stormtrooperLeft = Math.floor(Math.random() * (maxWidth - widthOfYoda));
  let stormtrooper = document.createElement("img");
  stormtrooper.setAttribute("src", "./assets/stormtrooper.svg");
  stormtrooper.setAttribute("width", "100px");
  stormtrooper.style.position = "relative";

  stormtroopers_spawn.appendChild(stormtrooper);

  const stormtrooperFall = () => {
    stormtrooperBottom -= 5;
    stormtrooper.style.bottom = `${stormtrooperBottom}px`;
  };
  stormtrooper.style.left = `${stormtrooperLeft}px`;

  setInterval(stormtrooperFall, 20);
  setTimeout(spawnStormtrooper, 2000);
};

spawnStormtrooper();

document.addEventListener("keydown", handleKeyPress);
