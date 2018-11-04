$(document).ready(function() {
    var options = [
        {
            question: "What is not a playable race in Final Fantasy XIV?",
            choice: ["Lalafell", "Roegadyn", "Au Ra", "Miquo'te", "Moogle"],
            answer: 4,
            photo: "assets/images/moogle.jpg"
        },
        {
            question: "In Final Fantasy VII, what is Cloud Strife's final Limit Break?",
            choice: ["Cross Slash", "Blade Beam", "Omnislash", "Meterorain", "Finishing Touch"],
            answer: 2,
            photo: "assets/images/omni.gif"
        },
        {
            question: "Who or what has appeared in almost all of the Final Fantasy games?",
            choice: ["A Wild Chocobo", "Yuffie", "Squall", "Zac Flair", "Anima"],
            answer: 0,
            photo: "assets/images/chocobo.jpg"
        },
        {
            question: "In Final Fantasy IV, the Magus Sisters are bosses that sit atop what tower?",
            choice: ["Zot Tower", "Phoenix Tower", "Lix Tower", "Remien Tower", "Barad-dûr"],
            answer: 0,
            photo: "assets/images/zot.png"
        },
        {
            question: "Who is known also known as the Dragon King in the Final Fantasy Series?",
            choice: ["Omega", "Tiamat", "Ancalagon", "Bahamut", "Chaos"],
            answer: 3,
            photo: "assets/images/bahamut.gif"
        }];
        
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 7;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];

$("#reset").hide();
$("#start").on("click", function () {
        $("#start").hide();
        $("#defaultCanvas0").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
    holder.push(options[i]);
        }
	})

function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}

function decrement() {
	$("#timer").html("<h4>Time remaining: " + timer + "</h4>");
	timer --;


	if (timer === -1) {
		unanswerCount++;
		stop();
		$("#answer").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}


function stop() {
	running = false;
	clearInterval(intervalId);
}
function displayQuestion() {
	//generate random index in array
	index = Math.floor(Math.random()*options.length);
	pick = options[index];


		$("#question").html("<p>" + pick.question + "</p>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answer").append(userChoice);
//		}
}




$(".answerchoice").on("click", function () {

	userGuess = parseInt($(this).attr("data-guessvalue"));

	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answer").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answer").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answer").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answer").empty();
		timer= 7;


	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#question").empty();
		$("#question").html("<h3>Game Over!  Your Score: </h3>");
		$("#answer").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answer").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answer").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answers").empty();
	$("#options").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

});
