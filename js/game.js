//import data from '../json/game.json' assert {type: 'json'};

async function getJson(){
    const response = await fetch("https://webte1.fei.stuba.sk/~xgibala/zaverecne-zadanie/json/game.json");
    return await response.json();
}

getJson().then((data)=>{
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
    var listenersAllowed = false;
    var myInterval;
    var stopped = false;
    var inBetween = false;
    var beta;
    var gamma;
    var moved = false

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
                        inBetween = true;
                        listenersAllowed = false;
                        if(level<=9) {
                            level++;
                            setLevelCookie();
                            var divko = document.createElement("div");
                            divko.setAttribute("class","divko");
                            var info = document.createElement("p");
                            info.setAttribute("class","pi");
                            info.innerHTML = "<p class='aaa'> EXCELLENT!! </p>";
                            var neLevel = document.createElement("div");
                            neLevel.setAttribute("class","nextlevel");
                            neLevel.addEventListener("click",function (){
                                inBetween = false;
                                nextLevel();
                            })
                            game.appendChild(divko);
                            game.appendChild(info);
                            game.appendChild(neLevel);
                        }else  {
                            var divko = document.createElement("div");
                            divko.setAttribute("class","divko");
                            var info = document.createElement("p");
                            info.setAttribute("class","pi");
                            info.innerHTML = "<p class='aaa'> Congratulations you passed all levels!!! <br> We will try to make new levels soon </p>";
                            game.appendChild(divko);
                            game.appendChild(info);
                        }


                    }else {
                        console.log("boom");
                        clearInterval(myInterval);
                        inBetween = true
                        listenersAllowed = false;

                        var divko = document.createElement("div");
                        divko.setAttribute("class","divko");
                        var infoT = document.createElement("p");
                        infoT.setAttribute("class","pi");
                        infoT.innerHTML = "<p class='aaa'> OOPS, CRASH, TRY AGAIN!! </p>";
                        var tryLevel = document.createElement("div");
                        tryLevel.setAttribute("class","trylevel");
                        tryLevel.addEventListener("click",function (){
                            inBetween = false;
                            nextLevel();
                        })
                        game.appendChild(divko);
                        game.appendChild(infoT);
                        game.appendChild(tryLevel);
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

    function resetAll(){
        let Nsegments = segments.length;

        for (let i = 0; i < Nsegments; i++) {
            while (segments[i].hasChildNodes()){
                segments[i].removeChild(segments[i].firstChild);
            }
        }

        while (game.hasChildNodes()){
            game.removeChild(game.firstChild)
        }

        segments = [];
        photos = [];
        actualState = [];
        actualPosition = -1;
        carPosition = 1;
        listenersAllowed = true;

    }

    function nextLevel(){
        resetAll();
        loadLevel(level);
        playGame();
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
        loadLevel(level);
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
            playGame();
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
        var guide = document.createElement("info");
        guide.innerHTML = "<br><h3> Crazy highway </h3>" +
            "<p class='helpText'> The goal of the game is to drive the car to the finish line. But there are many obstacles waiting for him on the track, which you have to avoid</p>" +
            "<h4> Car movement on the PC: </h4>" +
            "<ul><li> Right arrow to move the car one lane to the right,</li> " +
            "<li> Left arrow to move the car one lane to the left.</li></ul> " +
            "<h4> Car movement on the phone: </h4>" +
            "<ul><li>Swipe right to move the car one lane to the right,</li>" +
            "<li>Swipe left to move the car one lane to the left,</li>" +
            "<li>Tilt the phone to the right to move the car one lane to the right,</li>" +
            "<li>Tilt the phone to the left to move the car one lane to the left.</li></ul>" +
            "<p class='helpText'>Enjoy the game!</p>" +
            "<p id='copyright'> © 2022 Samuel Gibala, Matúš Kornhauser <br>" +
            "Designed by Sabina Čilliková </p>";
    
    
        var modalContent = document.getElementById("modal-content");
        modalContent.appendChild(guide);
        modalContent.classList.add("modal-content");

        let myModal = document.getElementById("myModal");
        myModal.appendChild(modalContent);


        span.onclick = function() {
            modal.style.display = "none";
            if (stopped && !inBetween){
                stopped = false;
                listenersAllowed = true;
                setTimer();
                setTimeout(function (){},2000)
            }
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

    function setTimer(){
        myInterval = setInterval(function (){
            actualPosition++;
            fillState(actualPosition)
            fillGrid()
            if (actualPosition===actualLevelLength-4)
                clearInterval(myInterval);

        },changeTime)
    }

    function stopGame(){
        listenersAllowed = false;
        clearInterval(myInterval);
        stopped = true;
    }

    function playGame(){
        game.innerHTML = "";
        actualState[actualState.length-1] = 0;
        makeGrid();
        setLevelLength();
        fillState(0);
        putCar(carPosition);
        fillGrid();
        listenersAllowed = true;
        setTimer();
        const helpInGame=document.createElement("div");
        helpInGame.setAttribute("class","helpingame");
        helpInGame.onclick = function (){
            if (!inBetween) {
                stopGame();
            }
            modal.style.display = "block";
        }
        helpInGame.style.width = String(gameWidth/5 + "px");
        helpInGame.style.height = String(gameHeight/11 + "px");

        const levelsN = document.createElement("div");
        levelsN.setAttribute("class","levelsN");
        levelsN.innerHTML = "Level: " + level;
        game.appendChild(helpInGame);
        game.appendChild(levelsN);
    }

    function setCookie(cname,cvalue) {
        document.cookie = cname + "=" + cvalue + ";";
    }

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function checkCookie() {
        let cookieLevel = getCookie("level");
        if (cookieLevel !== "") {
            level = parseInt(cookieLevel);
            //setCookie("level", level);
        } else {
            level = 1;
            setCookie("level", level);
        }
    }

    function setLevelCookie(){
        setCookie("level",level);
    }

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

    document.addEventListener('swiped-left',function (){
        if(listenersAllowed) {
            carMoveLeft();
            reprint();
        }
    })

    document.addEventListener('swiped-right',function (){
        if(listenersAllowed) {
            carMoveRight();
            reprint();
        }
    })

    function handleOrientation(event){

        beta = event.beta;
        gamma = event.gamma;
        if (beta<45 && gamma<-10) {
            if (!moved){
                carMoveLeft();
                moved = true;
            }
        } else if(beta<45 && gamma>10) {
            if (!moved){
                carMoveRight();
                moved = true;
            }

        } else if (beta>55){
            moved = false;
        }
    }

    window.addEventListener("deviceorientation", handleOrientation);

    // core code HERE
    checkCookie();
    menu();

})



