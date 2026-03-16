var idMod = 0;
var xp = 0;
var low = 0;
var medium = 0;
var high = 0;

const NONE = 0;
const LOW = 1;
const MEDIUM = 2;
const HIGH = 3;

var budget = NONE;

const enemyData = [
    ["0",10],
    ["1/8",25],
    ["1/4",50],
    ["1/2",100],
    ["1", 200],
    ["2", 450],
    ["3", 700],
    ["4", 1100],
    ["5", 1800],
    ["6", 2300],
    ["7", 2900],
    ["8", 3900],
    ["9", 5000],
    ["10", 5900],
    ["11", 7200],
    ["12", 8400],
    ["13", 10000],
    ["14", 11500],
    ["15", 13000],
    ["16", 15000],
    ["17", 18000],
    ["18", 20000],
    ["19", 22000],
    ["20", 25000],
    ["21", 33000],
    ["22", 41000],
    ["23", 50000],
    ["24", 62000],
    ["25", 75000],
    ["26", 90000],
    ["27", 105000],
    ["28", 120000],
    ["29", 135000],
    ["30", 155000]
];

const playerData = [
    [1, 50, 75, 100],
    [2, 100, 150, 200],
    [3, 150, 225, 400],
    [4, 250, 375, 500],
    [5, 500, 750, 1,100],
    [6, 600, 1000, 1400],
    [7, 750, 1300, 1700],
    [8, 1000, 1700, 2100],
    [9, 1300, 2000, 2600],
    [10, 1600, 2300, 3100],
    [11, 1900, 2900, 4100],
    [12, 2200, 3700, 4700],
    [13, 2600, 4200, 5400],
    [14, 2900, 4900, 6200],
    [15, 3300, 5400, 7800],
    [16, 3800, 6100, 9800],
    [17, 4500, 7200, 11700],
    [18, 5000, 8700, 14200],
    [19, 5500, 10700, 17200],
    [20, 6400, 13200, 22000]
]

function setUp(){
    for(var i in enemyData){
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = enemyData[i][0];
        //console.log(option)
        document.getElementById("npc-template").children[5].appendChild(option)
    }

    for(var i in playerData){
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = playerData[i][0];
        option.setAttribute("value", playerData[i][0]);
        //console.log(option)
        document.getElementById("player-template").children[5].appendChild(option);
    }

    addEnemy();

    addPlayer();
    addPlayer();
    addPlayer();
    addPlayer();
}

function update(){
    xp = 0
    low = 0
    medium = 0
    high = 0

    let enemySpace = document.getElementById("enemy-space")
    let playerSpace = document.getElementById("player-space")

    for(var i = 0; i < enemySpace.childElementCount; i++){
        if (enemySpace.children[i].getAttribute("class") == "enemy"){
            let selected = enemySpace.children[i].children[5].value;
            let quantity = enemySpace.children[i].children[8].value;
            if(selected > -1){
                xp += enemyData[selected][1] * quantity;
            }
        }
    }

    for(var i = 0; i < playerSpace.childElementCount; i++){
        if (playerSpace.children[i].getAttribute("class") == "ally"){
            let selected = playerSpace.children[i].children[5].value;
            let quantity = playerSpace.children[i].children[8].value;
            if(selected > -1){
                xp -= enemyData[selected][1] * quantity;
            }
        }
        if (playerSpace.children[i].getAttribute("class") == "player"){
            let level = playerSpace.children[i].children[5].value
            low += playerData[level - 1][1];
            medium += playerData[level - 1][2];
            high += playerData[level - 1][3];
        }
    }

    document.getElementById("xp-value").innerHTML = "<em>Xp Value: </em>" + 
        Math.max(0, xp).toLocaleString("en-US") + "xp";
    document.getElementById("low").innerHTML = "<em>Low: </em>" +
        low.toLocaleString("en-US") + "xp"
    document.getElementById("medium").innerHTML = "<em>Medium: </em>" +
        medium.toLocaleString("en-US") + "xp"
    document.getElementById("high").innerHTML = "<em>High: </em>" +
        high.toLocaleString("en-US") + "xp"
    

    let rating = document.getElementById("rating")
    rating.setAttribute("class", "info")
    rating.innerHTML = "<em>Difficulty Rating: </em>"
    if(xp <= low){
        rating.innerHTML += "Low"
    }else if(xp <= medium){
        rating.innerHTML += "Medium"
    }else if(xp <= high){
        rating.innerHTML += "High"
    }else{
        rating.innerHTML += "Deadly"
        rating.setAttribute("class", "warning")
    }



    let budgetText = document.getElementById("xp-remaining")
    let remaining;

    switch(budget){
        case LOW:
            remaining = low-xp
            break;
        case MEDIUM:
            remaining = medium-xp
            break;
        case HIGH:
            remaining = high-xp
            break;
        default:
            remaining = "--"
            break;
    }

    if (remaining < 0){
        budgetText.setAttribute("class", "warning");
    }else{
        budgetText.setAttribute("class", "info");
    }

    budgetText.innerHTML = "<em>Xp Remaining: </em>" +
        remaining.toLocaleString("en-US")
}

function setBudget(newBudget){

    if (budget == newBudget){
        budget = NONE
    }else{
        budget = newBudget
    }

    document.getElementById("low").setAttribute("class", "not-selected");
    document.getElementById("medium").setAttribute("class", "not-selected");
    document.getElementById("high").setAttribute("class", "not-selected");

    switch (budget){
        case LOW:
            document.getElementById("low").setAttribute("class", "selected");
            break;
        case MEDIUM:
            document.getElementById("medium").setAttribute("class", "selected");
            break;
        case HIGH:
            document.getElementById("high").setAttribute("class", "selected");
            break;
    }

    update()
}


function addEnemy(){
    addNPC(document.getElementById("enemy-space"), "enemy");
}

function addAlly(){
    addNPC(document.getElementById("player-space"), "ally");
}

function addPlayer(){
    var player = document.getElementById("player-template").cloneNode(true);
    player.setAttribute("id", "player" + idMod);
    player.setAttribute("class", "player");
    player.children[5].setAttribute("value", 1)
    idMod++;

    var space = document.getElementById("player-space")
    space.appendChild(player);
    update();
}

function addNPC(space, attitude){
    
    var NPC = document.getElementById("npc-template").cloneNode(true);
    NPC.setAttribute("id", String(attitude) + idMod);
    NPC.setAttribute("class", attitude);
    idMod++;

    space.appendChild(NPC);
    update();
}