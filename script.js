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

// cactus
let cactusArray = [];

let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 70;
let cactusX = 700;
let cactusY = boardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;

// physics
// cactus moving left speed
let velocityX = -8;
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;

// cloud
let cloudWidth = 101;
let cloudHeight = 84;
let cloudX = 700;
let cloudY = 75;

let cloudImg;

let cloudArray = [];



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

    cactus1Img = new Image();
    cactus1Img.src = "./cactus1.png";

    cactus2Img = new Image();
    cactus2Img.src = "./cactus2.png";

    cactus3Img = new Image();
    cactus3Img.src = "./cactus3.png";


    cloudImg = new Image();
    cloudImg.src = "./cloud.png";

    requestAnimationFrame(update);
    // 1000 milliseconds = 1 seconds
    setInterval(placeCactus, 1000);

    document.addEventListener("keydown", moveDino);

}

function update() {

    requestAnimationFrame(update);

    if (gameOver) {
        return;
    }

    context.clearRect(0, 0, board.width, board.height);

    // dinosaur
    velocityY += gravity;
    // apply gravity to current dino.y, making sure it does not exceed the ground 
    dino.y = Math.min(dino.y + velocityY, dinoY);
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

    // cactus
    for (let i = 0; i < cactusArray.length; ++i)
    {
        let cactus = cactusArray[i];
        cactus.x += velocityX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);
    
            if (detectCollision(dino, cactus))
            {
                gameOver = true;
                dinoImg.src = "./dino-dead.png";
                dinoImg.onload = function() {
                    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
                }
            }
    
    }

    for (let i = 0; i < cloudArray.length; ++i)
    {
        let cloud = cloudArray[i];
        cloud.x += velocityX;
        context.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
    }


    // score
    context.fillStyle = "black";
    context.font = "20px courier";
    ++score;
    context.fillText(score, 5, 20);

}

function moveDino(e) {
    if (gameOver) {
        return;
    }

    if ((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY)
    {
        // jump
        velocityY = -10;
    }
    else if (e.code == "ArrowDown" && dino.y == dinoY)
    {
        // duck
    }
}

function placeCactus() {

    if (gameOver) {
        return;
    }

    // place the cactus
    let cactus = {
        img : null,
        x : cactusX,
        y : cactusY,
        width : null,
        height : cactusHeight
    }

    // It gives a value between 0 to 0.999...
    let placeCactusChance = Math.random();

    // 13% chance you get cactus3
    if (placeCactusChance > 0.87)
    {
        cactus.img = cactus3Img;
        cactus.width = cactus3Width;
        cactusArray.push(cactus);
    }
    // 29% chance you get cactus2
    else if (placeCactusChance > 0.71)
    {
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
        cactusArray.push(cactus);
    }
    // 43% chance you get cactus1
    else if (placeCactusChance > 0.57)
    {
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
        cactusArray.push(cactus);
    }

    if (cactusArray.length > 5) {
        // remove the first element from the array so that the array does not constantly grow
        cactusArray.shift();
    }
}

function placeCloud() {

    if (gameOver) {
        return;
    }

    let cloud = {
        img : cloudImg,
        x : cloudX,
        y : cloudY,
        width : cloudWidth,
        height : cloudHeight
    }

    let placeCloudChance = Math.random();

    // 30% chance you will get a cloud
    if (placeCloudChance > 0.7)
    {
        cloudArray.push(cloud);
    }

    if (cloudArray.length > 5)
    {
        cloudArray.shift();
    }

}

function detectCollision(a, b) {
    // a's top left corner doesn't reach b's top right corner
    // a's top right corner passes b's top left corner
    // a's top left corner doesn't reach b's bottom left corner
    // a's bottom left corner passes b's top left corner

    return (a.x < b.x + b.width) && 
    (a.x + a.width > b.x) && 
    (a.y < b.y + b.height) && 
    (a.y + a.height > b.y)
}