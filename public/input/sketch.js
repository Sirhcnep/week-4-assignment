let socket = io('/input');
socket.on('connect', function () {
  console.log("Connected");
});

let latestChange = 0;
let mystr = '';



function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
}



function draw() {
  background(255);
  textSize(150);
  text(mystr, width / 2, height / 2);
}



function keyTyped() {
  let ok = millis();
  if(key == ' ') {
    mystr = '';
    socket.emit('next');
    latestChange = ok;
    return;
  }
  mystr += key;
  let message = {
    char: key,
  }
  socket.emit('add', message);
  latestChange = ok;
}
function keyPressed() {
  if (keyCode == BACKSPACE) {
    mystr = mystr.slice(0, -1);
    socket.emit('remove');
  }
}
