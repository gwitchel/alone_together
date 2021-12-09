// for more in depth look into using https://handsfree.js.org/#models

var socket; 
let faceapi;
let detections = [];
let facePoints = [];
// Video
let video;
let myFont; 
var squares = []; 

function preload() {
  myFont = loadFont('Press_Start_2P/PressStart2P-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  // drawingContext.shadowOffsetX = 5;
  // drawingContext.shadowOffsetY = -5;
  // drawingContext.shadowBlur = 10;
  // drawingContext.shadowColor = '#A9A9A9';


  // Creat the video and start face tracking
  video = createCapture(VIDEO);
  video.size(0, 0); 
  // Only need landmarks for this example
  const faceOptions = { withLandmarks: true, withExpressions: false, withDescriptors: false };
  faceapi = ml5.faceApi(video, faceOptions, faceReady);
  socket = io.connect('http://localhost:3000')
  
  socket.on('face', incommingFace);

  // create grid 
  for(var i = 0; i < windowWidth; i+=10){
    for(var j = 0; j < windowHeight; j+=10){
      squares.push(new Sqr(i,j))
    }
  }
}

// Draw everything
function draw() {
  background("#d3d3d3");
  drawGrid(squares);
  // Just look at the first face and draw all the points
  if (detections.length > 0) {
    let points = detections[0].landmarks.positions;
    console.log("staring into the void")
    socket.emit('face',points);
    squares = updateGrid(points,squares)
  }

  drawInfoPage();

}


function incommingFace(data){
  console.log("Someone is staring back")
  squares = updateGrid(data,squares)

}

// Start detecting faces
function faceReady() {
  faceapi.detect(gotFaces);
}

// Got faces
function gotFaces(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  detections = result;
  faceapi.detect(gotFaces);
}


function drawInfoPage(){
  let padding = 10
  fill("#d3d3d3")
  textFont(myFont);
  rect(0,0,windowWidth/20,windowHeight)
  rect(0,0,windowWidth,windowHeight/8+3)
  rect(windowWidth-windowWidth/8,0,windowWidth/8,windowHeight)
  rect(0,windowHeight-windowHeight/20,windowWidth,windowHeight/20)

  //fill("#FFFee7")
  //rect(windowWidth - (windowWidth/4 - padding),windowHeight/8+3 + padding ,windowWidth/4 - padding ,windowHeight-windowHeight/10 - padding)

  textSize(20);
  fill("#090807");
  text("sitting here... \n staring into the void",windowWidth/20,windowHeight/8+3)
  text("wondering if someone \n is out there... \n staring back",windowWidth-windowWidth/3+20,windowHeight-windowHeight/10)
  
}