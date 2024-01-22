var buttonStart = document.querySelector("#start");
var optionsEl = document.getElementById("options");
var container1 = document.querySelector(".container");
var startQ = startQuiz;
var question = document.getElementById("firstBox");
var posibleAnswers = document.querySelector(".answerOp");
var everyAnswer = document.querySelectorAll("#op1, #op2, #op3, #op4");
var timeEl = document.getElementById("time");
var nameInput = document.getElementById("playerName");
var secondsLeft = 60;
var saveNameBtn = document.getElementById("saveName");
var clearNameBtn = document.getElementById("clearName");
//the const, helps me declare a contsnt 'variable', so that its value cannot be reasigned again and allways applies thorugh the lifetime of the code.
const answerOptions = document.querySelectorAll(".answerOp");

//List of questions made in variable so that the code can be modified easyly
var q1 = ("Is JavaScript a case-sensitive language?");
var q2 = ("Wich of the following works to make an object in JS?");
var q3 = ("How do you call a Function?");
var q4 = ("How can you define an array?");
var q5 = ("How do you 'comment' when using JavaScript?")

//this array gatters all the diferent functions to write each question, and by having this, i can u a 
//'functionsQueue.shift', so every time someone click an option of the possible answers, the click returns to this 'const' and moves to the next one, until theres no more functions.
const functionsQueue = [
    endQuiz,
    changeQuestion1,
    changeQuestion2,
    changeQuestion3,
    changeQuestion4,
    changeQuestion5,
];

//prevents this variables to show from the beggining
hideAnswers();
hideInput();
hideButtons();

buttonStart.addEventListener("click", startQ);

//change's the state of the <p>, to clicked, and hides the actual question and answer options.
answerOptions.forEach(option => {
    option.addEventListener("click", function() {
        handleOptionClick(this);
    });
});

//'forEach', helps me iterate over every element in the variable 'everyAnswer', and set all of them as display:none.
function hideAnswers() {
    everyAnswer.forEach(function(question) {
        question.style.display = "none";
    })};

function startQuiz() {
    hideQuestion();
    hideAnswers();
    buttonStart.style.display = "none";
    optionsEl.style.display = "none";
    executeFunctionsQueue();
    setTime();
};

function hideQuestion() {
    document.getElementById("firstBox").style.display = "none";
}

function handleOptionClick(selectedOption) {
    var currentQuestionIndex = functionsQueue.length;
    var correctAnswer = getCorrectAnswer(currentQuestionIndex).trim();

    console.log("Selected Option:", selectedOption.innerText.trim());
    console.log("Correct Answer:", correctAnswer);

    if (selectedOption.innerText.trim() === correctAnswer) {
        console.log("Correct Answer!");
        var currentScore = localStorage.getItem("finalScore"); //retrives the final Score from the localStorage
        // The question mark is a JavaScript conditional (ternary) operator, and it checks if currentScore is 'truthy' (that it has a value other than null, undefinded, 0, flase or an empty string.).
        currentScore = isNaN(parseInt(currentScore)) ? 0 : parseInt(currentScore); //paseInt converts the string into a number/integer. Is NaN (not a number), checks if the content is a number.
        currentScore += 1; //increment the score +1 every time
        localStorage.setItem("finalScore", currentScore.toString());//stores a number in the key 'finalscore', every time there is a correct answer.
    } else {
        console.log("Incorrect Answer!");
        subtractTime(10); //Calls the function that removes 10 seconds of the timer, every time they click and incorrect answer.
    }
    hideQuestion();
    hideAnswers();
    executeFunctionsQueue();
};

//Store the correct answers in the finalScore as a string.

var scoreData = { finalScore: 'value'};
localStorage.setItem("finalScore", JSON.stringify(scoreData));

function getCorrectAnswer(index) {
    switch (index) {
        case 1: return "Yes";
        case 2: return "var =";
        case 3: return "function()";
        case 4: return "var x = []";
        case 5: return "//";
        default: return "";//works as a safety meassure in case there is an unexpected value.
    }
}

