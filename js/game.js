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
var actualPosition = -1;
var actualLevelLength;
var changeTime = 500;
var carPosition = 1;
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var listenersAllowed = true;
var myInterval;




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
                actualState[poc] = currentLevel[i][j] + 5;
                if (actualState[poc]===5) {

                }else if(actualState[poc]===9){
                    console.log("win");
                    clearInterval(myInterval);
                    listenersAllowed = false;
                }else {
                    console.log("boom");
                    clearInterval(myInterval);
                    listenersAllowed = false;
                }

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
    prvky();


}
function prvky(){
    const title = document.createElement("div");
    title.setAttribute("class","title");

    const play=document.createElement("div");
    play.setAttribute("class","play");
    play.addEventListener("click",function (){
        startGame();
    })
    const help=document.createElement("div");
    help.setAttribute("class","help");
    help.onclick = function (){
        modal.style.display = "block";
    }
    modalWindow()

    game.appendChild(title);
    game.appendChild(play);
    game.appendChild(help);
}
function modalWindow(){
    var lol = document.createElement("info");
    lol.innerHTML = "<br><br> Crazy highway <br> Cieľom hry je prejsť s autíčkom až do cieľa. Na dráhe ho, ale čaká veľa prekážok ktorým sa musí vyhnúť. <br> Pohyb autíčka: <br> Ovládanie pomocou šípok doprava a doľava <br> Swipe doprava a doľava na telefóne <br> Prajeme vám zábavu pri hraní hry!!!!";


    var modalContent = document.getElementById("modal-content");
    modalContent.appendChild(lol);
    modalContent.classList.add("modal-content");

    let myModal = document.getElementById("myModal");
    myModal.appendChild(modalContent);


    span.onclick = function() {
        modal.style.display = "none";
    }
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

function play(){
    loadLevel(level);
    makeGrid();
    setLevelLength();
    fillState(0);
    putCar(carPosition);
    fillGrid();
    listenersAllowed = true;
    myInterval = setInterval(function (){
        actualPosition++;
        fillState(actualPosition)
        fillGrid()
        if (actualPosition===actualLevelLength-4)
            clearInterval(myInterval);

    },changeTime)
}

loadLevel(level);
menu();

function startGame(){
    game.innerHTML = "";
    actualState[actualState.length-1] = 0;
    makeGrid();
    fillGrid();
    setLevelLength();
    fillState(0);
    putCar(carPosition);
    fillGrid();
    setCycle();
    const helpInGame=document.createElement("div");
    helpInGame.setAttribute("class","helpingame");
    helpInGame.onclick = function (){
        modal.style.display = "block";
    }
    helpInGame.style.width = String(gameWidth/5 + "px");
    helpInGame.style.height = String(gameHeight/11 + "px");
    game.appendChild(helpInGame);

}
/*makeGrid();
setLevelLength();
fillState(0);
putCar(carPosition);
fillGrid();
setCycle();*/



window.addEventListener("resize",function (){
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight
    updateGrid();
})

document.addEventListener('keydown',function (e){
   if(listenersAllowed) {
       if (e.code === 'ArrowLeft')
           carMoveLeft();

       else if (e.code === "ArrowRight")
           carMoveRight();
       reprint();
   }
})

document.addEventListener('swiped-left',function (e){
    if(listenersAllowed) {
        carMoveLeft();
        reprint();
    }
})

document.addEventListener('swiped-right',function (e){
    if(listenersAllowed) {
        carMoveRight();
        reprint();
    }
})


