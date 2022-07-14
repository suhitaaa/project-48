
var bg
var bottomGround, topGround
var plane, planeImg
var obstacleTop, obstacleTopImg


var gameOver, gameOverImg
var restart, restartImg
var backgroundImg

var score = 0;

//game states      
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  bgImg = loadImage("assets/backgroundImg.png")
  

  planeImg = loadAnimation("assets/aeroplane.png")
  
  obsTop1 = loadImage("assets/bird.png")
  obsTop2 = loadImage("assets/cloud.png")
  obsTop3 = loadImage("assets/bird2.png")
  
  gameOverImg= loadImage("assets/gameover.png")
  restartImg = loadImage("assets/restart.png")



}

function setup(){

  createCanvas(400,400)
//background image
bg = createSprite(195,285,9,9);
bg.scale = 3.5;
bg.addImage(bgImg);


//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating plane     
plane = createSprite(100,200,20,50);
plane.addAnimation("plane",planeImg);
plane.scale = 0.3;
plane.debug = true;


//initialising groups
topObstaclesGroup = new Group();
barGroup = new Group();

//creating game over and restart sprites
gameOver = createSprite(220,200);
restart = createSprite(220,240);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;
restart.addImage(restartImg);
restart.scale = 0.5;
gameOver.visible = false;
restart.visible = false;


}

function draw() {
  

  if(gameState === PLAY){

    //making the plane jump
    if(keyDown("space")) {
      plane.velocityY = -6 ;
    }

    //adding gravity
     plane.velocityY = plane.velocityY + 2;

     
    Bar();

     //spawning top obstacles
     spawnObstaclesTop();

//condition for END state
if(topObstaclesGroup.isTouching(plane) || plane.isTouching(topGround)
|| plane.isTouching(bottomGround)){

gameState = END;
}


  }

  if(gameState === END) 
    {

      gameOver.visible = true;
      gameOver.depth = gameOver.depth+1
      restart.visible = true;
      restart.depth = restart.depth+1
          
          //all sprites should stop moving in the END state
          plane.velocityX = 0;
          plane.velocityY = 0;
          topObstaclesGroup.setVelocityXEach(0);
          barGroup.setVelocityXEach(0);
          
          //setting -1 lifetime so that obstacles don't disappear in the END state
          topObstaclesGroup.setLifetimeEach(-1);
         
          plane.y = 200;
          
          //resetting the game
          if(mousePressedOver(restart)) 
          {
                reset();
          }

    } 

    drawSprites();
    Score();     
}

function reset()
{
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  topObstaclesGroup.destroyEach();


  score = 0;
}


function spawnObstaclesTop() 
{
  if(World.frameCount % 60 === 0) {
    obstacleTop = createSprite(400,50,40,50);

//obstacleTop.addImage(obsTop1);

obstacleTop.scale = 0.1;
obstacleTop.velocityX = -4;

//random y positions for top obstacles
obstacleTop.y = Math.round(random(10,100));

//generate random top obstacles
var rand = Math.round(random(1,3));
switch(rand) {
  case 1: obstacleTop.addImage(obsTop1);
          break;
  case 2: obstacleTop.addImage(obsTop2);
          break;
  case 3: obstacleTop.addImage(obsTop3);
          break;
  default: break;
}

 //assign lifetime to the variable
obstacleTop.lifetime = 100;

plane.depth = plane.depth + 1;

topObstaclesGroup.add(obstacleTop);

  }
}


 function Bar() 
 {
         if(World.frameCount % 60 === 0)
         {
           var bar = createSprite(400,200,10,800);
          bar.velocityX = -6
        
          
          bar.velocityX = -6
          bar.depth = plane.depth;
          bar.lifetime = 70;

          bar.visible = false;

          barGroup.add(bar);
         }
}

function Score()
{
         if(plane.isTouching(barGroup))
         {
           score = score + 1;
         }
        textFont("algerian");
        textSize(30);
        fill("yellow");
        text("Score: "+ score, 240, 360);
       
  
}


