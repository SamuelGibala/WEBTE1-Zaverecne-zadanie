import data from '../json/game.json' assert {type: 'json'};
var game = document.getElementById("game");
var level = 1;
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
var actualPosition = 0;
var actualLevelLength;
var changeTime = 1000;




function setLevelLength(){
    actualLevelLength = currentLevel.length;
}

function fillState(actualPosition){
    let Ncolumns = currentLevel[0].length;
    let poc = 0;
    for (let i=3+actualPosition;i>=0+actualPosition;i--){
        for (let j = Ncolumns-1; j>=0; j--){
            actualState[poc] = currentLevel[i][j];
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

loadLevel(1);
makeGrid();
setLevelLength();
var myInterval = setInterval(function (){
    fillState(actualPosition)
    fillGrid()
    console.log(actualLevelLength);
    console.log(actualPosition);
    actualPosition++;
    if (actualPosition===actualLevelLength-3)
        clearInterval(myInterval);

},changeTime)


window.addEventListener("resize",function (){
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight
    updateGrid();
})

