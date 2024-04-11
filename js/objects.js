//create object class and extend for good and bad objects
class Object {
  constructor(gameScreen, imgSrc) {
    //constructor(gameScreen,imgSrc) {
    this.gameScreen = gameScreen;
    this.left = Math.floor(Math.random() * 300 + 70);
    this.top = 0;
    this.width = 100;
    this.height = 150;
    this.element = document.createElement("img");

    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);
  }
  // define positions
  updatePosition() {
    // Update the obstacle's position based on the properties left and top
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
  // define movement
  move() {
    // Move the obstacle down by 3px
    this.top += 4;
    // Update the obstacle's position on the screen
    this.updatePosition();
  }
}
