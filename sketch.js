var player;

var bird1;
var bird2;
var gameOver;
var restart;
var lamp;
var blast;
var sun;
var win;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var obstacleGroup;
var lampGroup;
var score = 0;

function preload() {
    playerImg = loadImage("./Assets/Balloon.png");
    cityImg = loadImage("./Assets/background.jpg");
    bird1Img = loadImage("./Assets/bird1.png");
    bird2Img = loadImage("./Assets/bird2.png");
    gameOverImg = loadImage("./Assets/gameOver.png");
    restartImg = loadImage("./Assets/restart.png");
    lampImg = loadImage("./Assets/lamp.png");
    blastImg = loadImage("./Assets/blast.png");
    sunImg = loadImage("./Assets/sun.png");
    winImg = loadImage("./Assets/win.png");
}

function setup() {
createCanvas(700,500);


player = createSprite(200,150,10,10);
player.addImage("player", playerImg);
player.scale = 0.09;
player.velocityY = 0.3;

gameOver = createSprite(100,300);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.3;

restart = createSprite(400,350);
restart.addImage(restartImg);
restart.scale = 0.2;

blast = createSprite(300,230);
blast.scale = 0.2

sun = createSprite(80,100);
sun.addImage(sunImg);
sun.scale = 0.3

win = createSprite(200,200);
win.scale = 0.3;
win.visible = false;

gameOver.visible = false;
restart.visible = false;

obstacleGroup = createGroup();
lampGroup = createGroup();
score = 0;

  
}

function draw() {
  background("lightblue")

  textSize(40);
  fill("black");
  text("Score: " +score, 450,70);

if(gameState === PLAY){


  if(keyDown(RIGHT_ARROW)){
    player.x = player.x+2
  }
  
  if(keyDown(LEFT_ARROW)){
      player.x = player.x-2
  }
  
  if(keyDown(UP_ARROW)){
      player.y = player.y-2
  }
  
  if(keyDown(DOWN_ARROW)){
      player.y = player.y+2
  }



  blast.visible = false;
  player.visible = true;
  score = score+ Math.round(getFrameRate()/60)

  spawnLamps();
  obstacles();

  if(obstacleGroup.isTouching(player)){
    gameState = END;
     blast.addImage(blastImg);
     blast.visible = true;
     player.visible = false;
    }

  if(lampGroup.isTouching(player)){
    gameState = END;
    blast.addImage(blastImg);
    blast.visible = true;
    player.visible = false;
  }

  if(score === 500) {
    win.addImage(winImg);
    win.visible = true;
    obstacleGroup.setVelocityXEach(0);
    lampGroup.setVelocityXEach(0);
    player.velocityX = 0;
    player.velocityY = 0;
    obstacleGroup.destroyEach();
    lampGroup.destroyEach();
    gameState = END;
    gameOver.visible = false;
  }
}


else if(gameState === END){
player.velocityY = 0;
obstacleGroup.setVelocityXEach(0);
lampGroup.setVelocityXEach(0);

gameOver.visible = false;
restart.visible = true;

if(mousePressedOver(restart)){
  reset();
}
}



  drawSprites();


}

function obstacles() {
  if(frameCount%60===0){
  bird = createSprite(700,200,10,10);
  bird.velocityX = -2;

  var rand = Math.round(random(1, 3))
  bird.y = Math.round(random(250,100))

  switch(rand){
    case 1: bird.addImage(bird1Img);
    break;

    case 2: bird.addImage(bird2Img);
    break;

    default: break;
  }

  bird.scale = 0.1;
  bird.lifetime = 500;
  obstacleGroup.add(bird);
  }
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstacleGroup.destroyEach();
  score = 0;
  lampGroup.destroyEach();
  win.visible = false;
}

function spawnLamps() {
  if(frameCount%120 === 0){
   lamp = createSprite(700,440);
   lamp.velocityX = -2;
   lamp.addImage(lampImg);
   lamp.scale = 0.07
   lampGroup.add(lamp);

   
  }
}