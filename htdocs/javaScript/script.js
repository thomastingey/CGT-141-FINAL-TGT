var idMod = 0

function addEnemy(){
    var space = document.getElementById("enemy-space")
    
    var enemy = document.getElementById("enemy-template").cloneNode(true)
    enemy.setAttribute("id", "enemy" + idMod)
    enemy.setAttribute("class", "enemy")
    idMod++

    space.appendChild(enemy)
}