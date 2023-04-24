var host = "cpsc484-01.yale.internal:8888";
//var host = "localhost:4444";

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
        left_y = frame.people[0].joints[7].position.y;
        right_y = frame.people[0].joints[14].position.y;
        head_y = frame.people[0].joints[26].position.y;

        left_x = frame.people[0].joints[7].position.x;
        right_x = frame.people[0].joints[14].position.x;
        head_x = frame.people[0].joints[26].position.x;
        movement();
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

let right_y = 0;
let left_y = 0;
let head_y = 0;
let right_x = 0;
let left_x = 0;
let head_x = 0;

let stage = 0;

function setup() {
    document.getElementById("start_page").style.display = 'block';
    document.getElementById("tea_page_1").style.display = 'none';
    document.getElementById("tea_page_2").style.display = 'none';
    document.getElementById("tea_page_3").style.display = 'none';
    document.getElementById("tea_page_4").style.display = 'none';
    document.getElementById("final_page").style.display = 'none';
}

function movement() {
    print(left_x)
    //from the starting page, move to first add tea page when both hands raised
    if(right_y < head_y && left_y < head_y) {
        document.getElementById("start_page").style.display = 'none';
        document.getElementById("tea_page_1").style.display = 'block';
        document.getElementById("tea_page_2").style.display = 'none';
        document.getElementById("tea_page_3").style.display = 'none';
        document.getElementById("tea_page_4").style.display = 'none';
        document.getElementById("final_page").style.display = 'none';
    }

    //from first add tea page, move to boil page when right hand all the way to right
    if(right_x < -1000) {
        document.getElementById("start_page").style.display = 'none';
        document.getElementById("tea_page_1").style.display = 'none';
        document.getElementById("tea_page_2").style.display = 'block';
        document.getElementById("tea_page_3").style.display = 'none';
        document.getElementById("tea_page_4").style.display = 'none';
        document.getElementById("final_page").style.display = 'none';
    }

    //on second page, boil when left hand all the way to left and move to sugar/milk page
    if(left_x > 700) {
        document.getElementById("start_page").style.display = 'none';
        document.getElementById("tea_page_1").style.display = 'none';
        document.getElementById("tea_page_2").style.display = 'none';
        document.getElementById("tea_page_3").style.display = 'block';
        document.getElementById("tea_page_4").style.display = 'none';
        document.getElementById("final_page").style.display = 'none';
    }

    //on third page, add sugar and milk when squatting
    if(head_y > 700) {
        document.getElementById("start_page").style.display = 'none';
        document.getElementById("tea_page_1").style.display = 'none';
        document.getElementById("tea_page_2").style.display = 'none';
        document.getElementById("tea_page_3").style.display = 'none';
        document.getElementById("tea_page_4").style.display = 'block';
        document.getElementById("final_page").style.display = 'none';
    }

    //on final page, move to final page after jump
    if(head_y < -1000) {
        document.getElementById("start_page").style.display = 'none';
        document.getElementById("tea_page_1").style.display = 'none';
        document.getElementById("tea_page_2").style.display = 'none';
        document.getElementById("tea_page_3").style.display = 'none';
        document.getElementById("tea_page_4").style.display = 'none';
        document.getElementById("final_page").style.display = 'block';
    }
}