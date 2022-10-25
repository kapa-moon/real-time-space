// import { Application } from '@splinetool/runtime';

// const canvas = document.getElementById('canvas3d');
// const app = new Application(canvas);
// app.load('https://prod.spline.design/CQaLOliljSNl6Q-S/scene.splinecode');

// Todo: change the color of the html body
// import Friend from "./friend.js";

var spotifyOpen = 0;
var iframe;
var myCanvas;
var jazzRoom;
var playBtn;
var piano;
var table;
let mukta;
let fuzzy;
var floor
var wood;
var iron;
var end;
var deco1;
var deco2;
var code;
var girl;
var counts = 0;

// Live Media
let myVideo;
let myCamera;
let myInput;
let friends = {};
let liveMediaConnection;

function preload() {
  jazzRoom = loadImage('images/jazz.png');
  floor = loadImage('images/floor.png');
  end = loadImage('images/end.png');
  windowView = loadImage('images/window.png');
  window2 = loadImage('images/window2.png');
  playBtn = loadImage('images/play.png');
  mukta = loadFont('fonts/Mukta-Regular.ttf');
  fuzzy = loadFont('fonts/FuzzyBubbles-Regular.ttf');
  wood = loadImage('images/wood.jpg');
  iron = loadImage('images/iron.jpg');
  piano = loadModel('models/Piano.obj');
  // piano = loadModel('models/pianoOld.obj');
  table = loadModel('models/Table.obj');
  tableTexture = loadImage('images/tableTexture.png');
  deco1 = loadImage('images/deco1.jpeg');
  deco2 = loadImage('images/deco2.jpeg');
  code = loadImage('images/code.png');
  girl = loadImage('images/girl.png');

}
function setup() {

  myCanvas = createCanvas(windowWidth, windowHeight - 80, WEBGL);

  liveMediaConnection = new p5LiveMedia(this, null, null, "jazzy-cozy");
  liveMediaConnection.on("stream", gotStream);
  liveMediaConnection.on("data", gotData);
  // Video if needed
  myVideo = createCapture(VIDEO, gotLocalMediaStream);
  myVideo.muted = true;
  myVideo.hide();

  myCanvas.parent('myContainer');

  myCamera = createCamera();
  // textFont(mukta);
  textFont(fuzzy);
  // textSize(50);
  textAlign(CENTER, CENTER);
  // debugMode();

  myInput = createInput();
  myInput.parent('myContainer');
  myInput.position(0, 0);
  myInput.size(300, 20);
  // myInput.changed(entryCallback);

}

// this function is called when a remote stream is ready
function gotStream(stream, id) {
  console.log("got remote stream!");

  friends[id] = new Friend(stream, id);

  // hide the HTML <video> element
  stream.hide();
}

function sharePosition() {
  if (liveMediaConnection) {
    let dataToSend = {
      x: myCamera.eyeX,
      y: myCamera.eyeY,
      z: myCamera.eyeZ,
      message: myInput.value()
    };
    liveMediaConnection.send(JSON.stringify(dataToSend));
  }
}

// function entryCallback() {
//   let str = myInput.value();
//   rotateY(PI / 2);
//   translate(-200, -200, 800);
//   textSize(100);
//   text(str, 800, 500);
//   // for (let i = 0; i < 25; i++) {
//   //   text(str.charAt(0), random(width),
//   //     random(height));
//   // }
// }

// fetch real-time data  
function gotData(data, id) {
  console.log("got incoming data from peer with ID", id);
  console.log(data);
  let parsedData = JSON.parse(data);
  friends[id].update(parsedData.x, parsedData.y, parsedData.z, parsedData.message);
}

// this function is called when our webcamera stream is ready
function gotLocalMediaStream(stream) {
  console.log("got local stream!");
  liveMediaConnection.addStream(stream, "CAPTURE");
}




function draw() {

  // noLoop();
  orbitControl();
  cameraMotion();
  playMusic();
  stopMusic()
  background(26, 22, 26);


  // push();
  // drawingContext.shadowBlur = 32;
  // drawingContext.shadowColor = color(`hsla(332, 58, 91, 100)`);
  // texture(myVideo);
  // rect(300, 200, 55, 55, 20);
  // pop();

  //text for the play music hint
  push();
  textSize(25);
  // textFont(mukta);
  // text("Press P to play", -800, -1000);
  translate(200, 250, 1200);
  text("Press P to play", 0, 0);
  pop();

  push();
  translate(50, 230, 1200);
  image(playBtn, 0, 0);
  pop();

  // openSpotifyButton = createButton('Listen on Spotify');
  // openSpotifyButton.position(width, height - 20);
  // openSpotifyButton.mousePressed(openSpotify);

  // openLight = createButton('Turn on the lights');
  // openLight.position(width, height - 40);
  // openLight.mousePressed(openLight);

  // ambientLight(255, 255, 255);


  // BUG DELIGHT
  // directionalLight(255, 255, 255, 0, 0, 1);
  // pointLight(255, 255, 255, 0, 0, 0);

  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;

  pointLight(255, 250, 250, locX, locY, 50);

  push();
  noStroke();
  scale(190);
  rotateX(PI / 2);
  rotateY(PI / 2);
  rotateZ(PI / 2);
  translate(-4, -2.5, 0);
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
  texture(window2);
  translate(0, 0, -1500);
  box(1000, 800, 0.1);
  pop();

  // end scene
  push();
  texture(end);
  translate(0, 0, -1800);
  box(1000, 800, 0.1);
  drawingContext.shadowBlur = 12;
  drawingContext.shadowColor = color(`hsb(332, 58, 91, 100)`);
  translate(0, 0, -1000);
  textSize(100);
  text("The End", 0, 0);
  pop();

  push();
  rotateY(PI / 2);
  translate(0, 0, -1000);
  pop();


  push();
  translate(-500, -120, 1100);
  rotateY(PI / 2);
  texture(deco1);
  box(300, 200, 15);
  pop();

  push();
  translate(-500, -150, -900);
  rotateY(PI / 2);
  texture(girl);
  box(300, 200, 15);
  pop();

  push();
  translate(500, 0, -300);
  rotateY(-PI / 2);
  texture(code);
  box(350, 250, 15);
  pop();

  push();
  translate(500, -180, 800);
  rotateY(-PI / 2);
  texture(deco2);
  // box(15, 300, 500);
  box(350, 250, 15);
  pop();

  push();
  // rotateY(PI / 2);
  translate(-500, 10, 500);
  rotateY(PI / 2);
  let boardColor = color(`hsla(50, 35%, 50%, 0.3)`);
  fill(boardColor);
  box(600, 400, 10);
  pop();

  push();
  textSize(25);
  translate(-493, -290, 700);
  rotateY(PI / 2);
  fill(187, 216, 221);
  text(myInput.value(), 0, 0, 600, 300);
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
  // decorations

  // side wall 2
  push();
  fill(wallColor);
  noStroke();
  translate(-500, 0, 0);
  box(1, 800, 3000);
  pop();


  // Draw the other users
  for (let id in friends) {
    let p = friends[id];
    p.show();
    // if(counts < 4){
    //   counts++;

    // }  
    push();
    textSize(25);
    translate(-493, -290, 700);
    rotateY(PI / 2);
    fill(187, 216, 221);
    text(p.message, 0, 0, 600, 300);
    pop();
  }

  push();
  textSize(25);
  translate(-493, -290, 700);
  rotateY(PI / 2);
  fill(187, 216, 221);
  text(myInput.value(), 0, 0, 600, 300);
  pop();

  // do this once every 10 frames
  if (frameCount % 8 === 0) {
    sharePosition();
  }
}


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
