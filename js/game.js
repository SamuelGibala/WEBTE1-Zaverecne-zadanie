import data from '../json/game.json' assert {type: 'json'};
var game = document.getElementById("game");
var level = 1;
var currentLevel;
var conversionTable = data.conversion_table;
var alternativeText = data.alt;
var screenWidth = window.outerWidth;
var screenHeight = window.outerHeight



function loadLevel(level){
    currentLevel = data.levels[level-1];
}

function makeGrid(){
    setWidthHeight();

}


function setWidthHeight(){
    let Ncolumns = currentLevel[0].length;

    if (screenWidth>screenHeight) {
        let side = screenHeight/4;
        game.style.width = String(Ncolumns*side + "px");
        game.style.height = String(screenHeight + "px");
    }else {
        if ((screenHeight/4)*Ncolumns <= screenWidth){
            let side = screenHeight/4;
            game.style.width = String(Ncolumns*side + "px");
            game.style.height = String(screenHeight + "px");
        }else {
            let side = screenWidth/Ncolumns;
            game.style.width = String(screenWidth + "px");
            game.style.height = String(side*4 + "px");
            game.style.marginTop = String((screenHeight-side*4)/2 + "px")
        }
    }
}

loadLevel(1);
makeGrid();


window.addEventListener("resize",function (){
    console.log(screenWidth = window.outerWidth);
    console.log(screenHeight = window.outerHeight);
    loadLevel(1);
    makeGrid();
})

