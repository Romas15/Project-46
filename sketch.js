var player, shark, playerIM, rightSharkIM, leftSharkIM;
var background1, wall, wall2, explosionIM, meatIM;
var meat, shark2, rand;
var flame, flameIM, health;
var healthTextBox, textBackgroundIM, openMouthSharkI;
var playerXHigh, playerXHighLeft, playerXLow, timeRemaining2;
var timeRemaining3;
var timeRemaining1;
var timeRemaining0, timeRemaining10;
var highBarrier;
var lowBarrier;
var playerYLow,
  playerYHigh,
  gameState = "INTRO",
  meatGroup;
var biteSound;
var collider, bgMusic;
var waterGIF;
var sword, swordDOWNIM, swordUPIM;

var swordRemaining = 3,
  swordRemainingTextBox;
var winBG;
var sharkSound;
function preload() {
  leftSharkIM = loadImage("leftShark.png");
  rightSharkIM = loadImage("rightShark.png");
  playerIM = loadImage("submarine.png");
  background1 = loadImage("ocean.jpg");
  flameIM = loadImage("flame.png");
  meatIM = loadImage("meat.png");
  openMouthSharkIM = loadImage("openMouthShark.png");
  sharkSound = createAudio("sharkSound.wav");
  winBG = loadImage("bg.png");

  bgMusic = createAudio("backgroundMusic.wav");
  biteSound = createAudio("bite.wav");

  waterGIF = loadImage("water.gif");

  swordDOWNIM = loadImage("swordDOWN.png");
  swordUPIM = loadImage("swordUP.png");
  // explosionIM = loadImage("explosion.png");
}

function setup() {
  createCanvas(1440, 821);
  meat = createSprite(-10000, -100000);
  meat.addImage(meatIM);
  meat.scale = 0.4;

  //createCanvas(1440, 820.5);
  player = createSprite(200, 400);
  player.addImage(playerIM);
  player.scale = 0.3;

  wall = createSprite(100, 400, 30, 1000);
  wall2 = createSprite(1330, 400, 30, 1000);

  rand = Math.round(random(200, 1100));

  // flame = createSprite(400, 200);
  // flame.scale = 0.2;
  // flame.addImage(flameIM);

  shark = createSprite(700, 700);

  shark.scale = 0.2;

  shark2 = createSprite(600, 200);

  shark2.scale = 0.2;

  shark3 = createSprite(900, 500);

  shark3.scale = 0.2;

  shark4 = createSprite(800, 600);

  shark4.scale = 0.2;

  shark5 = createSprite(900, 200);

  shark5.scale = 0.2;

  shark6 = createSprite(1000, 800);

  shark6.scale = 0.2;

  highBarrier = createSprite(500, 60, 10000, 30);
  lowBarrier = createSprite(500, 750, 10000, 30);

  wall2.visible = false;
  wall.visible = false;
  highBarrier.visible = false;
  lowBarrier.visible = false;

  sword = createSprite(player.x, player.y);

  sword.visible = false;
}

