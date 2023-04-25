var host = "cpsc484-02.yale.internal:8888";
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
        // console.log("left hand", left_y)
        right_y = frame.people[0].joints[14].position.y;
        console.log("right hand y", right_y)
        head_y = frame.people[0].joints[26].position.y;
        // console.log("head y", head_y)

        left_x = frame.people[0].joints[7].position.x;
        right_x = frame.people[0].joints[14].position.x;
        console.log("right hand x", right_x)
        head_x = frame.people[0].joints[26].position.x;

        body_number = frame.groups.body_ids.length
        console.log("body number", body_number)

        //Intro the game

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
let body_number = 0;

let stage = 0;

// get the height and width of the diaply
height = $(window).height();
width = $(window).width();

function setup() {
    // Intro whale slide
    window.location = "../index.html";
    window.location.pathname == "../index.html"
}

function final_page() {
    window.location = "/pages/final_page.html";
    setTimeout(setup, 30000);
}

function moveChai () {
    var chai = document.getElementById("chaipic");
    chai.style.top = 200
    chai.style.right = 500
    var fadeEffect = setInterval(function () {
        if (!chai.style.opacity) {
            chai.style.opacity = 1;
        }
        if (chai.style.opacity > 0) {
            chai.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 200);
}

function moveSugar () {
    var sugar = document.getElementById("sugarpic");
    sugar.style.top = 200
    sugar.style.left = 500
    var fadeEffect = setInterval(function () {
        if (!sugar.style.opacity) {
            sugar.style.opacity = 1;
        }
        if (sugar.style.opacity > 0) {
            sugar.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 200);

    setTimeout(moveMilk, 3000);
}

function moveMilk () {
    var milk = document.getElementById("milkpic");
    milk.style.top = 200
    milk.style.right = 500
    var fadeEffect = setInterval(function () {
        if (!milk.style.opacity) {
            milk.style.opacity = 1;
        }
        if (milk.style.opacity > 0) {
            milk.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 200);
}

function boilFade () {
    var boil = document.getElementById("boil_text");
    var fadeEffect = setInterval(function () {
        if (!boil.style.opacity) {
            boil.style.opacity = 1;
        }
        if (boil.style.opacity > 0) {
            boil.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 200);
}

function movement() {
    console.log("window location", window.location)
    console.log("window.location.pathname", window.location.pathname)
    // get the starfish to track hand movement
    // var starfish = document.getElementById("starfish");
    // starfish.style.top = right_y * (1080/720)
    // starfish.style.right = right_x * (1920/1280)
    // console.log("move to position", starfish.style.right, starfish.style.top)

    

    // this is a one player game, if body number is greater than 1 make a popup
    if (body_number > 1) {
        $(".error-messages").text("Only one player!").fadeIn();
    } else {
        $(".error-messages").text("").fadeIn();
    }

    if(document.URL.includes("index.html")) {
        console.log("IN HERE")
        setTimeout(() => {
            window.location = "pages/whale_page_2.html";
        }, 5000);

    } else if(document.URL.includes("whale_page_2.html")) {
        setTimeout(() => {
            window.location = "tea_page_1.html";
        }, 5000);

    } else if(document.URL.includes("tea_page_1.html") && right_x < -1000) {
        moveChai();
        window.location = "tea_page_4.html";

    } else if(document.URL.includes("tea_page_4.html") && head_y > 700) {
        setTimeout(moveSugar, 3000);
        setTimeout(moveMilk, 3000);
        window.location = "tea_page_2.html";

    } else if(document.URL.includes("tea_page_4.html") && head_y > 700) {
        setTimeout(() => {
            boilFade();
            window.location = "tea_page_4.html";
        }, 4000);
    } else if(document.URL.includes("tea_page_4.html") && head_y < -1000) {
        final_page();
    }


    // if(right_y < head_y && left_y < head_y) {
    //     document.getElementById("whale_page").style.display = 'none';
    //     document.getElementById("whale_page_2").style.display = 'none';
    //     document.getElementById("start_page").style.display = 'none';
    //     document.getElementById("tea_page_1").style.display = 'block';
    //     document.getElementById("tea_page_2").style.display = 'none';
    //     document.getElementById("tea_page_3").style.display = 'none';
    //     document.getElementById("tea_page_4").style.display = 'none';
    //     document.getElementById("final_page").style.display = 'none';
    // }
    // var chai = document.getElementById("chaipic");
    // chai.style.top = right_y * (300)
    // chai.style.right = right_x * (700)

    // // make sure that a person is in the center of the page
    // if(head_x > 130 && head_x < 215 && head_y > 60 && head_y <= 300) {
    //     document.getElementById("start_page").style.display = 'block';
    //     document.getElementById("tea_page_1").style.display = 'none';
    //     document.getElementById("tea_page_2").style.display = 'none';
    //     document.getElementById("tea_page_3").style.display = 'none';
    //     document.getElementById("tea_page_4").style.display = 'none';
    //     document.getElementById("final_page").style.display = 'none';
    // }

    // if(head_x > 130 && head_x < 215 && head_y > 60 && head_y <= 300) {
    //     document.getElementById("start_page").style.display = 'block';
    //     document.getElementById("tea_page_1").style.display = 'none';
    //     document.getElementById("tea_page_2").style.display = 'none';
    //     document.getElementById("tea_page_3").style.display = 'none';
    //     document.getElementById("tea_page_4").style.display = 'none';
    //     document.getElementById("final_page").style.display = 'none';
    // }

    // if(right_y < head_y && left_y < head_y) {
    //     document.getElementById("start_page").style.display = 'none';
    //     document.getElementById("tea_page_1").style.display = 'block';
    //     document.getElementById("tea_page_2").style.display = 'none';
    //     document.getElementById("tea_page_3").style.display = 'none';
    //     document.getElementById("tea_page_4").style.display = 'none';
    //     document.getElementById("final_page").style.display = 'none';
    // }

    // //from first add tea page, move to boil page when right hand all the way to right
    // if(right_x < -1000) {
    //     document.getElementById("start_page").style.display = 'none';
    //     document.getElementById("tea_page_1").style.display = 'none';
    //     document.getElementById("tea_page_2").style.display = 'block';
    //     document.getElementById("tea_page_3").style.display = 'none';
    //     document.getElementById("tea_page_4").style.display = 'none';
    //     document.getElementById("final_page").style.display = 'none';
    // }

    // //on second page, boil when left hand all the way to left and move to sugar/milk page
    // if(left_x > 700) {
    //     document.getElementById("start_page").style.display = 'none';
    //     document.getElementById("tea_page_1").style.display = 'none';
    //     document.getElementById("tea_page_2").style.display = 'none';
    //     document.getElementById("tea_page_3").style.display = 'block';
    //     document.getElementById("tea_page_4").style.display = 'none';
    //     document.getElementById("final_page").style.display = 'none';
    // }

    // //on third page, add sugar and milk when squatting
    // if(head_y > 700) {
    //     document.getElementById("start_page").style.display = 'none';
    //     document.getElementById("tea_page_1").style.display = 'none';
    //     document.getElementById("tea_page_2").style.display = 'none';
    //     document.getElementById("tea_page_3").style.display = 'none';
    //     document.getElementById("tea_page_4").style.display = 'block';
    //     document.getElementById("final_page").style.display = 'none';
    // }

    // //on final page, move to final page after jump
    // if(head_y < -1000) {
    //     document.getElementById("start_page").style.display = 'none';
    //     document.getElementById("tea_page_1").style.display = 'none';
    //     document.getElementById("tea_page_2").style.display = 'none';
    //     document.getElementById("tea_page_3").style.display = 'none';
    //     document.getElementById("tea_page_4").style.display = 'none';
    //     document.getElementById("final_page").style.display = 'block';
    // }
}