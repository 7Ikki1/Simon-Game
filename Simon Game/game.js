
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;



$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatedPress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
  });


  function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  }


function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
  }


function animatedPress(currentColour) {
  setTimeout (function () {
    $("#" + currentColour).addClass("pressed")
});
setTimeout(function () {
  $("#" + currentColour).removeClass("pressed")
}, 100);
}

$(document).keydown(function() {
  if (!started) {
  $("h1").text("Level " + level);
  nextSequence();
  started = true;
}
}) ;

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {

    console.log("wrong");
    playSound("wrong");
    startOver();
    setTimeout(function() {
    $("body").addClass("game-over");
    });
    setTimeout(function() {
    $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");

    }

    }

    function startOver() {
      level = 0;
      gamePattern = [];
      started = false;
    }