function draw() {
  console.log(gameState);
  console.log(camera.x, camera.y);

  // sword.x = player.x;
  // sword.y = player.y + 10;

  bgMusic.loop();
  playerXHigh = player.x + 10;

  playerXLow = player.x - 10;

  playerYHigh = player.y - 10;

  playerYLow = player.y + 10;
  console.log(mouseY);

  if (gameState === "INTRO") {
    health = 30000;
    background(0);
    textSize(50);
    fill("cyan");
    text("Shark Survivor", 530, 100);
    fill("white");
    text("Make sure the sharks don't destroy your submarine", 130, 180);
    text("You can win by letting the time run out", 300, 260);
    text("You can also kill the sharks!", 330, 340);
    text("Use Space to fire a sword", 360, 420);

    text("Press P to play!", 450, 500);
    shark.visible = false;
    shark2.visible = false;
    shark3.visible = false;
    shark4.visible = false;
    shark5.visible = false;

    player.visible = false;

    shark6.x = 999;
    shark6.visible = false;
    if (keyCode === 80) {
      gameState = "ONE SHARK";
      shark6.x = 990;
    }
  }

  // if (shark.x < playerXHigh || (shark.x < playerXLow && shark.y !== player.y)) {
  //   shark.addImage(openMouthSharkIM);
  // }
  // if (shark.x < playerXLow && shark.y !== player.y) {
  //   shark.addImage(openMouthSharkIM);
  // }
  console.log(timeRemaining1);

  if (gameState === "ONE SHARK") {
    background(background1);
    controls();
    loseLives();
    //  spawnMeat();

    shark.visible = true;
    shark2.visible = true;
    shark3.visible = true;
    shark4.visible = false;
    shark5.visible = false;

    shark6.visible = false;

    player.visible = true;

    if (player.y < 450) {
      sword.scale = 0.05;
      if (keyWentDown("SPACE") && swordRemaining !== 0) {
        swordRemaining = swordRemaining - 1;
        sword.y = player.y;

        sword.x = player.x + 1;
        sword.velocityY = 14;
        sword.visible = true;
        sword.addImage(swordDOWNIM);
      }
    }

    if (player.y > 450) {
      sword.scale = 0.05;

      if (keyWentDown("SPACE") && swordRemaining !== 0) {
        swordRemaining = swordRemaining - 1;
        sword.y = player.y;

        sword.x = player.x + 1;
        sword.velocityY = -14;
        sword.visible = true;
        sword.addImage(swordUPIM);
      }

      // if (sword.velocityY === 10) {
      //   sword.addImage(swordDOWNIM);
      // }
      // if (sword.velocityY === -10) {
      //   sword.addImage(swordUPIM);
      // }
    }

    // if (sword.velocityY === 10) {
    //   sword.addImage(swordDOWNIM);
    // }
    // if (sword.velocityY === -10) {
    //   sword.addImage(swordUPIM);
    // }

    textSize(40);
    stroke("blue");
    fill("red");
    text("Swords Remaining : " + swordRemaining, 70, 800);

    if (sword.isTouching(shark)) {
      shark.x = 9999;
      sharkSound.play();
    }

    if (sword.isTouching(shark2)) {
      shark2.x = 9999;
      sharkSound.play();
    }
    if (sword.isTouching(shark3)) {
      shark3.x = 9999;
      sharkSound.play();
    }

    if (shark.x > 4000 && shark2.x > 4000 && shark3.x > 4000) {
      gameState = "INTRO ANOTHER";
    }
    if (shark.x < player.x) {
      shark.x = shark.x + 4;
      shark.addImage(rightSharkIM);
    }

    if (shark.y < player.y) {
      shark.y = shark.y + 4;
    }
    if (shark.y > player.y) {
      shark.y = shark.y - 4;
    }

    ///jjjjjjjjjkjm
    fill(0);
    textSize(50);
    text("Easy", 650, 60);

    if (shark2.x < player.x) {
      shark2.x = shark2.x + 3;
      shark2.addImage(rightSharkIM);
    }

    if (shark2.y < player.y) {
      shark2.y = shark2.y + 2;
    }
    if (shark2.y > player.y) {
      shark2.y = shark2.y - 3;
    }
    if (shark2.x === playerXHigh) {
      shark2.velocityY = 0;
      shark2.addImage(openMouthSharkIM);
    }

    if (shark2.x === player.x && shark2.y > playerYHigh) {
      shark2.addImage(openMouthSharkIM);
    }

    if (shark2.x === player.x && shark2.y < playerYHigh) {
      shark2.addImage(openMouthSharkIM);
    }

    if (shark2.x > player.x) {
      shark2.x = shark2.x - 3;
      shark2.addImage(leftSharkIM);
    }

    //kkoikoijkoikoik

    if (shark.x === playerXHigh) {
      shark.velocityY = 0;
      shark.addImage(openMouthSharkIM);
    }

    if (shark.x === player.x && shark.y > playerYHigh) {
      shark.addImage(openMouthSharkIM);
    }

    if (shark.x === player.x && shark.y < playerYHigh) {
      shark.addImage(openMouthSharkIM);
    }

    if (shark.x > player.x) {
      shark.x = shark.x - 2;
      shark.addImage(leftSharkIM);
    }

    //shark3
    //shark3
    if (shark3.x < player.x) {
      shark3.x = shark3.x + 3;
      shark3.addImage(rightSharkIM);
    }

    if (shark3.y < player.y) {
      shark3.y = shark3.y + 3;
    }
    if (shark2.y > player.y) {
      shark3.y = shark3.y - 1;
    }
    if (shark3.x === playerXHigh) {
      shark3.velocityY = 0;
      shark3.addImage(openMouthSharkIM);
    }

    if (shark3.x === player.x && shark3.y > playerYHigh) {
      shark3.addImage(openMouthSharkIM);
    }

    if (shark3.x === player.x && shark3.y < playerYHigh) {
      shark3.addImage(openMouthSharkIM);
    }

    if (shark3.x > player.x) {
      shark3.x = shark3.x - 3;
      shark3.addImage(leftSharkIM);
    }

    // if (
    //   player.x < meat.x + meat.width &&
    //   player.x + player.width > meat.x &&
    //   player.y < meat.y + meat.height &&
    //   player.y + player.height > meat.y
    // ) {
    //   // collision detected!
    //   health = health + 10000;
    // }
    //shark33

    fill("green");
    textSize(30);
    text("               Lives Remaining : " + health, 1050, 100);
    fill("red");
    textSize(30);
    timeRemaining1 = 29 - World.seconds;

    if (timeRemaining1 > 0) {
      text("Time Remaining : " + timeRemaining1, 100, 100);
    } else {
      text("Time's Up!", 100, 100);
    }

    if (timeRemaining1 < 10 && player.x === 200) {
      timeRemaining1 = 10;
    }
    // if ((shark6.visible = false)) {
    if (timeRemaining1 === 0 && gameState === "ONE SHARK") {
      gameState = "INTRO ANOTHER";
      // flame.visible = false;
    }

    // }

    //text("TIME REMAINING: " + time - second(), 300, 320);
  }

  if (health === 0) {
    gameState = "LOSE";
  }

  if (gameState === "LOSE") {
    background(0);
    player.visible = false;
    shark.visible = false;
    shark2.visible = false;
    shark3.visible = false;
    shark4.visible = false;
    shark5.visible = false;
    //720 410
    camera.x = -750;

    // flame.visible = false;
    textSize(60);
    fill("ORANGE");
    text("YOU LOSE! REFRESH TO TRY AGAIN!", -1290, 250);
  }

  if (gameState === "INTRO ANOTHER") {
    background(0);
    shark.visible = false;
    shark2.visible = false;
    shark3.visible = false;
    shark4.visible = false;
    shark5.visible = false;
    console.log(shark.x, shark.y, "H");

    camera.x = -800;

    player.x = 300;

    shark.x = 1000;
    shark2.x = 980;
    shark3.x = 880;
    shark4.x = 900;
    shark5.x = 999;

    shark.y = 400;
    shark2.y = 200;
    shark3.y = 440;
    shark5.y = 490;
    shark4.y = 220;

    // if (player.x > 720) {
    //   shark.x = 320;
    //   shark2.x = 260;
    //   shark3.x = 410;
    //   shark4.x = 350;
    //   shark5.x = 449;

    //   shark.y = 110;
    //   shark2.y = 220;
    //   shark3.y = 330;
    //   shark5.y = 444;
    //   shark4.y = 400;
    // }

    // flame.visible = false;

    shark6.visible = false;

    player.visible = false;

    fill("red");
    textSize(45);
    text("Level 2 achieved! This level is really HARD!", -1300, 200);
    text("And you won't have ANY swords!!", -1190, 280);
    text("But, you can use MEAT to gain more lives", -1260, 360);
    text("Press C to continue", -1100, 440);

    if (keyCode === 67 && gameState === "INTRO ANOTHER") {
      gameState = "TWO SHARK";
    }
  }

  //  player.debug = true;

  if (gameState === "TWO SHARK") {
    background(background1);
    controls();
    loseLives();
    //spawnMeat();

    camera.x = 722;

    shark.visible = true;
    shark2.visible = true;
    shark3.visible = true;
    shark4.visible = true;
    shark5.destroy();
    shark6.destroy();

    player.visible = true;
    if (frameCount % 120 === 0) {
      meat.x = Math.round(random(250, 1000));
      meat.y = camera.y - 420;
      meat.velocityY = 16;
    }

    if (player.isTouching(meat)) {
      health = health + 10000;
      meat.x = -999;
      setTimeout(function () {
        meat.x = Math.round(random(250, 1000));
      }, 2000);
    }

    // if (meat.y < 600) {
    //   meat.velocityY = 16;
    // }

    if (shark2.x < player.x) {
      //shark2
      shark2.x = shark2.x + 3;
      shark2.addImage(rightSharkIM);
    }

    if (shark2.y < player.y) {
      shark2.y = shark2.y + 1;
    }
    if (shark2.y > player.y) {
      shark2.y = shark2.y - 3;
    }
    if (shark2.x === playerXHigh) {
      shark2.velocityY = 0;
      shark2.addImage(openMouthSharkIM);
    }

    if (shark2.x === player.x && shark2.y > playerYHigh) {
      shark2.addImage(openMouthSharkIM);
    }

    if (shark2.x === player.x && shark2.y < playerYHigh) {
      shark2.addImage(openMouthSharkIM);
    }

    if (shark2.x > player.x) {
      shark2.x = shark2.x - 4;
      shark2.addImage(leftSharkIM);
    }

    //shark1
    if (shark.x === playerXHigh) {
      shark.velocityY = 0;
      shark.addImage(openMouthSharkIM);
    }

    if (shark.x === player.x && shark.y > playerYHigh) {
      shark.addImage(openMouthSharkIM);
    }

    if (shark.x === player.x && shark.y < playerYHigh) {
      shark.addImage(openMouthSharkIM);
    }

    if (shark.x > player.x) {
      shark.x = shark.x - 3;
      shark.addImage(leftSharkIM);
    }

    if (shark.x < player.x) {
      shark.x = shark.x + 2;
      shark.addImage(rightSharkIM);
    }

    if (shark.y < player.y) {
      shark.y = shark.y + 5;
    }
    if (shark.y > player.y) {
      shark.y = shark.y - 3;
    }
    //shark3
    if (shark3.x === playerXHigh) {
      shark3.velocityY = 0;
      shark3.addImage(openMouthSharkIM);
    }

    if (shark3.x === player.x && shark3.y > playerYHigh) {
      shark3.addImage(openMouthSharkIM);
    }

    if (shark3.x === player.x && shark3.y < playerYHigh) {
      shark3.addImage(openMouthSharkIM);
    }

    if (shark3.x > player.x) {
      shark3.x = shark3.x - 4;
      shark3.addImage(leftSharkIM);
    }

    if (shark3.x < player.x) {
      shark3.x = shark3.x + 2;
      shark3.addImage(rightSharkIM);
    }

    if (shark3.y < player.y) {
      shark3.y = shark3.y + 6;
    }
    if (shark3.y > player.y) {
      shark3.y = shark3.y - 3;
    }

    //shark4

    if (shark4.x === playerXHigh) {
      shark4.velocityY = 0;
      shark4.addImage(openMouthSharkIM);
    }

    if (shark4.x === player.x && shark4.y > playerYHigh) {
      shark4.addImage(openMouthSharkIM);
    }

    if (shark4.x === player.x && shark4.y < playerYHigh) {
      shark4.addImage(openMouthSharkIM);
    }

    if (shark4.x > player.x) {
      shark4.x = shark4.x - 3;
      shark4.addImage(leftSharkIM);
    }

    if (shark4.x < player.x) {
      shark4.x = shark4.x + 5;
      shark4.addImage(rightSharkIM);
    }

    if (shark4.y < player.y) {
      shark4.y = shark4.y + 4;
    }
    if (shark4.y > player.y) {
      shark4.y = shark4.y - 5;
    }

    // if (
    //   player.x < meat.x + meat.width &&
    //   player.x + player.width > meat.x &&
    //   player.y < meat.y + meat.height &&
    //   player.y + player.height > meat.y
    // ) {
    //   // collision detected!
    //   health = health + 10000;
    //   meat.destroy();
    // }

    textSize(30);
    fill("red");
    console.log("JFJSDJFJS");
    timeRemaining2 = 43 - World.seconds;
    if (timeRemaining2 > 0) {
      text("Time Remaining : " + timeRemaining2, 100, 100);
    } else {
      gameState = "FINAL";
    }
    //text("TIME REMAINING: " + time - second(), 300, 320);

    textSize(30);
    text("               Lives Remaining : " + health, 1055, 100);

    fill(0);
    textSize(50);
    text("IMPOSSIBLE", 550, 60);

    if (gameState === "FINAL") {
      background(0);

      //   meat.visible = false;

      shark.visible = false;
      shark2.visible = false;
      shark3.visible = false;
      camera.x = -750;
      shark4.visible = false;
      shark5.visible = false;
      shark6.visible = false;

      meat.lifetime = 0;

      player.visible = false;
      textSize(50);
      fill("yellow");
      text("YOU WON!!", 530, 210);
      text("You're a champion!!", 460, 270);
    }
  }

  // if (gameState === "THREE SHARK INTRO") {
  //   textSize(35);
  //   background(0);
  //   fill("red");
  //   text("Well, looks like you've made it to the final stage!", 100, 150);

  //   fill("red");
  //   textSize(30);
  //   timeRemaining10 = 30 - World.seconds;
  //   if (timeRemaining10 > 0) {
  //     text("Time Remaining : " + timeRemaining10, 100, 300);
  //   } else {
  //     text("Time's Up!", 100, 100);
  //   } // if (timeRemaining10 > 0) {
  //   //   text("FINAL STAGE STARTING IN : " + timeRemaining10, 100, 100);
  //   // }

  //   text("FINAL STAGE STARTING IN : " + timeRemaining10, 100, 100);
  // }

  drawSprites();
}

