var backgroundImg, runningManImg, collidedManImg, stoneImg, gameOverImg, restartImg;
var collidedSound, jumpSound;
var backGround, man, stonesGroup, trashsGroup, invisibleGround, gameOver, restart;
var distance, speed, score, gameState, play, end;

function preload() {
  backgroundImg = loadImage("./assets/full_background.png");
  gameOverImg = loadImage("./assets/gameOver.png");
  restartImg = loadImage("./assets/restart.png");
  stoneImg = loadImage("./assets/stone.png");
  trash1Img = loadImage("./assets/Trash 1.jfif");
  trash2Img = loadImage("./assets/Trash 2.png");
  runningManImg = loadAnimation("./assets/Running Man Frame 1.png", "./assets/Running Man Frame 2.png", "./assets/Running Man Frame 3.png", "./assets/Running Man Frame 4.png");
  collidedManImg = loadAnimation("./assets/Running Man Frame 2.png");
  collidedSound = loadSound("./assets/collided.wav");
  jumpSound = loadSound("./assets/jump.wav");
}

function setup() {
  console.log("Game BY:");
  console.log("Johaan Paul");
  createCanvas(window.innerWidth ,window.innerHeight);

  backGround = createSprite(window.innerWidth /2, window.innerHeight /2 -60, window.innerWidth, window.innerHeight);
  backGround.scale = 0.7;
  backGround.addImage(backgroundImg);

  man = createSprite(window.innerWidth /4, window.innerHeight /1.3, window.innerWidth, window.innerHeight);
  man.scale = 2.5;
  man.addAnimation("running", runningManImg);
  man.addAnimation("collided", collidedManImg);
  man.setCollider("rectangle", 0, 0);

  gameOver = createSprite(window.innerWidth /2, window.innerHeight /2, window.innerWidth, window.innerHeight);
  gameOver.scale = 2;
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  invisibleGround = createSprite(window.innerWidth /2, window.innerHeight /1.05, window.innerWidth *3, window.innerHeight /5);
  invisibleGround.visible = false;
  invisibleGround.setCollider("rectangle", 0, 0);
  invisibleGround.debug = true;

  speed = -5;
  distance = 0;
  score = 0;
  play = 0;
  end = 1;
  gameState = play;
}

function draw() {
  background(0, 0, 0);
  backGround.velocityX = speed;
  if (gameState === play) {
    if (backGround.x < window.innerWidth/3.2) {
      backGround.x = window.innerWidth/2;
    }

    speed = speed -0.01;
    distance = distance + 0.5

    if(keyDown("space") && man.y >= window.innerHeight /1.35) {
      jumpSound.play();
      man.velocityY = -16;
    }
    man.velocityY = man.velocityY + 0.8
    man.collide(invisibleGround);
  }

  else if (gameState === end) {
    speed = 0;
    man.velocityY = 0;
    man.changeAnimation("collided", collidedManImg);
    gameOver.visible = true;
  }

  drawSprites();
  textSize(20);
  stroke(3);
  fill("black");
  text("score: " + score, window.innerWidth /2, 50);
  
}
