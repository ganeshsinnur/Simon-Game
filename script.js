colorSequence=[];
userClickedPattern=[];
var level =0;
var greenSound= new Audio("./sounds/green.mp3");
var redSound= new Audio("./sounds/red.mp3");
var blueSound = new Audio("./sounds/blue.mp3");
var yellowSound = new Audio("./sounds/yellow.mp3");
var wrongSound = new Audio("./sounds/wrong.mp3");

function newSequence(){
    var randomNumber = Math.floor(Math.random()*4)
    var color = randomNumber==0?"green":randomNumber==1?"red":randomNumber==2?"yellow":"blue";
    return color;
}

function clickBtn(clickedButton){
    $("#"+clickedButton).addClass("pressed");
    setTimeout(function(){$("#"+clickedButton).removeClass("pressed")}, 150);
    $("#"+clickedButton).hasClass("green")?greenSound.play():$("#"+clickedButton).hasClass("red")?redSound.play():$("#"+clickedButton).hasClass("blue")?blueSound.play():yellowSound.play();
    userClickedPattern.push(clickedButton);
    checkAnswers();
}

function botBtn(clickedButton){
    $("#"+clickedButton).addClass("pressed");
    setTimeout(function(){$("#"+clickedButton).removeClass("pressed")}, 150);
    $("#"+clickedButton).hasClass("green")?greenSound.play():$("#"+clickedButton).hasClass("red")?redSound.play():$("#"+clickedButton).hasClass("blue")?blueSound.play():yellowSound.play();
    colorSequence.push(clickedButton);
}

function checkAnswers(){
    if(userClickedPattern[userClickedPattern.length-1]==colorSequence[userClickedPattern.length-1]){
        if(userClickedPattern.length==colorSequence.length){
            level++;
            $("#sub").text("Level "+level);
            setTimeout(function(){
                botBtn(newSequence());
                userClickedPattern=[];   
            },700)
        }
    }
    else{
        level=0;
    $("#sub").text("Wrong!!");
    $("body").addClass("wrong");
    userClickedPattern=[];
    colorSequence=[];
    wrongSound.play();

    setTimeout(function(){
        $("body").removeClass("wrong"); 
        $("#sub").text("Press Any Key to Restart");
    },1000)
    }
}


$(document).on("keydown",function(){
    if(colorSequence.length===0){
        level++;
        $("#sub").text("Level "+level);
        botBtn(newSequence());
    }})

$(".btn").on("click",function(){
   clickBtn($(this).attr("id"));
    
})