function controls() {
  if (keyDown("UP") && player.y > 80) {
    player.y = player.y - 10;
  }
  if (keyDown("DOWN") && player.y < 700) {
    player.y = player.y + 10;
  }
  if (keyDown("RIGHT") && player.x < 1250) {
    player.x = player.x + 10;
  }
  if (keyDown("LEFT") && player.x > 150) {
    player.x = player.x - 10;
  }
}

function loseLives() {
  if (shark.isTouching(player) && health > 0) {
    health = health - 400;
    biteSound.play();
  }

  if (health < 10000) {
    health = 0;
    biteSound.play();
  }

  if (shark.isTouching(player) && health < 50000 && health > 39999) {
    health = health - 400;
    biteSound.play();
  }
  if (shark.isTouching(player) && health < 40000 && health > 29999) {
    health = health - 400;
    biteSound.play();
  }
  if (shark.isTouching(player) && health < 30000 && health > 19999) {
    health = health - 400;
    biteSound.play();
  }

  //shark 2
  if (shark2.isTouching(player) && health > 0) {
    health = health - 400;
    biteSound.play();
  }

  if (health < 10000) {
    health = 0;
  }

  if (shark2.isTouching(player) && health < 50000 && health > 39999) {
    health = health - 400;
    biteSound.play();
  }
  if (shark2.isTouching(player) && health < 40000 && health > 29999) {
    health = health - 400;
    biteSound.play();
  }
  if (shark2.isTouching(player) && health < 30000 && health > 19999) {
    health = health - 400;

    //shark 3
    if (shark3.isTouching(player) && health > 0) {
      health = health - 400;
      biteSound.play();
    }

    if (health < 10000) {
      health = 0;
    }

    if (shark3.isTouching(player) && health < 50000 && health > 39999) {
      health = health - 400;
      biteSound.play();
    }
    if (shark3.isTouching(player) && health < 40000 && health > 29999) {
      health = health - 400;
      biteSound.play();
    }
    if (shark3.isTouching(player) && health < 30000 && health > 19999) {
      health = health - 400;
      biteSound.play();
    }
    //shark4
    if (shark.isTouching(player) && health > 0) {
      health = health - 400;
      biteSound.play();
    }

    if (health < 10000) {
      health = 0;
    }

    if (shark4.isTouching(player) && health < 50000 && health > 39999) {
      health = health - 400;
      biteSound.play();
    }
    if (shark4.isTouching(player) && health < 40000 && health > 29999) {
      health = health - 400;
      biteSound.play();
    }
    if (shark4.isTouching(player) && health < 30000 && health > 19999) {
      health = health - 400;
      biteSound.play();
    }
    //shark5
    if (shark5.isTouching(player) && health > 0) {
      health = health - 400;
      biteSound.play();
    }

    if (health < 10000) {
      health = 0;
    }

    if (shark5.isTouching(player) && health < 50000 && health > 39999) {
      health = health - 400;
      biteSound.play();
    }
    if (shark5.isTouching(player) && health < 40000 && health > 29999) {
      health = health - 400;
      biteSound.play();
    }
    if (shark5.isTouching(player) && health < 30000 && health > 19999) {
      health = health - 400;
      biteSound.play();
    }
  }
}

// if (gameState === "LOSE" || gameState === "INTRO ANOTHER") {
//   meat.destroy();
// }
// if (player.x === meat.x + 10 && meat.y === player.y + 10) {
//   health = health + 10000;
// }
// if (player.x === meat.x + 10 && meat.y === player.y - 10) {
//   health = health + 10000;
// }

// if (player.x === meat.x - 10 && meat.y === player.y + 10) {
//   health = health + 10000;
// }
// if ((player.x = meat.x - 10) && player.y - 10) {
//   health = health + 10000;
// }
