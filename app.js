const resetButton = document.getElementById('reset');
const scoreDisplay = document.getElementById('score');
const leftMove = document.getElementById('left');
const rightMove = document.getElementById('right');
const canva = canvas.getContext("2d");

const canvasHeight = canvas.height;
const canvasWidth = canvas.width;


let score = 0;
let startTime = Date.now();
scoreDisplay.textContent = 'Score : '+ score + ' s';

const paddle = {
    width: 80,
    height: 10,
    x: canvasWidth / 2 - 40,
    y: canvasHeight - 15,
    speed : 8,
};

let ball = {
    x: canvasWidth / 2,
    y: canvasHeight - 25,
    radius: 7,
    speed: 1,
};

function positionObjet(){
    canva.clearRect(0, 0, canvasWidth, canvasHeight);
    canva.fillStyle = "white";
    canva.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    canva.arc(ball.x, ball.y, ball.radius, 0, 360, false);
    canva.fill();
}

positionObjet();

function jouer(){
    ball.y = ball.y - ball.speed;
    pos = Math.random();
    val = Math.random();
    while (val < 0.5){
        val = Math.random();
    }
    if (pos > 0.5 ){
        ball.x = ball.x + val * ball.speed;
    }else{
        ball.x = ball.x - val * ball.speed;
    }
    positionObjet();
    requestAnimationFrame(jouer);
}

function scoreTime(timestamp){
    score = Math.floor((Date.now() - startTime )  / 1000);
    scoreDisplay.textContent = 'Score : '+ score + ' s';
    requestAnimationFrame(scoreTime);
}

resetButton.addEventListener('click', () => {
    paddle.x = canvasWidth / 2 - 40;
    ball.x = canvasWidth / 2,
    ball.y = canvasHeight - 25,
    score = 0;
    startTime = Date.now();
    positionObjet();
    requestAnimationFrame(scoreTime);
    requestAnimationFrame(jouer);
})

leftMove.addEventListener('click', () => {
    paddle.x = paddle.x - paddle.speed;
    positionObjet();
})

rightMove.addEventListener('click', () => {
    paddle.x = paddle.x + paddle.speed;
    positionObjet();
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
    positionObjet(); 
});












/* requestAnimationFrame()
cancelAnimationFrame()*/
