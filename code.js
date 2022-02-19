var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//var deathCount = 0;

var gameState = "serve";
var lives = 10;

var player = createSprite(40, 190, 10, 10);
player.shapeColor = "blue";

var wall1 = createSprite(190, 120, 250, 3);
var wall2 = createSprite(190, 260, 250, 3);
var wall3 = createSprite(67, 145, 3, 50);
var wall4 = createSprite(67, 235, 3, 50);
var wall5 = createSprite(313, 145, 3, 50);
var wall6 = createSprite(313, 235, 3, 50);
var wall7 = createSprite(41, 170, 50, 3);
var wall8 = createSprite(41, 210, 50, 3);
var wall9 = createSprite(337, 210, 50, 3);
var wall10 = createSprite(337, 170, 50, 3);
var wall11 = createSprite(18, 190, 3, 40);
var wall12 = createSprite(361, 190, 3, 40);

var enemy1 = createSprite(100, 130, 10, 10);
enemy1.shapeColor = "red";
var enemy2 = createSprite(215, 130, 10, 10);
enemy2.shapeColor = "red";
var enemy3 = createSprite(165, 250, 10, 10);
enemy3.shapeColor = "red";
var enemy4 = createSprite(270, 250, 10, 10);
enemy4.shapeColor = "red";

enemy1.velocityY = -7;
enemy2.velocityY = 7;
enemy3.velocityY = -7;
enemy4.velocityY = 7;

playSound("assets/category_background/synthesize.mp3", true);

function draw() {
  background("lightgrey");
  //stroke("green");
  strokeWeight(0);
  fill("lightblue");
  rect(18, 170, 52, 40);
  rect(308, 170, 52, 40);
  fill("red");
  textSize(15);
  text("Lives: " + lives, 200, 100);
  if (keyDown("left")) {
    player.x -= 2;
  }
  if (keyDown("right")) {
    player.x += 2;
  }
  
  enemy1.bounceOff(wall1);
  enemy1.bounceOff(wall2);

  enemy2.bounceOff(wall1);
  enemy2.bounceOff(wall2);

  enemy3.bounceOff(wall1);
  enemy3.bounceOff(wall2);

  enemy4.bounceOff(wall1);
  enemy4.bounceOff(wall2);
  
  if (player.isTouching(wall11) || player.isTouching(wall12) || player.isTouching(enemy1) || player.isTouching(enemy2) || player.isTouching(enemy3) || player.isTouching(enemy4)) {
    player.remove();
    player = createSprite(40, 190, 10, 10);
    player.shapeColor = "blue";
    //player.x = 40;
    //player.y = 190;
    lives--;
  }
  
  resize(enemy1);
  resize(enemy2);
  resize(enemy3);
  resize(enemy4);
  
  //if (enemy1.scale/2 != player.x || enemy2.scale/2 != player.x || enemy3.scale/2 != player.x || enemy4.scale/2 != player.x) {
  //  player.x = enemy1.scale/2;
  //}
  
  if (lives < 1) {
    gameState = "end";
    player.remove();
    stopSound("assets/category_background/synthesize.mp3");
    enemy1.velocityY = 0;
    enemy1.scale = 0;
    enemy2.velocityY = 0;
    enemy2.scale = 0;
    enemy3.velocityY = 0;
    enemy3.scale = 0;
    enemy4.velocityY = 0;
    enemy4.scale = 0;
    textSize(30);
    text("GAME OVER!", 96, 300);
  }
  
  if (player.x > 310) {
    gameState = "end";
    stopSound("assets/category_background/synthesize.mp3");
    enemy1.velocityY = 0;
    enemy1.scale = 0;
    enemy2.velocityY = 0;
    enemy2.scale = 0;
    enemy3.velocityY = 0;
    enemy3.scale = 0;
    enemy4.velocityY = 0;
    enemy4.scale = 0;
    textSize(30);
    text("YOU WIN!", 120, 300);
  }
  
  drawSprites();
}

function resize(sprite) {
  sprite.scale *= 1.00075;
}


// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
