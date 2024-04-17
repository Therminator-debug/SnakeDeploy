
//canvas
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

// snake
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];
//target
var targetX;
var targetY;

var gameOver = false;

var score = 0;

const scoreText = document.getElementById("score");
console.log(scoreText);
//board
window.onload = function() {
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext('2d'); //used for drawing on the board

    targetGen();
    document.addEventListener("keyup", changeDirection);

    const highScore = localStorage.getItem('snakeHighScore');
    if (highScore !== null) {
        const highScoreText = document.getElementById("snakeHighScore");
        highScoreText.innerHTML = highScore;
    }
    // update();
    setInterval(update, 1000/10); //runs update function every 100 milliseconds
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0,0, board.width, board.height);

    context.fillStyle = "gold";
    context.fillRect(targetX, targetY, blockSize, blockSize);

    if (snakeX == targetX && snakeY == targetY){
        updateScore();
        snakeBody.push([targetX, targetY])
        targetGen();
    }

    for (let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length){
        snakeBody[0] = [snakeX, snakeY]
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    // game over req
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        updateScore(true);
        gameOver = true;
        alert("GAME OVER click on OK and then the spacebar to restart");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            updateScore(true);
            gameOver = true;
            alert("GAME OVER click on OK and then the spacebar to restart");
        }
    }
}

function changeDirection(e) {
    if (e.code =="ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code =="ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code =="ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code =="ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
    else if (e.code == "Space") {
        if (gameOver) {
            restartGame();
        }
    }
}

function targetGen(){
    targetX = Math.floor(Math.random() * cols) * blockSize;
    targetY = Math.floor(Math.random() * rows) * blockSize;
}

function updateScore(reset = false) {
    if (reset) {
      score = 0;
      return;
    }
    score += 1;
    scoreText.innerHTML = score;
    updateHighScore(score);
}

function updateHighScore(score) {
    let highScore = localStorage.getItem('snakeHighScore');
    if (highScore === null || score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
    }
    const highScoreText = document.getElementById("snakeHighScore");
    highScoreText.innerHTML = highScore;
}

function restartGame() {
    gameOver = false;
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    score = 0;
    updateScore(true);
}