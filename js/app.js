var Game = require("./game.js");

var myGame = new Game();
myGame.showFurry();
myGame.showCoin();
myGame.startGame();

document.addEventListener("DOMContentLoaded", function () {

document.addEventListener('keydown', function () {
    myGame.turnFurry(event);
});

});
