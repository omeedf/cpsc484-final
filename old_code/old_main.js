var host = "cpsc484-02.yale.internal:8888";

$(document).ready(function () {
    frames.start();
    twod.start();
});

// get the frames from the display
var frames = {
    socket: null,

    start: function () {
        var url = "ws://" + host + "/frames";
        frames.socket = new WebSocket(url);
        frames.socket.onmessage = function (event) {
            frames.show(JSON.parse(event.data));
        }
    },

    show: function (frame) {
        console.log(frame);
    }
};

// get the raw image data from the display
var twod = {
  socket: null,

  // create a connection to the camera feed
  start: function () {
      var url = "ws://" + host + "/twod";
      twod.socket = new WebSocket(url);

      // whenever a new frame is received...
      twod.socket.onmessage = function (event) {

          // parse and show the raw data
          twod.show(JSON.parse(event.data));
      }
  },

  // show the image by adjusting the source attribute of the HTML img object previously created
  show: function (twod) {
      $('img.twod').attr("src", 'data:image/pnjpegg;base64,' + twod.src);
  },
};

// set up the basic canvas
function setup() {
  // get the dimensions of the parent HTML element
  height = document.getElementById('sketch-holder').clientHeight;
  width = document.getElementById('sketch-holder').clientWidth;

  // create canvas
  var canvas = createCanvas(width, height);

  // stretch canvas to fit dimensions of parent
  canvas.parent('sketch-holder');
  canvas.width = width;
  canvas.height = height;
}