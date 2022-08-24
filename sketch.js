var bomba, bombaImg;
var cenário, cenárioImg;
var pedra, pedraImg;
var pedraGroup

var score = 0;

const PLAY = 1;
const END = 0;
var gameState = PLAY;

function preload(){
cenárioImg = loadImage("ground2.png");
pedraImg = loadImage("pedra.jpg");
bombaImg = loadImage("missile.png");

}

function setup() {
  
  createCanvas(600, 200);
  cenário = createSprite(200,180,400,10);
  cenário.addImage("cenário", cenárioImg);
  cenário.x = cenário.width /2;
  cenário.velocity.x = -8;

  bomba = createSprite(50,160,400,20);
  bomba.addImage("bomba", bombaImg);
  bomba.setCollider("circle", 0, 0, 50);
  bomba.scale = 0.1;
  bomba.rotation = 90;
  
  

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
 
  pedraGroup = new Group();
}

function draw() {
  
background("blue");



 text("Score: " + score, 500, 50);

 if (gameState === PLAY) {
  cenário.velocityX = -(4 + score/100);
  score = score + Math.round(getFrameRate()/60);
 
  if(keyDown("up") && bomba.y >= 150) {
    bomba.velocityY = -12;
    
  }

 bomba.velocityY = bomba.velocityY + 0.8;
  
  if (cenário.x < 0){
    cenário.x = cenário.width/2;
  }
  bomba.collide(invisibleGround);
  
   Spawnpedra();
 
   if (pedraGroup.isTouching(bomba)) {       
    gameState = END;}
    
 }
  else if (gameState === END) {
      cenário.velocityX = 0;
      bomba.velocityY = 0;    
      pedraGroup.setLifetimeEach(-1);
      pedraGroup.setVelocityXEach(0);
  }  

  drawSprites();
}



function Spawnpedra()
{
  if(frameCount % 80 === 0){
    var pedra=createSprite(600,185,40,10);
    pedra.addImage(pedraImg);
    pedra.scale = 0.01 
    pedra.velocityX=-5;
    pedra.scale=0.05;    
    pedra.depth=bomba.depth;
    pedra.lifetime  = 200
    pedraGroup.add(pedra);
} 
}