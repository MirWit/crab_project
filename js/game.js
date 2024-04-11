//create game class
// including game screens
class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.crab = new Crab(
      this.gameScreen,
      200,
      500,
      100,
      150,
      "../images/crabfav.png"
    );
    this.height = 600;
    this.width = 1000; //CHECK
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
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = Math.round(1000 / 60); //CHECK
  }
  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  // loop & update function
  gameLoop() {
    //console.log("check loop");

    this.update();

    if (this.gameIsOver === true) {
      clearInterval(this.gameIntervalId);
    }
  }

  update() {
    this.crab.move();

    // catch check (ref. to didCollide)
    for (let i = 0; i < this.objects.length; i++) {
      const object = this.objects[i];
      object.move();
      // If the crab catches a bad object
      if (this.crab.didCollide(object)) {
        // Remove the object element from the DOM
        object.element.remove();
        // Remove object object from the array
        this.objects.splice(i, 1);
        // Reduce crab's lives by 1
        this.lives--;
        //console.log(this.lives, "lives");
        // Update the counter variable to account for the removed object
        i--;
      } else if (object.top > this.height) {
        object.element.remove();
        // Remove obstacle object from the array
        this.objects.splice(i, 1);
        // Update the counter variable to account for the removed obstacle
        i--;
      }
    }

    for (let i = 0; i < this.positiveobjects.length; i++) {
      const positiveObject = this.positiveobjects[i];
      positiveObject.move();

      if (this.crab.didCollide(positiveObject)) {
        // Remove the object element from the DOM
        positiveObject.element.remove();
        // Remove object object from the array
        this.positiveobjects.splice(i, 1);
        // increase score
        this.score++;
        //console.log(this.lives, "lives");
        // Update the counter variable to account for the removed object
        i--;
      } else if (positiveObject.top > this.height) {
        positiveObject.element.remove();
        // Remove obstacle object from the array
        this.positiveobjects.splice(i, 1);
        // Update the counter variable to account for the removed obstacle
        i--;
      }
    }

    // Update the lives count on the screen if the element exists
    const livesCountElement = document.getElementById("lives");
    if (livesCountElement) {
      livesCountElement.innerText = this.lives;
    }

    // If the lives are 0, end the game
    if (this.lives === 0) {
      this.endGame();
    }

    const scoreCountElement = document.getElementById("score");
    if (scoreCountElement) {
      scoreCountElement.innerText = this.score;
    }
    // create new object based on a random probability
    //negative randomnesss decrease randomness
    if (
      Math.random() > 0.98 &&
      this.objects.length < 1 &&
      this.positiveobjects.length < 1
    ) {
      // Randomly select an image from the objImages array
      const randomIndex = Math.floor(Math.random() * this.objImages.length);
      const randomImage = this.objImages[randomIndex];

      // Create a regular object with the randomly selected image
      this.objects.push(new Object(this.gameScreen, randomImage));
    }

    // this is positive randomness (e.g. increase randomness)
    if (
      Math.random() > 0.98 &&
      this.positiveobjects.length < 1 &&
      this.objects.length < 1
    ) {
      // Randomly select an image from the posObjImages array
      const randomIndex = Math.floor(Math.random() * this.posObjImages.length);
      const randomImage = this.posObjImages[randomIndex];

      // Create a positive object with the randomly selected image
      this.positiveobjects.push(new Object(this.gameScreen, randomImage));
    }
  }
  // end game method
  endGame() {
    this.crab.element.remove();
    this.objects.forEach((object) => object.element.remove());

    this.gameIsOver = true;
    // Hide game screen
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "none";

    // Show end game screen
    this.gameEndScreen.style.display = "block";
  }
}
