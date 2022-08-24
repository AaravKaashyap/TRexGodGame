var gameover, restart, gameoverimg,restartimg;
var die,checkpoint,jump;
// play state
var game_state = 0
var score = 0 
var cactus_group;
var clouds_group;

var ob1,ob2,ob3,ob4,ob5,ob6
var clone_ground;
var trex ,trex_running;
var ground,ground_img
var cloud, cloud_img;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png")
  trex_collided = loadAnimation("trex_collided.png  ")
  ground_img = loadImage("ground2.png")
  cloud_img = loadImage("cloud.png")
  ob1 = loadImage("obstacle1.png")
  ob2 = loadImage("obstacle2.png")
  ob3 = loadImage("obstacle3.png")
  ob4 = loadImage("obstacle4.png")
  ob5 = loadImage("obstacle5.png")
  ob6 = loadImage("obstacle6.png")
  die = loadSound("die.mp3")
  jump = loadSound("jump.mp3")
  checkpoint = loadSound("checkpoint.mp3")
  gameoverimg = loadImage("gameOver.png")
  restartimg =  loadImage("restart.png")
}

function setup(){
  createCanvas(600,200)
  clouds_group = createGroup()
  cactus_group = new Group()
  //create a trex sprite
  trex = createSprite(200,100,30,30)
  trex.addAnimation("run",trex_running)
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.3
  ground = createSprite(300,190,600,200)
  ground.addImage(ground_img)
  ground.x = ground.width/2
  clone_ground = createSprite(300,200,600,5)
  clone_ground.visible = false
  trex.setCollider("circle",0,0,40) 
  //trex.setCollider("rectangle",0,0,400,trex.height)
  trex.debug = false
  gameover = createSprite(300,100,30,30)
  gameover.scale = 0.5
  gameover.addImage(gameoverimg)
  restart = createSprite(300,140,30,30)
  restart.scale = 0.5
  restart.addImage(restartimg)
}

function draw(){
  background("white")
  frameRate(40)
  drawSprites()
  textSize(15)
  textFont("Georgia")
  text("Score: "+score,500,30)
  
  if (game_state === 0){
    if (ground.x<0){
      ground.x=300
    } 
    ground.velocityX = -(9+score/100)
    gameover.visible = false
    restart.visible = false
    if(score%100===0 && score!=0){
      checkpoint.play()
    }
    score = score + Math.round(getFrameRate()/60)
  
    trex.velocityY = trex.velocityY + 0.5
    if(keyDown("SPACE")&& trex.y>183){
      trex.velocityY =  -8
      jump.play()
    }
    cloud_create()
    if (trex.isTouching(cactus_group)){
      game_state = 1
      //trex.velocityY = -8
      //jump.play()
      die.play()
      
      
    }
    spawn_cactus()
  }
  else{
    trex.velocityY = 0
    ground.velocityX = 0
    trex.changeAnimation("collided")
    clouds_group.setVelocityXEach(0)
    cactus_group.setVelocityXEach(0)
    cactus_group.setLifetimeEach(-1)
    clouds_group.setLifetimeEach(-1)
    gameover.visible = true
    restart.visible = true
    if(mousePressedOver(restart)){
      reset()
    }
  }

 
  trex.collide(clone_ground)
  
  

  //console.log(trex.y)

  //console.log(frameCount)
  //console.log(Math.round(random(30,100)))
 /* console.log(10/10)
  console.log(10%10)*/
  
}

function cloud_create(){
  if(frameCount%50===0){
    cloud = createSprite(610,random(50,80),30,30)
    cloud.velocityX = -3
    cloud.addImage(cloud_img)
    cloud.scale = 0.5
    trex.depth = cloud.depth + 1 
    cloud.lifetime = 203.3
    clouds_group.add(cloud)
  }


}

function spawn_cactus(){
  if(frameCount%70===0){
  var cactus = createSprite(600,185,30,30)
  cactus.velocityX = -(5+score/100)
  cactus.scale = 0.3
  var choice = Math.round(random(1,6))
  switch(choice){
    case 1: cactus.addImage(ob1);break
    case 2: cactus.addImage(ob2);break
    case 3: cactus.addImage(ob3);break
    case 4: cactus.addImage(ob4);break
    case 5: cactus.addImage(ob5);break
    case 6: cactus.addImage(ob6);break
  }
  cactus_group.add(cactus)
  
cactus.lifetime = 200

  }


}

function reset(){
  game_state = 0
  clouds_group.destroyEach()
  cactus_group.destroyEach()
  trex.changeAnimation("run")
  score = 0
}