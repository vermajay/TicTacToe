const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
let cellCount = 0;    //this is for condition when the game ties

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
    cellCount = 0;
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
    cellCount++;
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
    winningPositions.forEach((position)=>{
        //all 3 positions must be non-empty and same
        if((gameGrid[position[0]] !== "")
        && ((gameGrid[position[0]] == gameGrid[position[1]]) && (gameGrid[position[1]] == gameGrid[position[2]]))){

            let answer = gameGrid[position[0]];
            gameInfo.innerText = `Winner Player - ${answer}`;

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

    //if all the cells are filled and no winner is there
    if(cellCount == 9){
        newGameBtn.classList.add("active");
        gameInfo.innerText = "Game Tied!"
    }
}

newGameBtn.addEventListener("click", ()=>{
    initGame();
});