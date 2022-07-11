// const API_ENDPOINT = "http://localhost:3000/leaderboard";
const API_ENDPOINT = "http://localhost:3000/leaderboard";

const leaderboardList = [];
let score = 0;
let gameStarted = false;

let yoda;
let yodaLeft;
const widthOfYoda = 200;

let enemyId = 0;
const enemy_spawn = document.querySelector(".enemy_spawn");

const menuContainer = document.querySelector("#menu");
const scoreElement = document.querySelector("#current_score");
const leaderboardContainer = document.querySelector("#leaderboard");
const gameContainer = document.querySelector("#game_container");
const gameEndContainer = document.querySelector("#game_end");
let gameContainerHeight;
let gameContainerWidth;

// leaderboard
const renderLeaderboard = () => {
  const maxRankingsToShow = 10;
  const rankingListElement = document.getElementById("leaderboard_ranking");
  leaderboardList.forEach((item, idx) => {
    if (idx > maxRankingsToShow) return;

    const row = document.createElement("li");
    const scoreElement = document.createElement("span");
    row.style.width = "500px";
    row.style.display = "flex";
    row.style.justifyContent = "space-between";
    row.innerHTML = `${idx + 1}. ${item.name.toLowerCase()}`;
    row.appendChild(scoreElement);
    scoreElement.innerHTML = item.score;
    rankingListElement.appendChild(row);
  });
};

const viewLeaderboard = () => {
  menuContainer.style.display = "none";
  leaderboardContainer.style.display = "flex";
  fetch(API_ENDPOINT)
    .then((response) => response.json())
    .then((parsedResponse) => {
      const sortedRankings = parsedResponse.data.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        }
        if (b.score < a.score) {
          return -1;
        }
        return 0;
      });
      leaderboardList.push(...sortedRankings);
      renderLeaderboard();
    });
};

const goBackToMenu = () => {
  menuContainer.style.display = "flex";
  leaderboardContainer.style.display = "none";
};

// starting game
const initializeGameState = () => {
  menuContainer.style.display = "none";
  gameStarted = true;
  let timeRemaining = 5;

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

  const currentTimeElement = document.getElementById("current_time");
  setInterval(() => {
    if (timeRemaining === 0) {
      endGame();
    }
    timeRemaining--;
    currentTimeElement.innerHTML = timeRemaining;
  }, 1000);
};

// submitting scores

const postRanking = async (data) => {
  console.log(data);
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const endGame = () => {
  gameStarted = false;
  const displayScoreElement = document.getElementById("game_end_score");
  const inputNameElement = document.querySelector("#game_end input");
  const submitButton = document.getElementById("submit_score");

  gameContainer.remove();
  gameEndContainer.style.display = "flex";
  displayScoreElement.innerHTML = score;
  inputNameElement.focus();
  submitButton
    .addEventListener("click", () =>
      postRanking({ name: inputNameElement.value, score: score })
    )
    .then((data) => {
      console.log(data);
    });

  if (score <= 0) {
    const resultElement = document.getElementById("game_end_result");
    const promotionElement = document.getElementById("game_end_promotion");
    resultElement.innerHTML = "oh no! The Jedi Council was defeated!";
    promotionElement.innerHTML = "You are still a Jedi Padawan...";
    submitButton.innerHTML = "Submit";
  }
};

// button listeners
const startButton = document.getElementById("start_game_btn");
const leaderboardButton = document.getElementById("leaderboard_btn");
const backToMenuButton = document.getElementById("back_to_menu");
startButton.addEventListener("click", initializeGameState);
leaderboardButton.addEventListener("click", viewLeaderboard);
backToMenuButton.addEventListener("click", goBackToMenu);

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
  let stormtrooperInterval;
  let stormtrooperTimeout;

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
    if (!gameStarted) {
      clearInterval(stormtrooperInterval);
      clearTimeout(stormtrooperTimeout);
      return;
    }

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

  if (gameStarted) {
    stormtrooperInterval = setInterval(stormtrooperFall, 20);
    stormtrooperTimeout = setTimeout(() => spawnStormtrooper(enemyId), 2000);
  }
};

// spawning sithlords
const spawnSithLord = (id) => {
  let sithLordInterval;
  let sithLordTimeout;

  const sithLordWidth = 100;
  let sithLordTop = 0;
  const sithLordLeft = Math.floor(
    Math.random() * (gameContainerWidth - sithLordWidth)
  );

  let randomNum = Math.ceil(Math.random() * 4);
  let sithLord = document.createElement("img");
  sithLord.setAttribute("src", `./assets/sithLord${randomNum}.svg`);
  sithLord.setAttribute("width", `${sithLordWidth}px`);
  sithLord.setAttribute("id", `sithLord_${enemyId}`);
  sithLord.setAttribute("top", sithLordTop);
  sithLord.style.position = "absolute";
  enemyId++;

  enemy_spawn.appendChild(sithLord);

  const sithLordFall = () => {
    if (!gameStarted) {
      clearInterval(sithLordInterval);
      clearTimeout(sithLordTimeout);
      return;
    }

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
      score -= 100;
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

  if (gameStarted) {
    sithLordInterval = setInterval(sithLordFall, 20);
    sithLordTimeout = setTimeout(() => spawnSithLord(enemyId), 3500);
  }
};
