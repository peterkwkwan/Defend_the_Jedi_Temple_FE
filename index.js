let yoda;
let yodaLeft;
const widthOfYoda = 200;

let enemyId = 0;
const enemy_spawn = document.querySelector(".enemy_spawn");

const menu = document.querySelector("#menu");
let score = 0;
const scoreElement = document.querySelector("#current_score");
const gameContainer = document.querySelector("#game_container");
const gameEndContainer = document.querySelector("#game_end");
let gameContainerHeight;
let gameContainerWidth;

// handling game state
const initializeGameState = () => {
  menu.style.display = "none";

  gameContainer.style.display = "block";
  gameContainerHeight = parseInt(
    window.getComputedStyle(gameContainer).getPropertyValue("height")
  );
  gameContainerWidth = parseInt(
    window.getComputedStyle(gameContainer).getPropertyValue("width")
  );

  yoda = document.querySelector(".yoda");
  yodaLeft = parseInt(window.getComputedStyle(yoda).getPropertyValue("left"));

  spawnStormtrooper(enemyId);
  setTimeout(() => {
    spawnSithLord(enemyId);
  }, 1000);

  setTimeout(() => {
    endGame();
  }, 500);
};

const endGame = () => {
  gameContainer.remove();
  gameEndContainer.style.display = "flex";
  const displayScoreElement = document.getElementById("game_end_score");
  displayScoreElement.innerHTML = score;
  const inputScore = document.querySelector("#game_end input");
  inputScore.focus();
};

const startButton = document.getElementById("start_game_btn");
startButton.addEventListener("click", initializeGameState);

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

document.addEventListener("keydown", handleKeyPress);

// spawning stormtroopers
const spawnStormtrooper = (id) => {
  const sithLordWidth = 100;
  let stormtrooperTop = 0;
  const stormtrooperLeft = Math.floor(
    Math.random() * (gameContainerWidth - sithLordWidth)
  );
  let stormtrooper = document.createElement("img");
  stormtrooper.setAttribute("src", "./assets/stormtrooper.svg");
  stormtrooper.setAttribute("width", `${sithLordWidth}px`);
  stormtrooper.setAttribute("id", `stormtrooper_${enemyId}`);
  stormtrooper.setAttribute("top", stormtrooperTop);
  stormtrooper.style.position = "absolute";
  enemyId++;

  enemy_spawn.appendChild(stormtrooper);

  const stormtrooperFall = () => {
    stormtrooperTop += 3;
    stormtrooper.style.top = `${stormtrooperTop}px`;

    if (
      stormtrooperTop <= gameContainerHeight &&
      stormtrooperTop - gameContainerHeight > -250 &&
      yodaLeft > stormtrooperLeft - 120 &&
      yodaLeft < stormtrooperLeft + 40
    ) {
      const stormtrooperToDespawn = document.getElementById(
        `stormtrooper_${id}`
      );

      enemy_spawn.removeChild(stormtrooperToDespawn);
      clearInterval(stormtrooperInterval);
      score += 50;
      scoreElement.innerHTML = score;
    }
    if (stormtrooperTop > gameContainerHeight) {
      const stormtrooperToDespawn = document.getElementById(
        `stormtrooper_${id}`
      );

      if (stormtrooperToDespawn) {
        enemy_spawn.removeChild(stormtrooperToDespawn);
        clearInterval(stormtrooperInterval);
        clearTimeout(stormtrooperTimeout);
      }
    }
  };

  stormtrooper.style.left = `${stormtrooperLeft}px`;

  const stormtrooperInterval = setInterval(stormtrooperFall, 20);
  const stormtrooperTimeout = setTimeout(
    () => spawnStormtrooper(enemyId),
    2000
  );
};

// spawning sithlords
const spawnSithLord = (id) => {
  const sithLordWidth = 100;
  let sithLordTop = 0;
  const sithLordLeft = Math.floor(
    Math.random() * (gameContainerWidth - sithLordWidth)
  );
  let sithLord = document.createElement("img");
  sithLord.setAttribute("src", "./assets/sithLord.svg");
  sithLord.setAttribute("width", `${sithLordWidth}px`);
  sithLord.setAttribute("id", `sithLord_${enemyId}`);
  sithLord.setAttribute("top", sithLordTop);
  sithLord.style.position = "absolute";
  enemyId++;

  enemy_spawn.appendChild(sithLord);

  const sithLordFall = () => {
    sithLordTop += 3;
    sithLord.style.top = `${sithLordTop}px`;

    if (
      sithLordTop <= gameContainerHeight &&
      sithLordTop - gameContainerHeight > -250 &&
      yodaLeft > sithLordLeft - 120 &&
      yodaLeft < sithLordLeft + 40
    ) {
      const sithLordToDespawn = document.getElementById(`sithLord_${id}`);

      enemy_spawn.removeChild(sithLordToDespawn);
      clearInterval(sithLordInterval);
      score += 100;
      scoreElement.innerHTML = score;
    }
    if (sithLordTop > gameContainerHeight) {
      const sithLordToDespawn = document.getElementById(`sithLord_${id}`);

      if (sithLordToDespawn) {
        enemy_spawn.removeChild(sithLordToDespawn);
        clearInterval(sithLordInterval);
        clearTimeout(sithLordTimeout);
      }
    }
  };

  sithLord.style.left = `${sithLordLeft}px`;

  const sithLordInterval = setInterval(sithLordFall, 20);
  const sithLordTimeout = setTimeout(() => spawnSithLord(enemyId), 3500);
};
