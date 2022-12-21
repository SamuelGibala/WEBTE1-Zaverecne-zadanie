mainDiv = document.getElementById("game");


pics = [ "../img/cesta.jpg" ,
    "../img/diera.jpg" ,
    "../img/konar.jpg" ,
    "../img/kuzel.jpg" ,
    "../img/ciel.jpg",
    "../img/auto_na_ceste.jpg",
    "../img/auto_v_diere.jpg",
    "../img/auto_s_konarom.jpg",
    "../img/auto_s_kuzelom.jpg",
    "../img/auto_v_cieli.jpg"
]

road = [5,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,3,0,0,0,4,4,4,4,0,0,0,0]
var segments = [];
var photos = [];
console.log(road.length);
for (let i = road.length-1; i >= 0; i--) {
    segments[i] = document.createElement("div");
    segments[i].setAttribute("class","segment");
    photos[i] = document.createElement("img");
    photos[i].setAttribute("src",pics[road[i]])
    segments[i].appendChild(photos[i]);
    mainDiv.appendChild(segments[i])
}