// Todo: stick iframe to the bottom of the page
// Todo:change the color of the html body


var spotifyOpen = 0;
var iframe;
var myCanvas;
var jazzRoom;
var playBtn;
var piano;
var table;
let mukta;
var floor
var wood;
var iron;

function preload() {
  jazzRoom = loadImage('images/jazz.png');
  floor = loadImage('images/floor.png');
  windowView = loadImage('images/window.png');
  window2 = loadImage('images/window2.png');
  playBtn = loadImage('images/play.png');
  mukta = loadFont('Mukta-Regular.ttf');
  wood = loadImage('images/wood.jpg');
  iron = loadImage('images/iron.jpg');
  piano = loadModel('models/Piano.obj');
  // piano = loadModel('models/pianoOld.obj');
  table = loadModel('models/Table.obj');
  tableTexture = loadImage('images/tableTexture.png');

}
function setup() {

  myCanvas = createCanvas(windowWidth, windowHeight - 80, WEBGL);
  myCanvas.parent('myContainer');

  myCamera = createCamera();
  textFont(mukta);
  // textSize(50);
  textAlign(CENTER, CENTER);
}


function draw() {

  // noLoop();
  orbitControl();
  cameraMotion();
  playMusic();
  stopMusic()
  background(26, 22, 26);
  image(playBtn, 550, 450);
  push();
  textSize(80);
  text("Press P to play", -800, -1000);
  pop();

  // openSpotifyButton = createButton('Listen on Spotify');
  // openSpotifyButton.position(width, height - 20);
  // openSpotifyButton.mousePressed(openSpotify);

  // openLight = createButton('Turn on the lights');
  // openLight.position(width, height - 40);
  // openLight.mousePressed(openLight);

  // ambientLight(255, 255, 255);

  directionalLight(255, 255, 255, 0, 0, 1);
  pointLight(255, 255, 255, 0, 0, 0);

  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;

  pointLight(255, 250, 250, locX, locY, 50);

  push();
  noStroke();
  scale(210);
  rotateX(PI / 2);
  rotateY(PI / 2);
  rotateZ(PI / 2);
  translate(-3.5, -2, 0);
  texture(iron);
  model(piano);
  pop();




  // jazz bar scene
  push();
  texture(jazzRoom)
  box(1000, 800, 0.1);
  pop();

  push();
  noStroke();
  scale(3.2);
  rotateX(PI / 2);
  rotateY(PI / 2);
  rotateZ(PI / 2);
  translate(390, -127, 60);
  texture(tableTexture);
  model(table);
  pop();



  // private room scene
  push();
  // sphere(30);
  texture(window2);
  translate(0, 0, -1500);
  box(1000, 800, 0.1);
  pop();

  // wood floor
  push();
  texture(floor);
  translate(0, 400, 0);
  box(1000, 0.1, 3000);
  pop();
  // side wall color
  let wallColor = color(`hsla(32, 42%, ${Math.abs(sin(Date.now() / 2000) * 80)}%, 0.2)`);
  // side wall 1
  push();
  fill(wallColor);
  translate(500, 0, 0);
  box(1, 800, 3000);
  pop();
  // side wall 2
  push();
  fill(wallColor);
  noStroke();
  translate(-500, 0, 0);
  box(1, 800, 3000);
  pop();


}

// function draw() {
//   background(26, 22, 26);
//   orbitControl();
//   // box(1, 1, 1);
//   // box(1000, 800, 100);
//   push();
//   model(piano);
//   scale(300, 300);
//   pop();


// }

function playMusic() {
  if (playBtn.mouseIsPressed) {
    openSpotify();
  }
  else if (keyIsDown(80)) {
    // play music
    openSpotify();
  }
}

function stopMusic() {
  if (keyIsDown(83)) {
    // play music
    closeSpotify();
  }
}

function openSpotify() {
  if (spotifyOpen == 0) {
    // closeSpotifyButton = createButton("X");
    // closeSpotifyButton.position(myCanvas.width - closeSpotifyButton.height, myCanvas.height - closeSpotifyButton.height);
    iframe = document.createElement('iframe');
    iframe.src = "https://open.spotify.com/embed/playlist/4Gn6rgEi6D1kbXIn5qKHxV?utm_source=generator";
    iframe.allow = "encrypted-media";
    iframe.width = myCanvas.width;
    iframe.height = "80";
    iframe.style.borderRadius = "3px";
    myContainer.appendChild(iframe);
    spotifyOpen = 1;
    // closeSpotifyButton.mousePressed(closeSpotify);
  }
}

function closeSpotify() {
  iframe.remove();
  // closeSpotifyButton.remove();
  spotifyOpen = 0;
  redraw();
}

function cameraMotion() {
  if (keyIsDown(LEFT_ARROW)) {
    // myCamera.pan(0.1);
    myCamera.move(-10, 0, 0);
  } else if (keyIsDown(RIGHT_ARROW)) {
    // myCamera.pan(-0.1);
    myCamera.move(10, 0, 0);
  } else if (keyIsDown(UP_ARROW)) {
    // myCamera.tilt(0.1);
    myCamera.move(0, 0, 9);
  } else if (keyIsDown(DOWN_ARROW)) {
    // myCamera.tilt(-0.1);
    myCamera.move(0, 0, -9);
  }
}








