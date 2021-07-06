var PLAY = 1;
var END = 0;
var gameState = PLAY;

var plane, planeImg;
var back, backImg;
var obstacle, obstacleImg, obstaclesGroup;
var bullet, bulletImg;
var shot;
var shotNum = 5;
var gameState = "play";
var lives = 3;

function preload(){
  planeImg = loadImage("fly_1.png")
  backImg = loadImage("backImg.jpg")
  obstacleImg = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png","obstacle5.png","obstacle6.png","obstacle7.png","obstacle8.png");
  bulletImg = loadAnimation("bullet1.png","bullet2.png","bullet3.png","bullet4.png","bullet5.png");
  planeDead = loadImage("dead.png")

}
function setup() {

  createCanvas(1000,500);

  back = createSprite(500,250);
  back.addImage("back",backImg);
  back.scale = 2
 
  plane = createSprite(120, 180, 50, 50);
  plane.addImage("plane",planeImg)
  plane.addImage("dead",planeDead)
  plane.scale = 0.20

  obstaclesGroup = new Group()

  bulletsGroup = new Group()

  score = 0;

  shotsGroup = new Group()
}

function draw() {
  background(0);
  
  if (gameState==="play"){

   back.velocityX = -2;
   if(back.x < 400){
      back.x = 500

    }

   spawnObstacles();

   spawnShots();

   if(keyDown("space")){
     bullet = createSprite(140,180)
     bullet.addAnimation("bullet",bulletImg);
     bullet.scale = 0.6;
     bullet.velocityX = 4;
     bulletsGroup.add(bullet);
     if(shotNum > 0){
     shotNum = shotNum - 1;
     }

     else {
       gameState = "end";
     }
     
   }

   if(obstaclesGroup.isTouching(plane)){
   plane.changeAnimation("dead",planeDead);
   
   obstaclesGroup[0].destroy();

   if (lives > 0){
     lives = lives-1;
   }
   else{
     gameState = "end";
   }


   }

   if (keyDown(UP_ARROW)){
    plane.y = plane.y-3;
   }

   if (keyDown(DOWN_ARROW)){
     plane.y = plane.y+3  
    }

    if (obstaclesGroup.isTouching(bulletsGroup)){
      obstaclesGroup[0].destroy();
    }

    if (shotsGroup.isTouching(plane)){
      shotsGroup[0].destroy();
      shotNum = shotNum + 1;
    }
  
  
  drawSprites();

  textSize(20);
  fill("white");
  text("SCORE: "+ score, 850,50);
  text("BULLETS: "+ shotNum, 50,50);
  text("LIVES: "+ lives, 450,50);
  }
  else if(gameState==="end"){

    textSize(50);
    fill("red");
    text("GAME OVER!!!", 380,250);


  }
}



function spawnObstacles(){
       if(frameCount%100===0){
         obstacle = createSprite(1000,180);
         obstacle.velocityX = -3;
         obstacle.addAnimation("flyingBird", obstacleImg);
         obstacle.scale = 0.7
         obstacle.y = Math.round(random(70,250))
         obstaclesGroup.add(obstacle);
       }

}

function spawnShots(){
       if(frameCount%125===0){
       shot = createSprite(1000,130,20,10);
       shot.velocityX = -4;
       shot.y = Math.round(random(80,350))
       shotsGroup.add(shot);

       }

}