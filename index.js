const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

// import JSConfetti from 'js-confetti'
const jsConfetti = new JSConfetti();

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//function to initialize the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        boxes[index].innerText = "";
        boxes[index].classList.remove("win");
        boxes[index].style.pointerEvents = "all";
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

boxes.forEach((box, index)=>{
    box.addEventListener("click", ()=>{
        handleClick(index);
    });
});

function handleClick(index){
    boxes[index].innerText = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    gameGrid[index] = currentPlayer;
    switchUser();
    checkWin();
}

function switchUser(){
    if(currentPlayer == "X") currentPlayer = "O";
    else currentPlayer = "X";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkWin(){
    let answer = "";
    winningPositions.forEach((position)=>{
        //all 3 positions must be non-empty and same
        if((gameGrid[position[0]] !== "")
        && ((gameGrid[position[0]] == gameGrid[position[1]]) && (gameGrid[position[1]] == gameGrid[position[2]]))){

            answer = gameGrid[position[0]];
            gameInfo.innerText = `Winner Player - ${answer}`;
            jsConfetti.addConfetti();

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

            boxes.forEach((box, index)=>{
                boxes[index].style.pointerEvents = "none";
            })
            
            newGameBtn.classList.add("active");
            return;
        }
    });
    let cellCount = 0;
    for(let i=0; i<9; i++){
        if(gameGrid[i] !== "") cellCount++;
    }
    console.log(cellCount, answer);
    if(cellCount == 9 && answer == ""){
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }
}

newGameBtn.addEventListener("click", ()=>{
    initGame();
});