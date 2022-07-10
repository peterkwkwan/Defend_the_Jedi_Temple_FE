const score = 0;
const gameStarted = false;

const yoda = document.querySelector(".yoda");
const widthOfYoda = 200;
let yodaLeft = parseInt(window.getComputedStyle(yoda).getPropertyValue("left"));

const stormtroopers_spawn = document.querySelector(".stormtroopers_spawn");

const gameContainer = document.querySelector("#game_container");
const gameContainerHeight = parseInt(
  window.getComputedStyle(gameContainer).getPropertyValue("height")
);
const gameContainerWidth = parseInt(
  window.getComputedStyle(gameContainer).getPropertyValue("width")
);

// handling player movement
const moveYodaLeft = () => {
  if (yodaLeft > 0) {
    yodaLeft -= 35;
    yoda.style.left = `${yodaLeft}px`;
  }
};
const moveYodaRight = () => {
  if (yodaLeft < gameContainerWidth - widthOfYoda) {
    yodaLeft += 35;
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

// spawning stormtroopers
let stormtrooperId = 0;

const spawnStormtrooper = (id) => {
  const stormtrooperWidth = 100;
  let stormtrooperTop = 0;
  const stormtrooperLeft = Math.floor(
    Math.random() * (gameContainerWidth - stormtrooperWidth)
  );
  let stormtrooper = document.createElement("img");
  stormtrooper.setAttribute("src", "./assets/stormtrooper.svg");
  stormtrooper.setAttribute("width", `${stormtrooperWidth}px`);
  stormtrooper.setAttribute("id", `stormtrooper_${stormtrooperId}`);
  stormtrooper.setAttribute("top", stormtrooperTop);
  stormtrooper.style.position = "absolute";
  stormtrooperId++;

  stormtroopers_spawn.appendChild(stormtrooper);

  const stormtrooperFall = () => {
    stormtrooperTop += 3;
    stormtrooper.style.top = `${stormtrooperTop}px`;
    if (stormtrooperTop > gameContainerHeight) {
      const stormtrooperToDespawn = document.getElementById(
        `stormtrooper_${id}`
      );
      if (stormtrooperToDespawn) {
        stormtroopers_spawn.removeChild(stormtrooperToDespawn);
      }
    }
  };
  stormtrooper.style.left = `${stormtrooperLeft}px`;

  setInterval(stormtrooperFall, 20);
  setTimeout(() => spawnStormtrooper(stormtrooperId), 2000);
};

const startGame = () => {
  document.addEventListener("keydown", handleKeyPress);
  spawnStormtrooper(stormtrooperId);
};
