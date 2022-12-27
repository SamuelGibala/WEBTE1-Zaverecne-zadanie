import data from '../json/game.json' assert {type: 'json'};

var game = document.getElementById("game");
var level = 5;
var currentLevel;
var conversionTable = data.conversion_table;
var alternativeText = data.alt;
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight
var segments = [];
var photos = [];
var gameHeight;
var gameWidth;
var actualState = [];
var actualPosition = -1;
var actualLevelLength;
var changeTime = 1000;
var carPosition = 1;




function setLevelLength(){
    actualLevelLength = currentLevel.length;
}

function reprint(){
    fillState(actualPosition);
    fillGrid();
}

function fillState(actualPosition){
    let Ncolumns = currentLevel[0].length;
    let poc = 0;
    for (let i=3+actualPosition;i>=0+actualPosition;i--){
        for (let j = Ncolumns-1; j>=0; j--){
            if(actualState[poc]>4){
                actualState[poc] = currentLevel[i][j]+5;
            }else {
                actualState[poc] = currentLevel[i][j];
            }
            poc++;
        }
    }

}

function fillGrid(){
    let Ncolumns = currentLevel[0].length;
    for (let i=0;i<Ncolumns*4;i++){
        photos[i].setAttribute('src',conversionTable[actualState[i]])
        photos[i].setAttribute('alt',alternativeText[actualState[i]])
    }
}

function loadLevel(level){
    currentLevel = data.levels[level-1];
}

function makeGrid(){
    let Ncolumns = currentLevel[0].length;
    setWidthHeight(Ncolumns);

    for (let i=0;i<Ncolumns*4;i++){
        segments[i] = document.createElement('div');
        segments[i].setAttribute('class','segment');
        segments[i].style.width = String(gameWidth/Ncolumns + "px");
        segments[i].style.height = String(gameHeight/4 + "px");
        photos[i] = document.createElement('img');
        photos[i].setAttribute('class','photos')
        segments[i].appendChild(photos[i]);
        game.appendChild(segments[i]);
    }
}

function updateGrid(){
    let Ncolumns = currentLevel[0].length;
    setWidthHeight(Ncolumns);
    for (let i=0;i<Ncolumns*4;i++){
        segments[i].style.width = String(gameWidth/Ncolumns + "px");
        segments[i].style.height = String(gameHeight/4 + "px");
    }

}


function setWidthHeight(Ncolumns){

    if (screenWidth>screenHeight) {
        let side = screenHeight/4;
        gameHeight = screenHeight;
        gameWidth = Ncolumns*side;
    }else {
        if ((screenHeight/4)*Ncolumns <= screenWidth){
            let side = screenHeight/4;
            gameHeight = screenHeight;
            gameWidth = Ncolumns*side;
        }else {
            let side = screenWidth/Ncolumns;
            gameHeight = side*4;
            gameWidth = screenWidth;
            game.style.marginTop = String((screenHeight-gameHeight)/2 + "px")
        }
    }

    game.style.width = String(gameWidth + "px");
    game.style.height = String(gameHeight + "px");
}

function menu(){
    game.innerHTML = "";
    makeGrid();

    let N = currentLevel[0].length * 4

    for (let i = 0; i < N; i++) {
        actualState[i] = 0;
    }

    actualState[actualState.length-1] = 5;

    fillGrid();

}

function putCar(pos){
    let Ncolumns = currentLevel[0].length;
    let position = 3*Ncolumns + pos;
    actualState[position] = actualState[position]+5;
}

function deleteCar(pos){
    let Ncolumns = currentLevel[0].length;
    let position = 3*Ncolumns + pos;
    actualState[position] = actualState[position]-5;
}

function carMoveRight(){
    let maxRight = currentLevel[0].length-1;

    if (carPosition<maxRight){
        deleteCar(carPosition);
        carPosition++;
        putCar(carPosition);
    }
}

function carMoveLeft(){

    if(carPosition>0){
        deleteCar(carPosition);
        carPosition--;
        putCar(carPosition);
    }
}

function setCycle(){
    var myInterval = setInterval(function (){
        actualPosition++;
        fillState(actualPosition)
        fillGrid()
        if (actualPosition===actualLevelLength-4)
            clearInterval(myInterval);

    },changeTime)
}

loadLevel(level);

makeGrid();
setLevelLength();
fillState(0);
putCar(carPosition);
fillGrid();
setCycle();



window.addEventListener("resize",function (){
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight
    updateGrid();
})

document.addEventListener('keydown',function (e){
   if (e.code === 'ArrowLeft')
       carMoveLeft();

   else if (e.code==="ArrowRight")
       carMoveRight();
   reprint();
})

document.addEventListener('swiped-left',function (e){
    carMoveLeft();
    reprint();
})

document.addEventListener('swiped-right',function (e){
    carMoveRight();
    reprint();
})
