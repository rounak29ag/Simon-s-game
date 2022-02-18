
var buttonColors=["red", "blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

var level=0;
var x=0;
$(document).keydown(function(){
    if(!x){
        nextSequence();
        x=1;
    }
});



$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);
    
    randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn();
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
   
}

function playSound(name){
    var sound=new Audio("sounds/"+name+".mp3");
    sound.play(); 
}


function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
    },100);
}




function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){nextSequence();},1000);
        }
            
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},500);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    x=0;
}
