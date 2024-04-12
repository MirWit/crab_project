// Create crab class
class Crab {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = 100;
    this.height = 100;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img"); //img in "game.js"

    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.element.style.width = `150px`;
    this.element.style.height = `150px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;

    this.gameScreen.appendChild(this.element);
  }

  // Movement
  move() {
    // Update crab position based on directionX
    this.left += this.directionX;

    // Ensure the crab stays within the game screen
    // left hand side
    if (this.left < 10) {
      this.left = 10;
    }
    // right hand side
    if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
      this.left = this.gameScreen.offsetWidth - this.width - 10;
    }
    this.updatePosition();
  }

  // Update position
  updatePosition() {
    this.element.style.left = `${this.left}px`;
  }

  // Define collision
  didCollide(object) {
    const crabRect = this.element.getBoundingClientRect();
    const obstacleRect = object.element.getBoundingClientRect();

    if (
      crabRect.left < obstacleRect.right &&
      crabRect.right > obstacleRect.left &&
      crabRect.top < obstacleRect.bottom &&
      crabRect.bottom > obstacleRect.top
    ) {
      // Collision detected
      return true;
    } else {
      // No collision
      return false;
    }
  }
}
