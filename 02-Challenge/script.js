var buttonStart = document.querySelector("#start");
var container1 = document.querySelector(".container");
var startQ = startQuiz;
var question = document.getElementById("firstBox");
var posibleAnswers = document.querySelector(".answerOp");
var everyAnswer = document.querySelectorAll("#op1, #op2, #op3, #op4");
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
    changeQuestion2,
    changeQuestion3,
    changeQuestion4,
    changeQuestion5,
];


//prevents the answer options to show from the beggining
hideAnswers();

//'forEach', helps me iterate over every element in the variable 'everyAnswer', and set all of them as display:none.
function hideAnswers() {
    everyAnswer.forEach(function(question){
        question.style.display = "none";
    })};

function hideQuestion() {
    document.getElementById("firstBox").style.display = "none";
}

function startQuiz() {
    document.getElementById("firstBox").style.display = "none";
    document.getElementById("options").style.display = "none";
    buttonStart.style.display = "none";
    changeQuestion1();
};

buttonStart.addEventListener("click", startQ);

//change's the state of the <p>, to clicked, and hides the actual question and answer options.
answerOptions.forEach(option => {
    option.addEventListener('click', function() {
        this.classList.toggle('clicked');
        hideQuestion();
        hideAnswers();
        executeFunctionsQueue();
        console.log("Evry fkn time");
        // changeQuestion2();
    });
});

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

//returns to the 'const', and check if  theres still availables ones, and run the next one until there are no more.
function executeFunctionsQueue() {
    if (functionsQueue.length > 0) {
        const nextFunction = functionsQueue.shift();
        nextFunction();
    }
}