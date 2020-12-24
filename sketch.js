var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacles1;
var obstacles2;
var obstacles3;
var obstacles4;
var obstacles5;
var obstacles6;
var score = 0;
var obstaclesGroup, cloudGroup;
var END = 0
var PLAY = 1
var gameState = PLAY
var gameOver, gameOverImg
var restart, restartImg
var dieSound, jumpSound, checkPointSound; 



var cloudImage;
var obstacles;
function preload() {
  console.count("this is preload")
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")

  obstacles1 = loadImage("obstacle1.png")

  obstacles2 = loadImage("obstacle2.png")

  obstacles3 = loadImage("obstacle3.png")

  obstacles4 = loadImage("obstacle4.png")

  obstacles5 = loadImage("obstacle5.png")

  obstacles6 = loadImage("obstacle6.png")

  restartImg = loadImage("restart.png")

  gameOverImg = loadImage("gameOver.png")

  dieSound = loadSound("die.mp3")

  jumpSound = loadSound("jump.mp3")

  checkPointSound = loadSound("die.mp3")



}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.count("this is setup")
  //create a trex sprite
  trex = createSprite(50, height-90, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("colliding", trex_collided)
  trex.scale = 0.5;
  //trex.debug=true
  trex.setCollider("circle", 0, 0, 40)
  //create a ground sprite
  ground = createSprite(200, height-70, width, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -4;

  invisibleGround = createSprite(200, height-60, width, 20);
  invisibleGround.visible = false;
  cloudGroup = new Group();
  obstaclesGroup = new Group();
  gameOver = createSprite(width/2, height/2-30, 20, 20);
  gameOver.addImage("gameOver", gameOverImg)
  gameOver.scale = 0.5
  restart = createSprite(width/2, height/2, 20, 20);
  restart.addImage("restart", restartImg)
  restart.scale = 0.5



}

function draw() {

  background(255);
  text("score = " + score, width-100, height-280)
  text("Armaan khokhar", 50, height-280)
  if (gameState == PLAY) {


    if (score % 100 == 0 && score > 0) {
      checkPointSound.play()
      ground.velocityX += -1
    }

    if (score % 10 == 0) {
   
      // ground.velocityX=ground.velocityX-1 
    }

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    score = Math.round(getFrameRate() / 6)+score
    if ((keyDown("space") || touches.length>0) && trex.y > height-100) {
      trex.velocityY = -10;
      touches=[];
      jumpSound.play()

    }
    spawnobstacles();
    spawnCloud();
    if (trex.isTouching(obstaclesGroup)) {
      gameState = END
      trex.changeAnimation("colliding", trex_collided)
      dieSound.play()
    }
    gameOver.visible = false
    restart.visible = false

  }
  else if (gameState == END) {
    ground.velocityX = 0
    cloudGroup.setVelocityXEach(0)
    obstaclesGroup.setVelocityXEach(0)
    cloudGroup.setLifetimeEach(-1)
    obstaclesGroup.setLifetimeEach(-1)
    gameOver.visible = true
    restart.visible = true
    if (mousePressedOver(restart)||touches.length>0) {
      reset()
      touches=[];
    }
  }
  trex.velocityY = trex.velocityY + 0.8
  trex.collide(invisibleGround);


  drawSprites()
}
function reset() {
  cloudGroup.destroyEach()
  obstaclesGroup.destroyEach()
  score=0 
  gameState=PLAY
  trex.changeAnimation("running", trex_running);
}



function spawnCloud() {
  if (frameCount % 40 == 0) {
    var cloudHeight = Math.round(random(height-250, height-200))
    var cloud = createSprite(width, cloudHeight, 20, 20)
    cloud.velocityX = -8-(score/100)
    cloud.addImage(cloudImage)
    cloud.scale = 0.2;


    trex.depth = cloud.depth + 1

    cloud.lifetime = 800
    cloudGroup.add(cloud)
  }
}
function spawnobstacles() {
  if (frameCount % 50 == 0) {
    var obstacles = createSprite(width, height-70, 10, 20)
    obstacles.velocityX = -10 - (score / 100)
    obstacles.scale = 0.1;
    var selectobstacles = Math.round(random(1, 6))
    switch (selectobstacles) {
      case 1: obstacles.addImage(obstacles1);
        break;
      case 2: obstacles.addImage(obstacles2);
        break;
      case 3: obstacles.addImage(obstacles3);
        break;
      case 4: obstacles.addImage(obstacles4);
      obstacles.scale=.05  
      break;
      case 5: obstacles.addImage(obstacles5);
      obstacles.scale=.05
        break;
      case 6: obstacles.addImage(obstacles6);
        break;
      default: break;
    }
    obstacles.lifetime = 800
    obstaclesGroup.add(obstacles)
  }


}