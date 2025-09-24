const resetButton = document.getElementById('reset');
const scoreDisplay = document.getElementById('score');

const leftMove = document.getElementById('left');
document.getElementById("left").addEventListener("mouseup", () => movingLeft = false);
document.getElementById("left").addEventListener("mousedown", () => movingLeft = true);
document.getElementById("left").addEventListener("touchstart", (e) => {
  e.preventDefault();
  movingLeft = true;
});
document.getElementById("left").addEventListener("touchend", () => movingLeft = false);

const rightMove = document.getElementById('right');
document.getElementById("right").addEventListener("mouseup", () => movingRight = false);
document.getElementById("right").addEventListener("mousedown", () => movingRight = true);
document.getElementById("right").addEventListener("touchstart", (e) => {
  e.preventDefault();
  movingRight = true;
});
document.getElementById("right").addEventListener("touchend", () => movingRight = false);
const canva = canvas.getContext("2d");


const canvasHeight = canvas.height;
const canvasWidth = canvas.width;


let score = 0;
let startTime = Date.now();
let angle = 0;
let directionx = 0;
let directiony = -1;
let gameloop;
let scoreloop;
let perdu = 1;
let movingLeft = false;
let movingRight = false;

function startAngle(){
    directionx = Math.random();
        if (directionx > 0.5 ){
            directionx = -1;
        }
        else {
            directionx = 1;
        }

    angle = Math.random();
        while (angle < 0.1){
            angle = Math.random();
    }
}

scoreDisplay.textContent = 'Score : '+ score + ' s';

const paddle = {
    width: 60,
    height: 10,
    x: canvasWidth / 2 - 30,
    y: canvasHeight - 15,
    speed : 8,
};

let ball = {
    x: canvasWidth / 2,
    y: canvasHeight - 25,
    radius: 7,
    speed: 3,
};

function positionObjet(){
    canva.clearRect(0, 0, canvasWidth, canvasHeight);
    canva.fillStyle = "white";
    canva.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    canva.beginPath();
    canva.arc(ball.x, ball.y, ball.radius, 0, 360, false);
    canva.fill();
    canva.closePath();
}

positionObjet();

function jouer(){
    if (movingLeft && paddle.x > 0) paddle.x -= paddle.speed / 2;
    if (movingRight && paddle.x + paddle.width < canvasWidth) paddle.x += paddle.speed /2;
    if (ball.x + ball.radius > canvasWidth){
        directionx = -1;
        if (ball.speed < 15)ball.speed = ball.speed + 0.2;
    }
    if (ball.x - ball.radius < 0){
        directionx = 1;
        if (ball.speed < 15)ball.speed = ball.speed + 0.2;
    }
    if (ball.y - ball.radius < 0){
        directiony = 1;
        if (ball.speed < 15)ball.speed = ball.speed + 0.2;
    }
    if (ball.y + ball.radius > paddle.y && ball.y + ball.radius < paddle.y + paddle.height && ball.x > paddle.x && ball.x < paddle.x + paddle.width){
        directiony = -1;
        if (ball.speed < 15)ball.speed = ball.speed + 0.2;
    }
    if (ball.y + ball.radius > canvasHeight){
        cancelAnimationFrame(gameloop);
        cancelAnimationFrame(scoreloop);
        perdu = 1;
        paddle.x = canvasWidth / 2 - 30;
        ball.x = canvasWidth / 2;
        ball.y = canvasHeight - 25;
        positionObjet();
        scoreDisplay.textContent = 'PERDU! Score final : '+ score + ' s';
    }
    ball.y = ball.y + ball.speed * directiony;
    ball.x = ball.x + (ball.speed * angle * directionx); 
    if (perdu == 0) positionObjet();
    gameloop = requestAnimationFrame(jouer);
}

function scoreTime(timestamp){
    score = Math.floor((Date.now() - startTime )  / 1000);
    scoreDisplay.textContent = 'Score : '+ score + ' s';
    scoreloop = requestAnimationFrame(scoreTime);
}

resetButton.addEventListener('click', () => {
    perdu = 0;
    cancelAnimationFrame(gameloop);
    cancelAnimationFrame(scoreloop);
    score = 0;
    startTime = Date.now();
    paddle.x = canvasWidth / 2 - 30;
    ball.x = canvasWidth / 2;
    ball.y = canvasHeight - 25;
    ball.speed = 3;
    directionx = 0;
    directiony = -1;
    movingLeft = false;
    movingRight = false;
    positionObjet();
    startAngle();
    scoreloop = requestAnimationFrame(scoreTime);
    gameloop = requestAnimationFrame(jouer);
})

leftMove.addEventListener('click', () => {
    paddle.x = paddle.x - paddle.speed;
    if (perdu == 0) positionObjet();
})

rightMove.addEventListener('click', () => {
    paddle.x = paddle.x + paddle.speed;
    if (perdu == 0) positionObjet();
})

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            if (paddle.x > 0) paddle.x -= paddle.speed;
            break;

        case "ArrowRight":
            if (paddle.x + paddle.width < canvasWidth) paddle.x += paddle.speed;
            break;

        default:
            break;
    }
    if (perdu == 0) positionObjet(); 
});


