// board
let board;
let boardWidth = 750;
let boardHeight = 250;
let content;

// dinosaur
let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg;

let dino = {
    x : dinoX,
    y : dinoY,
    width : dinoWidth,
    height : dinoHeight
}


window.onload = function() {

    board = document.getElementById("board");
    board.height = boardHeight ;
    board.width = boardWidth;

    // This is used for drawing on the board
    context = board.getContext("2d");

    // This is used for drawing the initial dinosaur
    // context.fillStyle = "green";
    // context.fillRect(dino.x, dino.y, dino.width, dino.height);

    dinoImg = new Image();
    dinoImg.src = "./dino.png";
    dinoImg.onload = function() {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }

    requestAnimationFrame(update);

}

function update() {

    requestAnimationFrame(update);

    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

}