function hideInput() {
    nameInput.style.display= "none";
}
//function to subtract time in the timer.
function subtractTime(seconds) {
    secondsLeft = Math.max(0, secondsLeft - seconds); //this ensures that the count is not able to subtract less than 0.
    timeEl.textContent = secondsLeft + "Seconds Left";
}
//To help read the answer clicked, this function iterates until theres no more questions, and help determine wich one is the correct one, considering it starts counting in 0 and not in 1.
function executeFunctionsQueue() {
    var currentQuestionIndex = functionsQueue.length - 1;

    if (functionsQueue.length > 0) {
        var currentFunction = functionsQueue[currentQuestionIndex];
        currentFunction();
        functionsQueue.pop();
    };
};

function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " Seconds Left";

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000); //this second argument tells the time interval in miliseconds for the function to execute.
};


function modifyContentById(id, newContent) {
    var elementId = document.getElementById(id);
    if (elementId) {
        elementId.textContent = newContent;
    };
};

function changeQuestion1() {
    question.innerHTML = q1;
    question.style.display ="block";
    modifyContentById("op1", "Yes");//correct answer
    modifyContentById("op2", "No");
    modifyContentById ("op3", "Maybe");
    modifyContentById ("op4", "I don't know");
    everyAnswer.forEach(function(answer) {
        answer.style.display ="inline-block";
    });
};

function changeQuestion2() {
    question.innerHTML = q2;
    question.style.display ="block";
    modifyContentById("op1", "var =");//correct answer
    modifyContentById("op2", "function()");
    modifyContentById ("op3", "addEventListener");
    modifyContentById ("op4", "getElementById");
    everyAnswer.forEach(function(answer) {
        answer.style.display ="inline-block";
    });
};

function changeQuestion3() {
    question.innerHTML = q3;
    question.style.display ="block";
    modifyContentById("op1", "function{}");
    modifyContentById("op2", "!function");
    modifyContentById ("op3", "function!");
    modifyContentById ("op4", "function()");//correct answer
    everyAnswer.forEach(function(answer) {
        answer.style.display ="inline-block";
    });
};

function changeQuestion4() {
    question.innerHTML = q4;
    question.style.display ="block";
    modifyContentById("op1", "var x = {}");
    modifyContentById("op2", "var x = ()");
    modifyContentById ("op3", "var x = []");//correct answer
    modifyContentById ("op4", "var x = <>");
    everyAnswer.forEach(function(answer) {
        answer.style.display ="inline-block";
    });
};

function changeQuestion5() {
    question.innerHTML = q5;
    question.style.display ="block";
    modifyContentById("op1", "//");//correct answer
    modifyContentById("op2", "<!--");
    modifyContentById ("op3", "/**/");
    modifyContentById ("op4", "<**>");
    everyAnswer.forEach(function(answer) {
        answer.style.display ="inline-block";
    });
};

function endQuiz() {
    timeEl.style.display = "none";
    hideAnswers();
    nameInput.style.display = "block";
    saveNameBtn.style.display = "block";
    modifyContentById("firstBox", "Save your score!");

    var playerName = document.getElementById("playerName").value;
    var finalScore = localStorage.getItem("finalScore") || 0; //In case there is no finalScore, it will be 0.
    var playerData = {
        name: playerName,
        score: finalScore
    };
    
    localStorage.setItem("playerData", JSON.stringify(playerData));
    modifyContentById("options", "Player: " + playerName + " | Score: " + finalScore);
    question.style.display ="block";
    
};

saveNameBtn.addEventListener("click", saveName); //event listener for the saveName button.
clearNameBtn.addEventListener("click", clearName); //event listener for the clearName button.

function saveName() {
    var playerName = document.getElementById("playerName").value;

    if (playerName.trim() === ""){
        alert("Please enter your name before saving.");
    } else {
        localStorage.setItem("playerName", playerName);
        alert("Name Saved: " + playerName);
        scorePage();
    }
    }

function clearName() {
    localStorage.removeItem("playerName");
    localStorage.removeItem("finalScore");
    alert("Name Cleared");
    modifyContentById("options", "Player: | Score: ");
}

function hideButtons() {
    saveNameBtn.style.display = "none";
    clearNameBtn.style.display = "none";
}

function scorePage() {
    hideAnswers();
    nameInput.style.display = "none";
    question.style.display = "block";
    posibleAnswers.style.display = "none";
    saveNameBtn.style.display = "none";
    clearNameBtn.style.display = "block";
    modifyContentById("firstBox", "Record:");
    optionsEl.style.display = "block";
    everyAnswer.forEach(function(answer) {
        answer.style.display ="none";
    });
};
