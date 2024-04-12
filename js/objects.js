//create object class and extend for good and bad objects
class Object {
  constructor(gameScreen, imgSrc, speed) {
    this.gameScreen = gameScreen;
    this.width = 100;
    this.height = 100;
    this.speed = speed;
    this.element = document.createElement("img");
    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;

    // Set initial position
    this.resetPosition();

    this.gameScreen.appendChild(this.element);
  }

  resetPosition() {
    // Randomize the left position within the gameScreen width
    this.left = Math.floor(
      Math.random() * (this.gameScreen.offsetWidth - this.width)
    );
    this.top = 0;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  move() {
    this.top += this.speed;
    this.element.style.top = `${this.top}px`;
  }
}
