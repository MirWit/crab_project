//eventListeners

// start game
window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game;

  startButton.addEventListener("click", function () {
    startGame();
  });

  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();
  }
  //navigation
  function handleKeydown(event) {
    const key = event.key;
    const possibleKeystrokes = ["ArrowLeft", "ArrowRight"];
    //check for possible key
    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();

      // update crab's direction X & Y
      // CHECK for speed
      switch (key) {
        case "ArrowLeft":
          game.crab.directionX = -4.5;
          break;
        case "ArrowRight":
          game.crab.directionX = 4.5;
          break;
      }
    }
  }
  window.addEventListener("keydown", handleKeydown);

  // Add an event listener to the restart button
  restartButton.addEventListener("click", function () {
    // Call the restartGame function when the button is clicked
    restartGame();
  });

  // The function that reloads the page to start a new game
  function restartGame() {
    location.reload();
  }
};
