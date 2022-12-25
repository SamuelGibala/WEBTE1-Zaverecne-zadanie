import data from '../json/game.json' assert {type: 'json'};
var game = document.getElementById("game");
var level = 1;
var currentLevel;
var conversionTable = data.conversion_table;
var alternativeText = data.alt;
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight
var segments = [];
var gameHeight;
var gameWidth;



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

loadLevel(10);
makeGrid();


window.addEventListener("resize",function (){
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight
    updateGrid();
})

