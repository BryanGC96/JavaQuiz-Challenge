var buttonStart = document.querySelector("#start");
var container1 = document.querySelector(".container");
var startQ = startQuiz;
var question = document.getElementById("firstBox");



function startQuiz() {
    document.getElementById("firstBox").style.display = "none";
    document.getElementById("options").style.display = "none";
    buttonStart.style.display = "none";
    changeQuestion1();
};

buttonStart.addEventListener("click", startQ);

function changeQuestion1() {
    question.innerHTML = "Is Java Script a case-sensitive language?";
    question.style.display = "block";
};

