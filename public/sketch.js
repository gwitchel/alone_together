// for more in depth look into using https://handsfree.js.org/#models

var socket; 
let faceapi;
let detections = [];

// Video
let video;

var squares = []; 

function setup() {
  createCanvas(windowWidth,windowHeight)
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = -5;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = '#D3D3D3';


  // Creat the video and start face tracking
  video = createCapture(VIDEO);
  video.size(width, height);
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
  background(0);
  drawGrid(squares);
  // Just look at the first face and draw all the points
  if (detections.length > 0) {
    let points = detections[0].landmarks.positions;
    console.log("Emitting face", points)
    socket.emit('face',points);
    squares = updateGrid(points,squares)
  }


}


function incommingFace(data){
  console.log("Incomming Face", data)
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


