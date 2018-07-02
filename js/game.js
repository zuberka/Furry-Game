var Furry = require("./furry.js");
var Coin = require("./coin.js");

function Game() {
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.board = document.querySelectorAll('section#board div');

    this.index = function (x, y) {
        return x + (y * 10);
    };

    this.showFurry = function () {
        this.hideVisibleFurry();
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    };

    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };



    this.startGame = function () {
        var self = this;
        this.idSetInterval = setInterval(function () {
            self.moveFurry()
        }, 300);
        return this.idSetInterval;
    };

    this.moveFurry = function () {
        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y - 1;
        } else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y + 1;
        }
        var gameEnd = this.gameOver();
        if (gameEnd !== true){
            this.showFurry();
            this.checkCoinCollision();
        }else{
            var board = document.getElementById('board');
            board.innerHTML = 'Sorry Game Over';
            board.style.color = "orange";
            board.style.fontSize = "30px";
        }
    };

    this.hideVisibleFurry = function () {
        var hideFurry = document.querySelector('.furry');
        if (hideFurry != null) {
            hideFurry.classList.remove('furry');
        }
    };

    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }
    };
    this.checkCoinCollision = function () {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            var coinHide = document.querySelector('.coin');
            if (coinHide != null) {
                coinHide.classList.remove('coin');
            }
            this.score += 1;
            document.querySelector('section#score div strong').innerHTML = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };

    this.gameOver = function () {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y > 9 || this.furry.y < 0) {
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            return true;

        }
    };

}

module.exports = Game;