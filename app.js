const resetButton = document.getElementById('reset');
const scoreDisplay = document.getElementById('score');
const leftMove = document.getElementById('left');
const rightMove = document.getElementById('right');


let score = 0;

requestAnimationFrame(scoreTime);

function scoreTime(timestamp){
    score = score + 1 ;
    scoreDisplay.textContent = 'Score : '+ score + ' s';
    requestAnimationFrame(scoreTime);
}

resetButton.addEventListener('click', () => {
    score = 0;
})

leftMove.addEventListener('click', () => {

})

rightMove.addEventListener('click', () => {
    
})












/* requestAnimationFrame()
cancelAnimationFrame()*/
