var richtung = "right";
var speed;
var timer;
var level;
var object_x;
var object_y;




function load() {
    document.getElementById('player').style.top = "240px";
    document.getElementById('player').style.left = "240px";

    document.getElementById('target').style.top = "15px";
    document.getElementById('target').style.left = "240px";
    start(true);//isInit = true
}



function next() {
    clearInterval(timer);
    load();
    creat_new();
    timer = setInterval(move, speed);
}




function start(isInit) {
    isInit = isInit || false;
    level = 1;
    speed = 100;

    document.getElementById('level_number').innerHTML = level;
    document.getElementById('player').classList.remove("invisible");

    if(!isInit) next();
}



function stop() {
    clearInterval(timer);

    document.getElementById('player').className = "invisible";
    alert("Game Over!");
}



function creat_new() {
    object_x = Math.floor(Math.random() * 33) * 15;
    object_y = Math.floor(Math.random() * 33) * 15;

    var target = document.getElementById('target');
    target.style.top = object_y + "px";
    target.style.left = object_x + "px";

    document.getElementById('level_number').innerHTML = level;
}



function captured() {
    speed -= 2;
    level += 1;
    clearInterval(timer);
    timer = setInterval(move, speed);
    creat_new();
}




document.onkeydown = function(event) {

    if (event.keyCode == 87) { //87 -- W
        richtung = "up";
    } else if (event.keyCode == 65) { //65 -- A
        richtung = "left";
    } else if (event.keyCode == 83) { //83 -- S
        richtung = "down";
    } else if (event.keyCode == 68) { //68 -- D
        richtung = "right";
    }

    document.getElementById('player').className = richtung;

};

function move() {
    var pos_y = parseInt(document.getElementById('player').style.top);
    var pos_x = parseInt(document.getElementById('player').style.left);


    if (richtung == "up") { //87 -- W
        pos_y -= 15;
    } else if (richtung == "left") { //65 -- A
        pos_x -= 15;
    } else if (richtung == "down") { //83 -- S
        pos_y += 15;
    } else if (richtung == "right") { //68 -- D
        pos_x += 15;
    }

    document.getElementById('player').style.top = pos_y + 'px';
    document.getElementById('player').style.left = pos_x + 'px';

    document.getElementById('x_').innerHTML = pos_x;
    document.getElementById('y_').innerHTML = pos_y;

    object_y = parseInt(document.getElementById('target').style.top);
    object_x = parseInt(document.getElementById('target').style.left);

    if (pos_x < 0 || pos_x > 510 - 15 || pos_y < 0 || pos_y > 510 - 15) stop();
    if (pos_x == object_x && pos_y - 15 == object_y) captured();

}

load();
