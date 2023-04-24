var host = "cpsc484-01.yale.internal:8888";

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
            frames.move_cursor(JSON.parse(event.data));
        }
    },

    move_cursor: function(frame) {
        var right_wrist_x = frame.people[0].joints[7].position.x;
        var right_wrist_y = frame.people[0].joints[7].position.y;
        xCoor = right_wrist_x;
        yCoor = right_wrist_y;
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

let xCoor = 0;
let yCoor = 0;

// set up the basic canvas
function setup() {
    // create canvas
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("canvas-container");
    frameRate(3);
    stroke(255);
    strokeWeight(20);

    xCoor = windowWidth / 2;
    yCoor = windowHeight / 2;
}

function draw() {
    background('lightblue');
    rect(xCoor, yCoor, 20, 20);
    stroke('blue');
}