import data from '../json/game.json' assert {type: 'json'};

var level = 1;
var currentLevel;
var conversionTable = data.conversion_table;
var alternativeText = data.alt;


function loadLevel(level){
    currentLevel = data.levels[level-1];
}
