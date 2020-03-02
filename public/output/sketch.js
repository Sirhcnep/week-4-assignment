let socket = io('/output');
socket.on('connect', function () {
  console.log("Connected");
});

let r = 0;
let g = 0;
let b = 0;
let myinput = {};



function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  textAlign(CENTER, CENTER);

  socket.on('add', function (message) {
    let id = message.id;
    let charToAdd = message.data.char;

    if (!(id in myinput)) {
      myinput[id] = {
        text: '',
      }
    }
    myinput[id].text += charToAdd;
      r = random(0,255)
      g = random(0,255)
      b = random(0,255)
  });

  socket.on('remove', function (id) {
    if (!(id in myinput)) {
      return;
    }
    myinput[id].text = myinput[id].text.slice(0, -1);
  });

  socket.on('next', function (id) {
    if (!(id in myinput)) {
      return;
    }
    myinput[id].text = '';
  });

  socket.on('disconnected', function (id) {
    delete myinput[id];
  });
}



function draw() {
  background(r,g,b);
  for (let id in myinput) {
    let words = myinput[id];
    let txt = words.text;
    textSize(150);
    text(txt, width / 2, height / 2);
  }
}
