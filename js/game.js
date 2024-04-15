class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameContainer = document.getElementById("game-container");
    this.gameEndScreen = document.getElementById("game-end");
    this.gameEndContainer = document.getElementById("end-container");
    this.crab = new Crab(
      this.gameScreen,
      200,
      500,
      100,
      150,
      "../images/crab.gif"
    );
    this.height = 600;
    this.width = 1000;
    this.objects = [];
    this.positiveobjects = [];
    this.objImages = ["../images/blowfish.png"];
    this.posObjImages = [
      "../images/oyster1.png",
      "../images/octopus.png",
      "../images/shrimp.png",
    ];
    this.score = 0;
    this.lives = 3;
    this.speed = 5;
    this.stats = document.getElementById("stats");
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = Math.round(1000 / 60);
  }
  // Add the stats section containers
  addStatsToContainer(container) {
    const statsClone = document.getElementById("stats").cloneNode(true);
    statsClone.id = "stats-updated";
    statsClone.classList.add("game-stats");
    container.appendChild(statsClone);
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);

    this.addStatsToContainer(this.gameContainer);
    // this.addStatsToContainer(this.gameEndScreen);
  }

  gameLoop() {
    this.update();

    if (this.gameIsOver === true) {
      clearInterval(this.gameIntervalId);
    }
  }

  update() {
    this.crab.move();

    // Catch check for negative objects
    for (let i = 0; i < this.objects.length; i++) {
      const object = this.objects[i];
      object.move();
      if (this.crab.didCollide(object)) {
        object.element.remove();
        this.objects.splice(i, 1);
        this.lives--;
        i--;
      } else if (object.top > this.height) {
        object.element.remove();
        this.objects.splice(i, 1);
        i--;
      }
    }

    // Catch check for positive objects
    for (let i = 0; i < this.positiveobjects.length; i++) {
      const positiveObject = this.positiveobjects[i];
      positiveObject.move();
      if (this.crab.didCollide(positiveObject)) {
        positiveObject.element.remove();
        this.positiveobjects.splice(i, 1);
        this.score++;
        i--;
      } else if (positiveObject.top > this.height) {
        positiveObject.element.remove();
        this.positiveobjects.splice(i, 1);
        i--;
      }
    }

    //update functions lives, score, level
    const livesCountElement = document.getElementById("lives");
    if (livesCountElement) {
      livesCountElement.innerText = this.lives;
    }

    if (this.lives === 0) {
      this.endGame();
    }

    const scoreCountElement = document.getElementById("score");
    if (scoreCountElement) {
      scoreCountElement.innerText = this.score;
    }
    let levelCount;
    levelCount = document.getElementById("level");

    //update speed (score % 5) and levels
    switch (this.score) {
      case 5:
        this.speed = 6;
        levelCount.innerText = "2";
        break;
      case 10:
        this.speed = 7;
        levelCount.innerText = "3";
        break;
      case 15:
        this.speed = 8;
        levelCount.innerText = "4";
        break;
      case 20:
        this.speed = 9;
        levelCount.innerText = "5";
        break;
      case 25:
        this.speed = 10;
        levelCount.innerText = "6";
        break;
      case 30:
        this.speed = 11;
        levelCount.innerText = "7";
        break;
      case 35:
        this.speed = 12;
        levelCount.innerText = "8";
        break;
      case 40:
        this.speed = 13;
        levelCount.innerText = "9";
        break;
      case 45:
        this.speed = 14;
        levelCount.innerText = "10";
        break;
      case 45:
        this.speed = 15;
        levelCount.innerText = "11";
        break;
      case 50:
        this.speed = 16;
        levelCount.innerText = "12";
        break;
      case 55:
        this.speed = 17;
        levelCount.innerText = "13";
        break;
      case 60:
        this.speed = 18;
        levelCount.innerText = "14";
        break;
      case 65:
        this.speed = 19;
        levelCount.innerText = "15";
        break;
      case 70:
        this.speed = 20;
        levelCount.innerText = "15";
        break;
    }

    // Create new objects if both arrays are empty
    if (this.objects.length === 0 && this.positiveobjects.length === 0) {
      const isPositive = Math.random() > 0.25;
      const randomIndex = Math.floor(
        Math.random() *
          (isPositive ? this.posObjImages.length : this.objImages.length)
      );
      const randomImage = isPositive
        ? this.posObjImages[randomIndex]
        : this.objImages[randomIndex];
      if (isPositive) {
        this.positiveobjects.push(
          new Object(this.gameScreen, randomImage, this.speed)
        );
      } else {
        this.objects.push(new Object(this.gameScreen, randomImage, this.speed));
      }
    }
    const updateStats = document.getElementById("stats");
    if (updateStats) {
      updateStats.innerHTML = this.stats;
    }
  }

  endGame() {
    this.crab.element.remove();
    this.objects.forEach((object) => object.element.remove());

    this.gameIsOver = true;
    this.startScreen.style.display = "none";
    this.gameContainer.style.display = "none";
    this.gameEndContainer.style.display = "block";

    const statsClone = document.getElementById("stats-updated").cloneNode(true);
    statsClone.classList.add("final-stats");
    this.gameEndScreen.appendChild(statsClone);
  }
}
